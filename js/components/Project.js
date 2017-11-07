var m = require('mithril');

var api = require('../api');
var { state } = require('../state');

var Page = require('./Page');
var Toggler = require('./Toggler');
var Image = require('./Image');
var ProjectTitle = require('./ProjectTitle');
var Table = require('./Table');
var Projects = require('./Projects');

module.exports = {
    
    data: null,
    
    oninit: vnode => {
        
        api( '/project/' + vnode.attrs.slug ).then( data => vnode.state.data = data );
        
    },
    
    onbeforeremove: ({ dom }) => {
        
        if ( !dom ) return;
        
        dom.classList.add('page_exit');
        
        return new Promise( resolve => setTimeout( resolve, 500 ) );
        
    },
    
    view: ({ attrs: { slug }, state: { data } } ) => {
        
        if ( !data ) return;
        
        var { title, images, description, credits } = data;
        
        return m( Page, { key: slug },
            m( Toggler, { visible: !state.projectsVisible },
                images.map( ({ size, srcs }) => {
                    return m( '.section.section_' + size,
                        m( Image, { srcs, cover: size === 'huge' } )
                    )
                }),
                m('.section.section_text',
                    m( '.project-info',
                        m( ProjectTitle, { title } ),
                        description.length > 0 && m('.project-description', m.trust( description ) ),
                        credits.length > 0 && m( Table, { rows: credits } )
                    )
                )
            ),
            m( Projects, { without: slug } )
        )
        
    }
    
}