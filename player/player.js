var wjs = require("wcjs-player");
var wcjs = require("wcjs-prebuilt");
var player;
var peerflix = require('peerflix');
var engine;

// Auto detect of files
var ext = ["mkv", "avi", "mp4", "mpg", "mpeg", "webm", "flv", "ogg", "ogv", "mov", "wmv", "3gp", "3g2"];

function init() {
    player = new wjs("#player").addPlayer({ autoplay: true, wcjs: wcjs });

   // startVideo("http://archive.org/download/CartoonClassics/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4");
    torrent("magnet:?xt=urn:btih:dcc70364b791cb6cebaada04c4093c220d8257ee&dn=The.Big.Bang.Theory.S09E11.HDTV.x264-LOL%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969");
}

function isVideo(name) {
    var video = false;
    ext.forEach(function(n) { video = video || name.endsWith('.'+n); });
    return video;
}

function torrent(m) {
    var port = 30000+parseInt(Math.random()*30000);

    var host = "http://127.0.0.1:"+port+"/";
    var videoOn = false;

    engine = peerflix(m, { hostname: "127.0.0.1", port: port });

    console.log('engine',engine);

    engine.on('ready', function() {
        engine.files.forEach(function(file) {
            console.log('filename:', file.name);
            if (isVideo(file.name)) {
                if (!videoOn) {
                    videoOn = true;
                    var stream = file.createReadStream();
                    console.log('Start video play for ',host+file.name);
                    setTimeout(function() { startVideo(host+file.name); }, 2000);
                    var t = setInterval(function() { // Update the peer status
                        document.getElementById('peers').innerHTML = 'Peers: '+engine.swarm.connections.length+' / '+ Object.keys(engine.swarm._peers).length;
                    }, 1500);
                }
            }
        });
    });

    engine.on('torrent', function() {
        console.log('EV: torrent', arguments);
    });


    engine.on('idle', function() {
        console.log('EV: idle', arguments);
        document.getElementById('peers').style.display = 'none';
    });


    engine.on('download', function() {
        console.log('EV: download', arguments);
    });
}

function startVideo(v) {
    player.addPlaylist(v);
}
