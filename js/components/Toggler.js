var m = require('mithril');

module.exports = {
    
    transition: false,
    
    onbeforeupdate: ( vnode, old ) => {
        
        if ( old.attrs.visible !== vnode.attrs.visible ) {
            
            vnode.state.transition = true;
            
            setTimeout( () => {
                
                vnode.state.transition = false;
                
                m.redraw();
                
            }, vnode.attrs.visible ? 500 + 750 : 500 );
            
        }
        
    },
    
    view: ({ attrs: { visible }, state: { transition }, children }) => {
        
        var className = [
            'toggler',
            visible && 'toggler_visible',
            transition && 'toggler_transition'
        ].filter( x => x ).join(' ');
        
        return m('div', { className }, children );
        
    }
    
}