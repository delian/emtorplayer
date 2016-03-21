var wjs = require("wcjs-player");
var wcjs = require("wcjs-prebuilt");
var torrent = require('./js/torrent');
var menu = require('./js/menu');
var poster = require('./js/poster')();
var config = require('./js/config')();
var player;

function init() {
    menu();
    Player("magnet:?xt=urn:btih:dcc70364b791cb6cebaada04c4093c220d8257ee&dn=The.Big.Bang.Theory.S09E11.HDTV.x264-LOL%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969");
}

function Player(url) {
    if (!(this instanceof Player)) return new Player(url);

    var me = this;

    var player = new wjs("#player").addPlayer({ autoplay: true, wcjs: wcjs });
    me.player = player;
    var t = torrent(url);
    me.torrent = t;

    me.videoIsOn = false;

    var el = document.createElement('div');
    el.className = "pieces";

    document.getElementsByClassName('wcp-progress-bar')[0].appendChild(el);

    t.on('videofile',function(file) {
        t.focusOn(file); // Download this file with priority
        if (!me.videoIsOn) {
            me.videoIsOn = true;
            var name = "http://"+t.host+":"+t.port+"/"+file.name;
            console.log("Start video play for",name);
            document.title = file.name;
            setTimeout(function() {
                me.startVideo(name);
            },2000);
        }
    });

    var elPeers = document.getElementById('peers');
    var elSpeed = document.getElementById('speed');

    t.on('peers', function(engine) {
        elPeers.innerHTML = 'Peers: '+engine.swarm.connections.length+' / '+ Object.keys(engine.swarm._peers).length;
    });

    t.on('speed', function(speed,total,downloaded) {
        //console.log('Speed', speed, total);
        elSpeed.innerHTML = 'Speed: '+(speed/1024).toFixed(1)+' KB/s ('+(total*100).toFixed(1)+'%)<BR>Bytes downloaded: '+downloaded;
    });

    t.on('idle', function() {
        elPeers.style.visibility = 'hidden';
        elSpeed.style.visibility = 'hidden';
        poster.hide(); // Hide the poster
    });

    t.on('download', function(o) {
        console.log('D',o.pieces);
        el.innerHTML=me.buildPieces(o.pieces,o.bitfield);
    });
}

Player.prototype.buildPieces = function(pieces,bitfield) {
    var s = '';
    for (var i=0;i<pieces;i++) s+="<div "+(bitfield.get(i)?'class="piecetrue"':'class="piecefalse"')+"></div>";
    return s;
};

Player.prototype.startVideo = function (v) {
    this.player.addPlaylist(v);
};
