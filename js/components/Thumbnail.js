var m = require("mithril")
var Image = require('./Image');

module.exports = {
    
    view: ({ attrs: { project } }) => {
        
        var { w, h } = project.thumbnail[ 0 ];
        
        var overlayStyle = {
            width: h / w * 100 + '%',
            height: w / h * 100 + '%'
        }
        
        var href = '/project/' + project.slug;
        
        return m('a.thumbnail', { href, oncreate: m.route.link },
            m( Image, { srcs: project.thumbnail, inline: true } ),
            m( '.thumbnail__overlay-container', { style: overlayStyle },
                m('.thumbnail__overlay-label', project.title )
            ),
            m( '.thumbnail__inline-label', project.title )
        )
        
    }
    
}