var menu = require('./js/menu');
var Init = require('./js/init');

// magnet:?xt=urn:btih:19cef5474c8a5d7619f9166a464707995979b782&dn=Lucifer.S01E09.HDTV.x264-LOL%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969
// magnet:?xt=urn:btih:dcc70364b791cb6cebaada04c4093c220d8257ee&dn=The.Big.Bang.Theory.S09E11.HDTV.x264-LOL%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969
// magnet:?xt=urn:btih:609679de0f6734a8ec59bd59af3862d6aef5d8e3&dn=Zootopia.2016.HDCAM.XVID.AC3.HQ.Hive-CM8&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969

function init() {
    menu();
    var url = "";
    if (window.location.search && window.location.search.match(/magnet\=/)) {
        url=unescape(window.location.search.match(/magnet\=(.+)?/));
    }
    console.log('Window.location',window.location,url);
    Init(url);
}
