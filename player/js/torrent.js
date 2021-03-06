var peerflix = require('peerflix');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var config = require('./config.js')();
var mkdirp = require('mkdirp');

// Auto detect of files
var ext = ["mkv", "avi", "mp4", "mpg", "mpeg", "webm", "flv", "ogg", "ogv", "mov", "wmv", "3gp", "3g2"];

var opts = {};

function fillOpts() {
    config.get('peers',function(err,value) {
        opts.connections = parseInt(value);
        opts.uploads = parseInt(value*0.5);
    });

    config.get('incport',function(err,value) {
       opts.listenPort = value;
    });
    
    config.get('downdir',function(err,value) {
        opts.tmp = value;
        mkdirp(value, function (err) {
            if (err) console.error(err);
            else console.log('created directory',value);
        });
    });
}

function isVideo(name) {
    var video = false;
    ext.forEach(function(n) { video = video || name.endsWith('.'+n); });
    return video;
}

function TorrentClass (magnet,o) {
    if (!(this instanceof TorrentClass)) {
        return new TorrentClass(magnet);
    }
    
    var me = this;
    
    var options = o || {};

    me.port = options.port || (30000 + parseInt(Math.random() * 30000));
    me.videoOn = options.videoOn || false;
    me.host = options.host || "127.0.0.1";
    me.magnet = magnet;
    
    me.streamsQueue = [];

    opts.hostname = me.host;
    opts.port = me.port;

    console.log('Opening torrent engine with',opts);
    me.engine = peerflix(magnet, opts);
    me.engine.listen(opts.listenPort||6881);

    me.clearPeers = null;
    me.clearSpeed = null;

    me.engine.on('ready', function() {
        me.clearPeers = setInterval(function() {
            me.emit('peers',me.engine);
        },1500);

        me.clearSpeed = setInterval(function() {
            //console.log('Emitted',me.engine);
            var count=0;
            for (var i=0;i<me.engine.torrent.pieces.length;i++) count+=me.engine.bitfield.get(i);
            me.emit('speed',me.engine.swarm.downloadSpeed(), count/me.engine.torrent.pieces.length, me.engine.swarm.downloaded, (me.engine.swarm.downloaded / me.engine.torrent.length)<1?(me.engine.swarm.downloaded/me.engine.torrent.length):1);
        },500);

        me.engine.files.forEach(function(file) {
            console.log('filename:', file.name);
            me.emit('file', file);
            if (isVideo(file.name)) me.emit('videofile',file);
        });
    });

    me.engine.on('torrent', function() {
        console.log('EV: torrent', arguments);
    });


    me.engine.on('idle', function() {
        me.emit('idle');
        clearInterval(me.clearPeers);
        clearInterval(me.clearSpeed);
    });


    me.engine.on('download', function(id,data) {
        me.emit('download',{id: id, data: data, pieces: me.engine.torrent.pieces.length, bitfield: me.engine.bitfield });
    });
}

TorrentClass.prototype.focusOn = function(file) {
   this.streamsQueue.push(file.createReadStream());
};

fillOpts();

util.inherits(TorrentClass, EventEmitter); // Add event emitter options

module.exports = TorrentClass;
