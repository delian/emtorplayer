var opensubtitles = require("subtitler");
var config = require('./config.js')();
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

var lang = "eng";
var subsdir = "/tmp";
var suffixes = ["srt","sub"];

config.get('subsdir', function(err,val) {
    subsdir = val+"/"+lang;
    config.get("sublang", function(err, l) {
        lang = l;
        mkdirp(val, function(err) {
        });
    });
});

function Subtitles() {
    if (!(this instanceof Subtitles)) return new Subtitles();
}

Subtitles.prototype.fixName = function (name) {
    return path.basename(name,path.extname(name));
};

Subtitles.prototype.findByFile = function(title, cb) {
    console.log('Seeking subtitle for',title);

    var name = subsdir+'/'+this.fixName(title);
    for (var i = 0; i<suffixes.length; i++) {
        try {
            console.log('Check for subtitle',name+'.'+suffixes[i]);
            if (typeof fs.accessSync(name+'.'+suffixes[i]) == 'undefined') {
                console.log('Found cached!',name+'.'+suffixes[i]);
                if (cb) return cb(null,name+'.'+suffixes[i],lang);
                return;
            }
        } catch (e) {}
    }
    
    var me = this;

    opensubtitles.api.login()
        .done(
            function(token){
                opensubtitles.api.searchForTitle(token, lang, title).done(
                    function(results){
                        console.log('Found subtitle',results);
                        if (results) {
                            opensubtitles.downloader.download(results, 1, subsdir+"/"+title, function() {
                                console.log('Downloader has downloaded',title);
                                me.findByFile(title,cb); // Guess the extension and return
                            });
                        }
                        opensubtitles.api.logout(token);
                    }
                );
            }
        );
    if (cb) return cb(new Error());
};

module.exports = Subtitles;