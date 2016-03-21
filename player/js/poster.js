var omdb = require('omdb');

function Poster() {
    if (!(this instanceof Poster)) return new Poster();
    this.el = document.getElementById('background');
    this.poster = null;
    this.defaultPoster = "url(../background.jpg)"
}

Poster.prototype.bringInFront = function(o) {
    if (!this.el) this.el = document.getElementById('background');
    this.el.style.zIndex = 1;
    this.el.style.display = 'block';
    if (o) {
        this.el.style.backgroundImage = "";
    } else {
        this.el.style.backgroundImage = this.poster?this.poster:this.defaultPoster;
    }
};

Poster.prototype.sendToBack = function() {
    if (!this.el) this.el = document.getElementById('background');
    this.el.style.zIndex = -1;
    this.el.style.display = 'none';
};

Poster.prototype.rating = function(rate) {
    var el = document.getElementById('imdbStars');
    var s = "";
    var size=16;
    for (i=1;i<rate;i++) {
        s+="<IMG SRC='img/star.svg' WIDTH="+size+">";
    }
    var l = rate - parseInt(rate);
    console.log('size',l,parseInt(size*l));
    if (l) s+="<IMG SRC='img/star.svg' WIDTH="+parseInt(size*l)+">";
    el.innerHTML = s;
};

Poster.prototype.description = function(description) {
    var el = document.getElementById('imdbDescription');
    el.innerHTML = description;
};

Poster.prototype.genres = function(genres) {
    var el = document.getElementById('imdbGenres');
    el.innerHTML = (genres instanceof Array)?genres.join(','):genres;
};

Poster.prototype.omdb = function(rule,cb) {
    var me = this;
    omdb.get(rule, true, function(err, movie) {
        if (err || (!movie)) return cb(err,movie);
        console.log('Found movie', movie);
        if (movie.poster) {
            me.poster = 'url('+movie.poster+')';
            me.el.style.backgroundImage = me.poster;
        }
        if (movie.imdb && movie.imdb.rating) {
            me.rating(movie.imdb.rating);
        }
        if (movie.plot) {
            me.description(movie.plot);
        }
        if (movie.genres) {
            me.genres(movie.genres);
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

Poster.prototype.showByImdb = function(name) {
    console.log('Searching for imdb',name);
    me.omdb({ imdb: name }, function(err, movie) {
        if (err) return console.error(err);
        if (!movie) {
        }
    });
};

Poster.prototype.hide = function() {
    this.sendToBack();
};

Poster.prototype.show = function(o) {
    this.bringInFront(o);
};

Poster.prototype.toggle = function(o) {
    if (!this.el) this.el = document.getElementById('background');
    if (this.el.style.zIndex != 1)
        this.show(o);
    else
        this.hide(o);
};

module.exports = Poster;
