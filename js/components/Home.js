var m = require('mithril');
var Page = require('./Page')
var Projects = require('./Projects');
var Featured = require('./Featured');
var { state } = require('../state');
var tween = require('../utils/tween');

var scrollToProjects = ({ dom }) => tween({
    name: 'scroll',
    from: window.pageYOffset,
    to: window.innerHeight,
    duration: 500,
    easing: 'linear',
    onProgress: y => dom.scrollTop = y
});

module.exports = {
    
    onbeforeremove: ({ dom }) => {
        
        if ( !dom ) return;
        
        dom.classList.add('page_exit');
        
        return new Promise( resolve => setTimeout( resolve, 500 ) );
        
    },
    
    view: vnode => {
        
        var { featuredImageIndex, featuredImageSize } = state;
        
        var image = state.data.featured[ featuredImageIndex ];
        
        return m( Page,
            m('.home', { onclick: () => scrollToProjects( vnode ) },
                !state.projectsVisible &&  m( Featured, {
                    key: featuredImageIndex,
                    srcs: image,
                    size: featuredImageSize
                })
            ),
            m( Projects )
        );
        
    }
    
}