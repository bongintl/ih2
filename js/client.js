var m = require("mithril")
var { state, emitter } = require('./state');
var routes = require('./routes');

if ( 'ontouchstart' in window ) document.body.classList.add( 'touch' );

emitter.on( state.events.LOADED, () => {
    m.route( document.body, '/', routes );
    window.addEventListener( 'resize', () => {
        emitter.emit( state.events.RESIZE );
    });
})

emitter.emit( state.events.LOAD );