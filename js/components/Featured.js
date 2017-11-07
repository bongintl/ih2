var m = require('mithril');
var Image = require('./Image');

module.exports = {
    
    onbeforeremove: ({ dom }) => {
        
        dom.classList.add('featured_exit');
        
        return new Promise( resolve => setTimeout( resolve, 500 ) );
        
    },
    
    view: ({ attrs: { srcs, size, href } }) => {
        
        var style = {
            width: size[ 0 ] + 'px',
            height: size[ 1 ] + 'px'
        }
        
        return m('a.featured', { style, href, oncreate: m.route.link },
            m( Image, { srcs } )
        )
        
    }
    
}