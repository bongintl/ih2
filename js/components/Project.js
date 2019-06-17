var m = require('mithril');

var { state } = require('../state');

var Page = require('./Page');
var Toggler = require('./Toggler');
var Image = require('./Image');
var Vimeo = require('./Vimeo');
var ProjectTitle = require('./ProjectTitle');
var Table = require('./Table');
var Projects = require('./Projects');

var breakpoint = require('../utils/breakpoint');
var { columnWidth } = require('../utils/columns');
var { spacing } = require('../config')

var viewport = () => {
    var w = breakpoint() === 'small'
        ? window.innerWidth - ( spacing * 2 )
        : window.innerWidth - columnWidth( 1 ) * 2 - ( spacing * 4 );
    var h = window.innerHeight - ( spacing * 2 );
    return [ w, h ];
}
var cover = ( src, dest ) => {
    var scale = Math.max( dest[ 0 ] / src[ 0 ], dest[ 1 ] / src[ 1 ] );
    return [ src[ 0 ] * scale, src[ 1 ] * scale ];
}
var cropAmount = ( src, dest ) => {
    var area = ([ x, y ]) => x * y;
    var destArea = area( dest );
    var imageArea = area( cover( src, dest ) );
    return ( imageArea - destArea ) / imageArea;
}
var imageSize = srcs => [ srcs[ 0 ].w, srcs[ 0 ].h ];
var first = srcs => {
    var cover = cropAmount( imageSize( srcs ), viewport() ) < .2;
    var backgroundSize = cover ? 'cover' : 'contain';
    return m('.section.section_100vh',
        m( Image, { srcs, style: { backgroundSize } } )
    )
}
var full = srcs => {
    if ( cropAmount( imageSize( srcs ), viewport() ) > .2 ) {
        return m( '.section', m( Image, { srcs, inline: true } ) );
    } else {
        return m( '.section', m( Image, { srcs, inline: true } ) );
    }
}
var half = ( srcs, side ) => {
    var vp = viewport();
    var dest = [ vp[ 0 ] / 2, vp[ 1 ] ];
    var left = side === 'left';
    if ( cropAmount( imageSize( srcs ), dest ) < .2 ) {
        return m('.section.section_100vh',
            m( Image, {
                srcs,
                style: {
                    width: dest[ 0 ] + 'px',
                    left: left ? 0 : 'auto',
                    right: left ? 'auto': 0
                }
            })
        )
    } else {
        var { w, h } = srcs[ 0 ];
        return m('.section',
            m( Image, {
                srcs,
                inline: true,
                style: {
                    height: 'auto',
                    backgroundSize: 'auto 100%',
                    backgroundPosition: side,
                    paddingBottom: ( ( h / 2 ) / w * 100 ) + '%'
                }
            })
        )
    }
}

var renderFile = ( file, i ) => {
    switch ( file.type ) {
        case 'image':
            switch ( file.size ) {
                case 'full':
                    return i === 0 ? first( file.srcs ) : full( file.srcs );
                case 'left':
                case 'right':
                    return half( file.srcs, file.size );
                default:
                    throw new Error(`Whats a ${file.size}?`)
            }
        case 'video':
            return m('.section.section_100vh', m( Vimeo, file ) );
    }
}

module.exports = {
    
    onbeforeremove: ({ dom }) => {
        
        if ( !dom ) return;
        
        dom.classList.add('page_exit');
        
        return new Promise( resolve => setTimeout( resolve, 500 ) );
        
    },
    
    view: ({ attrs: { slug } } ) => {
        
        var { title, files, description, credits } = state.data.projects.find( p => p.slug === slug );
        
        return m( Page, { key: slug },
            m( Toggler, { visible: !state.projectsVisible },
                files.map( renderFile ),
                m('.section.section_text',
                    m( '.project-info',
                        m( ProjectTitle, { title } ),
                        m('.project-description',
                            description.length > 0 && m.trust( description ),
                            credits.length > 0 && m( Table, { rows: credits } ) 
                        )
                    )
                )
            ),
            m( Projects, { without: slug } )
        )
        
    }
    
}