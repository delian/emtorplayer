var wjs = require("wcjs-player");
var wcjs = require("wcjs-prebuilt");
var torrent = require('./js/torrent');
var player;

function init() {
    player = new wjs("#player").addPlayer({ autoplay: true, wcjs: wcjs });

    // startVideo("http://archive.org/download/CartoonClassics/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4");
    var t = torrent("magnet:?xt=urn:btih:dcc70364b791cb6cebaada04c4093c220d8257ee&dn=The.Big.Bang.Theory.S09E11.HDTV.x264-LOL%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969");
    
    var videoOn = false;
    
    t.on('videofile',function(file) {
       t.focusOn(file); // Download this file with priority
       if (!videoOn) {
           videoOn = true;
           var name = "http://"+t.host+":"+t.port+"/"+file.name;
           console.log("Start video play for",name);
           document.title = file.name;
           setTimeout(function() {
               startVideo(name);
           },2000);
       }       
    });
}

function startVideo(v) {
    player.addPlaylist(v);
}
