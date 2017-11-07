var m = require('mithril');

var { state } = require('../state');
var { spacing, curveSize } = require('../config');

var Logo = require('./Logo');
var Featured = require('./Featured');

var loadImage = require('../utils/loadImage');
var wait = require('../utils/wait');
var { contain } = require('../utils/fitRect');

var updateSize = ( vnode ) => {
    
    var { image } = state.data.featured[ vnode.state.imageIndex ];
    
    var size = [ image[ 0 ].w, image[ 0 ].h ];
    
    var safeArea = [
        window.innerWidth - spacing * 4,
        window.innerHeight - spacing * 4,
    ]
    
    safeArea[ vnode.state.axis === 'x' ? 0 : 1 ] -= curveSize[ 1 ] * 4
    
    var max = contain( size, safeArea );
    
    var scale = [ 1/4, 1/2, 3/4, 1 ][ Math.floor( Math.random() * 4 ) ];
    
    vnode.state.imageSize = [
        max[ 0 ] * scale,
        max[ 1 ] * scale
    ]
    
}

var check = vnode => {
    
    var shouldAnimate = vnode.attrs.route === 'home' && !state.projectsVisible;
    
    if ( shouldAnimate && !vnode.state.timer ) {
        
        start( vnode );
        
    } else if ( !shouldAnimate && vnode.state.timer ) {
        
        stop( vnode );
        
    }
    
}

var start = vnode => {
        
    var tick = () => {
        
        vnode.state.axis = vnode.state.axis === 'x' ? 'y' : 'x';
        vnode.state.imageIndex++;
        vnode.state.imageIndex %= state.data.featured.length;
        updateSize( vnode );
        vnode.state.timer = setTimeout( tick, 4000 );
        m.redraw();

    }
    
    vnode.state.timer = setTimeout( tick, 4000 );
    
}

var stop = vnode => {
        
    clearTimeout( vnode.state.timer );
    vnode.state.timer = false;
    
}

module.exports = {
    
    // timer: false,
    
    // oninit: vnode => {
        // updateSize( vnode );
        // check( vnode );
    // },
    
    // onupdate: check,
    
    view: ({ children } ) => {
        
        var { route, featuredImageIndex, featuredImageSize } = state;
        
        var { image, slug } = state.data.featured[ featuredImageIndex ];
        
        return [
            m( Logo ),
            // [ route === 'home' && ],
            children
        ]
        
        // return [
        //     m( Logo, /*{ position, axis }*/ ),
        //     // [ route === 'home' && !state.projectsVisible &&  m( Featured, {
        //     //         key: imageIndex,
        //     //         srcs: ft.image,
        //     //         size: imageSize,
        //     //         href: '/project/' + ft.slug
        //     // }) ],
        //     children
        // ]
        
    }
    
}

