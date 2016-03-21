function Poster() {
    if (!(this instanceof Poster)) return new Poster();
    this.el = document.getElementById('background');
}

Poster.prototype.bringInFront = function() {
    this.el.style.zIndex = 1;
    this.el.style.display = 'block';
};

Poster.prototype.sendToBack = function() {
    this.el.style.zIndex = -1;
    this.el.style.display = 'none';
};

Poster.prototype.showByName = function() {
    this.bringInFront();
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
