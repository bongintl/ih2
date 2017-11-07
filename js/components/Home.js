var m = require('mithril');
var Page = require('./Page')
var Projects = require('./Projects');
var Featured = require('./Featured');
var { state } = require('../state');

module.exports = {
    
    onbeforeremove: ({ dom }) => {
        
        if ( !dom ) return;
        
        dom.classList.add('page_exit');
        
        return new Promise( resolve => setTimeout( resolve, 500 ) );
        
    },
    
    view: () => {
        
        var { featuredImageIndex, featuredImageSize } = state;
        
        var { image, slug } = state.data.featured[ featuredImageIndex ];
        
        return m( Page,
            m('.section.section_huge',
                !state.projectsVisible &&  m( Featured, {
                    key: featuredImageIndex,
                    srcs: image,
                    size: featuredImageSize,
                    href: '/project/' + slug
                })
            ),
            m( Projects )
        );
        
    }
    
}