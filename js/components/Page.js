var m = require('mithril');
var { state, emitter } = require('../state');

var emitVisible = element => {
    var projects = element.querySelector('#projects');
    var visible = !!projects && projects.getBoundingClientRect().top < window.innerHeight;
    emitter.emit( state.events.PROJECTS_VISIBILITY, visible );
}

var onscroll = e => emitVisible( e.target );

module.exports = {
    
    entering: true,
    
    
    
    oncreate: vnode => {
        
        emitVisible( vnode.dom );
        
        setTimeout( () => {
            vnode.state.entering = false;
            m.redraw()
        }, 500 )
        
    },
    
    view: ({ state: { entering }, attrs: { key }, children }) => {
        
        return m( '.page' + ( entering ? '.page_enter' : '' ), { key, onscroll }, children );
        
    }
    
}