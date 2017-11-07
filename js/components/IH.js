var m = require('mithril');

module.exports = {
    
    view: ({ attrs: { letter, style, fixed }}) => {
        
        var fixedClass = fixed ? '.ih_fixed' : ''
        
        switch ( letter ) {
            
            case 'i':
                
                return m('.ih.ih_i' + fixedClass, { style, key: letter },
                    m('.ih__line.ih__line_top'),
                    m('.ih__line.ih__line_bottom'),
                    m('.ih__line.ih__line_vertical'),
                    m('.ih__curves.ih__curves_top'),
                    m('.ih__curves.ih__curves_bottom')
                )
                
            case 'h':
                
                return m('.ih.ih_h' + fixedClass, { style, key: letter },
                    m('.ih__line.ih__line_left'),
                    m('.ih__line.ih__line_right'),
                    m('.ih__line.ih__line_horizontal'),
                    m('.ih__curves.ih__curves_left'),
                    m('.ih__curves.ih__curves_right')
                )
            
        }
        
    }
    
}