var m = require('mithril');

var loaded = {};

var loadImage = url => new Promise( resolve => {
    
    /* global Image */
    
    if ( url in loaded ) return resolve();
    
    var img = new Image();
    
    img.onload = () => {
        loaded[ url ] = true;
        resolve()
    }
    
    img.src = url;
    
})

loadImage.isLoaded = url => url in loaded

module.exports = loadImage