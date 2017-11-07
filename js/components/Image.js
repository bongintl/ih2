var m = require('mithril');

var selectSrc = require('../utils/selectSrc');
var loadImage = require('../utils/loadImage');

var DPR = window.devicePixelRatio || 1;

var update = ({ attrs: { srcs }, dom, state }) => {
    
    var { top, bottom, width } = dom.getBoundingClientRect();
    
    var visible = bottom > 0 && top < window.innerHeight;
    
    if ( !visible ) return;
    
    var src = selectSrc( srcs, width );
    
    if ( state.src === src ) return;
    
    if ( loadImage.isLoaded( src.url ) ) {
        
        state.src = src;
        
        m.redraw();
        
    } else {
        
        loadImage( src.url ).then( m.redraw );
        
    }
    
}

module.exports = {
    
    src: null,
    
    visible: false,
    
    oncreate: update,
    
    onupdate: update,
    
    view: ({ attrs: { inline }, state: { src }, attrs: { srcs, cover } } ) => {
        
        var { w, h } = srcs[ 0 ];
        
        var style = {
            backgroundImage: src === null ? 'none' : `url(${ src.url })`,
            backgroundSize: cover ? 'cover' : 'contain',
            paddingBottom: inline ? h / w * 100 + '%' : 0,
        }
        
        return m( '.image' + ( inline ? '.image_inline' : '' ) + ( src ? '.image_loaded' : '' ), { style } );
        
    }
    
}