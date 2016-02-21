var peerflix = require('peerflix');
var EventEmitter = require('events').EventEmitter;

// Auto detect of files
var ext = ["mkv", "avi", "mp4", "mpg", "mpeg", "webm", "flv", "ogg", "ogv", "mov", "wmv", "3gp", "3g2"];

function isVideo(name) {
    var video = false;
    ext.forEach(function(n) { video = video || name.endsWith('.'+n); });
    return video;
}

function TorrentClass (magnet,options) {
    if (!(this instanceof TorrentClass)) {
        return new TorrentClass(magnet);
    }
    
    var me = this;
    
    me.port = options.port || (30000 + parseInt(Math.random() * 30000));
    me.videoOn = options.videoOn || false;
    me.host = options.host || "127.0.0.1";
    me.magnet = magnet;
    
    me.streamsQueue = [];
    
    me.engine = peerflix(magnet, { hostname: me.host, port: me.port });

    me.engine.on('ready', function() {
        setInterval(function() {
            me.emit('peers',me.engine);
        },1500);
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
        console.log('EV: idle', arguments);
        document.getElementById('peers').style.display = 'none';
    });


    me.engine.on('download', function() {
        console.log('EV: download', arguments);
    });    
}

TorrentClass.prototype.focusOn = function(file) {
   me.streamsQueue.push(file.createReadStream());
}

util.inherits(TorrentClass, EventEmitter); // Add event emitter options

module.exports = TorrentClass;
