var m = require('mithril')

var update = ({ dom, state }) => {
    
    var $text = dom.childNodes[ 0 ];
    
    var { height } = $text.getBoundingClientRect();
    
    if ( height !== state.height ) {
        
        state.height = height;
        m.redraw();
        
    }
    
}

module.exports = {
    
    height: 0,
    
    oncreate: update,
    
    onupdate: update,
    
    view: ({ attrs: { title }, state: { height } }) => {
        
        var style = {
            height: height + 'px'
        }
        
        return m('.project-title', { style },
            m('.project-title__text', title )
        )
        
    }
    
}