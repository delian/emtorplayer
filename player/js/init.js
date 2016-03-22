var Player = require('./player');

function init(url) {
    console.log('Opening',url);
    document.getElementById('background').style.backgroundImage = 'url(img/background.jpg)';
    document.getElementById('background').style.zIndex = 1;
    if (url) Player(url); // Play only if there is an url
}

module.exports = init;
