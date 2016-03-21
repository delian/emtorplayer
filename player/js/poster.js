var omdb = require('omdb');

function Poster() {
    if (!(this instanceof Poster)) return new Poster();
    this.el = document.getElementById('background');
}

Poster.prototype.bringInFront = function() {
    if (!this.el) this.el = document.getElementById('background');
    this.el.style.zIndex = 1;
    this.el.style.display = 'block';
};

Poster.prototype.sendToBack = function() {
    if (!this.el) this.el = document.getElementById('background');
    this.el.style.zIndex = -1;
    this.el.style.display = 'none';
};

Poster.prototype.omdb = function(rule,cb) {
    var me = this;
    omdb.get(rule, true, function(err, movie) {
        if (err || (!movie)) return cb(err,movie);
        console.log('Found movie', movie);
        if (movie.poster) {
            me.el.style.backgroundImage = 'url('+movie.poster+')';
        }
        return cb(err,movie);
    });
};

Poster.prototype.showByName = function(name) {
    var me = this;
    me.bringInFront();
    name = name.replace(/\[.*?\]/,'')
        .replace(/\.(mkv|avi|mp4|mpg|mpeg|webm|flv|ogg|ogv|mov|wmv|3gp|3g2)/i,'')
        .replace(/(cam|xvid|divx|lol|hdtv|dvd)/ig,'')
        .replace(/\W/g,' ')
        .replace(/\s+/g,' ')
        .replace(/\s+$/,'')
        .replace(/^\s+/,'')
        .replace(/S\d+E\d+/ig,'');
    console.log('Searching for name',name);
    me.omdb({ title: name }, function(err, movie) {
        if (err) return console.error(err);
        if (!movie) {
            name = name.replace(/\s\d+$/,'');
            console.log('Retry again with',name);
            me.omdb({ title: name }, function(err, movie) {
                
            });
        }
    });
};

Poster.prototype.showByImdb = function() {
    this.bringInFront();
};

Poster.prototype.hide = function() {
    this.sendToBack();
};

Poster.prototype.show = function() {
    this.bringInFront();
};

module.exports = Poster;
