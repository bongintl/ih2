var m = require('mithril');

var selectSrc = require('./utils/selectSrc');
var loadImage = require('./utils/loadImage');
var wait = require('./utils/wait');
var { contain } = require('./utils/fitRect');
var { spacing, curveSize, transitionDelay } = require('./config');

var emitter = require('nanobus')();

var state = {
    
    events: {
        START: 'start',
        LOADED: 'loaded',
        ROUTE: 'route',
        RESIZE: 'resize',
        PROJECTS_VISIBILITY: 'projectsVisibility',
        UPDATE_LOGO_POSITION: 'updateLogoPosition',
        ANIMATION_START: 'animationStart',
        ANIMATION_STOP: 'animationStop',
        ANIMATION_STEP: 'animationStep',
        UPDATE_IMAGE_SIZE: 'updateImageSize'
    },
    
    data: {
        featured: [],
        contact: [],
        projects: []
    },
    
    route: null,
    
    projectsVisible: false,
    animating: false,
    
    logoPosition: 'frame',
    
    featuredImageIndex: 0,
    featuredImageSize: [ 1, 1 ],
    featuredImageAxis: Math.random() > .5 ? 1 : 0
    
}

emitter.on( state.events.START, data => {
    state.data = data;
    var image = state.data.featured[ 0 ];
    state.featuredImageSize = sizeFeaturedImage( image, 1 );
    var w = state.featuredImageSize[ 0 ];
    loadImage( selectSrc( image, w ).url )
        .then( () => {
            emitter.emit( state.events.LOADED );
        })
})

emitter.on( state.events.ROUTE, route => {
    state.route = route;
    emitter.emit( state.events.UPDATE_LOGO_POSITION );
})

emitter.on( state.events.RESIZE, () => {
    emitter.emit( state.events.UPDATE_IMAGE_SIZE );
    m.redraw();
})

emitter.on( state.events.PROJECTS_VISIBILITY, visible => {
    if ( visible === state.projectsVisible ) return;
    state.projectsVisible = visible;
    emitter.emit( state.events.UPDATE_LOGO_POSITION );
})

emitter.on( state.events.UPDATE_LOGO_POSITION, () => {
    if ( state.projectsVisible ) {
        emitter.emit( state.events.ANIMATION_STOP );
        state.logoPosition = 'gutter';
    } else if ( state.route === 'project' ) {
        emitter.emit( state.events.ANIMATION_STOP );
        state.logoPosition = 'edge';
    } else if ( state.route === 'home' ) {
        state.logoPosition = 'frame';
        emitter.emit( state.events.ANIMATION_START );
    }
})

emitter.on( state.events.ANIMATION_START, () => {
    if ( state.animating ) return;
    state.animating = true;
    emitter.emit( state.events.ANIMATION_STEP );
})

emitter.on( state.events.ANIMATION_STOP, () => {
    state.animating = false;
})

var sizeFeaturedImage = ( image, axis ) => {
    var size = [ image[ 0 ].w, image[ 0 ].h ];
    var safeArea = [
        window.innerWidth - spacing * 4,
        window.innerHeight - spacing * 4,
    ];
    safeArea[ axis ] -= spacing * 4;
    var max = contain( size, safeArea );
    var scale = [ 1/4, 1/2, 3/4, 1 ][ Math.floor( Math.random() * 4 ) ];
    return [
        max[ 0 ] * scale,
        max[ 1 ] * scale
    ]
}

emitter.on( state.events.ANIMATION_STEP, () => {
    var nextIndex = ( state.featuredImageIndex + 1 ) % state.data.featured.length;
    var nextImage = state.data.featured[ nextIndex ];
    var nextAxis = state.featuredImageAxis === 0 ? 1 : 0;
    var nextSize = sizeFeaturedImage( nextImage, nextAxis );
    var cancelled = false;
    emitter.once( state.events.ANIMATION_STOP, () => cancelled = true );
    return Promise.all([
        wait( transitionDelay * 4 ),
        loadImage( selectSrc( nextImage, nextSize[ 0 ] ).url )
    ]).then( () => {
        if ( cancelled ) return;
        state.featuredImageIndex = nextIndex;
        state.featuredImageAxis = nextAxis;
        state.featuredImageSize = nextSize;
        m.redraw();
        emitter.emit( state.events.ANIMATION_STEP );
    })
})

// emitter.prependListener('*', (...args) => {
//     console.log('event:', ...args);
// })

module.exports = { state, emitter }