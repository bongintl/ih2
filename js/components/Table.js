var m = require('mithril');

module.exports = {
    
    view: ({ attrs: { rows } }) => {
        
        return m('.table',
            rows.map( ({ label, text, link }) => {
                
                var cells = [
                    m( '.table__cell.table__cell_left',
                        m( 'p', label )
                    ),
                    m( '.table__cell.table__cell_right',
                        m( 'p', text )
                    )
                ];
                
                if ( link ) {
                    return m('.table__row',
                        m('a', { href: link, target: '_blank' },
                            cells
                        )
                    )
                } else {
                    return m('.table__row', cells );
                }
                
            })
        )
        
    }
    
}