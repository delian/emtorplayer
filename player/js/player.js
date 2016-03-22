var wjs = require("wcjs-player");
var wcjs = require("wcjs-prebuilt");
var torrent = require('./torrent');
var poster = require('./poster')();
var config = require('./config')();

var player = null;

function Player(url) {
    if (!(this instanceof Player)) return new Player(url);

    var me = this;

    if (!player) player = new wjs("#player").addPlayer({ autoplay: true, wcjs: wcjs });

    player.stop();
    player.clearPlaylist();

    poster.show(); // Default background

    me.player = player;

    player.onPlaying(function() {
        poster.hide();
    });

    player.onEnded(function() {
        poster.show();
    });
    
    player.onPaused(function() {
        //poster.show();
    });

    var t = torrent(url);
    me.torrent = t;

    me.videoIsOn = false;

    var el = document.createElement('div');
    el.className = "infoBtn wcp-button wcp-right";
    el.onclick = function() {
        poster.toggle(true);
    };
    document.getElementsByClassName('wcp-toolbar')[0].appendChild(el);

    el = document.createElement('div');
    el.className = "pieces";
    document.getElementsByClassName('wcp-progress-bar')[0].appendChild(el);

    t.on('videofile',function(file) {
        t.focusOn(file); // Download this file with priority
        if (!me.videoIsOn) {
            me.videoIsOn = true;
            var name = "http://"+t.host+":"+t.port+"/"+file.name;
            console.log("Start video play for",name);
            poster.showByName(file.name);
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
        //poster.hide(); // Hide the poster
    });

    t.on('download', function(o) {
        //console.log('D',o.pieces);
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
    this.player.play();
};

module.exports = Player;
