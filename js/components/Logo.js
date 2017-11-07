var m = require('mithril');

var IH = require('./IH');

var { state } = require('../state');

var { spacing } = require('../config');
var tween = require('../utils/tween');

var style = ({ x, y, w, h }) => ({
    // transform: `translate( ${x}px, ${y}px)`,
    left: x + 'px',
    top: y + 'px',
    width: w + 'px',
    height: h + 'px'
})

var frameX = size => {
    
    var [ w, h ] = size;
    
    var ww = window.innerWidth
    var wh = window.innerHeight
    
    var y = ( wh - h ) / 2;
    var w = ( ww - spacing * 4 - w ) / 2;
    
    return [
        { x: spacing, y, w, h },
        { x: ww - spacing - w, y, w, h },
    ]
    
}

var frameY = size => {
    
    var [ w, h ] = size;
    
    var ww = window.innerWidth
    var wh = window.innerHeight
    
    var x = ( ww - w ) / 2
    var h = ( wh - spacing * 4 - h ) / 2
    
    return [
        { x, y: spacing, w, h },
        { x, y: wh - spacing - h, w, h }
    ]
    
}

var frame = ( size, axis ) => {
    
    return axis === 0 ? frameX( size ) : frameY( size );
    
}

module.exports = {
    
    view: () => {
        
        var { logoPosition, featuredImageSize, featuredImageAxis } = state;
        
        var styles = [ {}, {} ];
        var cls = '.logo.logo_' + logoPosition;
        
        if ( logoPosition === 'frame' ) {
            styles = frame( featuredImageSize, featuredImageAxis ).map( style );
            cls += featuredImageAxis === 0 ? '-x' : '-y';
        }
        
        return m( cls, { onclick: () => m.route.set( '/' ) },
            m( IH, { letter: 'i', fixed: true, style: styles[ 0 ] } ),
            m( IH, { letter: 'h', fixed: true, style: styles[ 1 ] } )
        )
        
    }
    
}