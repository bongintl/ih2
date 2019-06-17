var m = require('mithril');

var selectSrc = require('../utils/selectSrc');
var loadImage = require('../utils/loadImage');

var DPR = window.devicePixelRatio || 1;

var update = ({ attrs: { srcs }, dom, state }) => {
    
    var { top, bottom, width } = dom.getBoundingClientRect();
    
    var visible = bottom > 0 && top < window.innerHeight;
    
    if ( !visible ) return;
    
    var src = selectSrc( srcs, width );
    
    if ( state.src !== src ) {
        
        state.loading = true;
        state.src = src;
        
        loadImage( src.url ).then( () => {
            state.loading = false;
            m.redraw();
        });
        
    }
    
}

module.exports = {
    
    src: null,
    
    visible: false,
    
    loading: true,
    
    oncreate: update,
    
    onupdate: update,
    
    view: ({
        attrs: { inline, srcs, style = {} /*, cover, width = '100%', height = '100%' */ },
        state: { src, loading },
    }) => {
        
        var { w, h } = srcs[ 0 ];
        
        var className = [
            'image',
            inline && 'image_inline',
            !loading && 'image_loaded'
        ].filter( x => x ).join(' ');
        
        style = Object.assign({
            width: '100%',
            height: '100%',
            backgroundImage: src ? `url(${ src.url })` : 'none',
            backgroundSize: 'cover',
            paddingBottom: inline ? h / w * 100 + '%' : 0,
        }, style );
        
        return m( 'div', { className, style } );
        
    }
    
}