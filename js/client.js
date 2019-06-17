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

console.log(JSON.parse( document.getElementById('data').innerHTML ))

emitter.emit( state.events.START, JSON.parse( document.getElementById('data').innerHTML ) );