var m = require('mithril');

var update = ({ dom, state }) => {
    
    var { top, bottom } = dom.getBoundingClientRect();
    
    var visible = bottom > 0 && top < window.innerHeight;
    
    if ( visible !== state.visible ) {
        state.visible = visible;
        m.redraw();
    }

}

var vimeoEmbed = ( id, autoplay, loop ) => {
    return `https://player.vimeo.com/video/${id}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&title=0&byline=0&portrait=0`;
}

module.exports = {
    
    visible: false,
    
    oncreate: update,
    
    onupdate: update,
    
    view: ({ attrs: { url, autoplay, loop, mute, width, height }, state: { visible } }) => {
        
        var match = /vimeo.*\/(\d+)/i.exec( url );
        
        if ( match ) {
            return m('iframe.video', {
                src: visible ? vimeoEmbed( match[ 1 ], autoplay, loop ) : ''
            });
        } else {
            return 'Bad Vimeo URL 😩'
        }
        
    }
    
}