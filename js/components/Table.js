var m = require('mithril');

module.exports = {
    
    view: ({ attrs: { rows } }) => {
        
        return m('.table',
            rows.map( ({ label, text, link }) => {
                return m('.table__row',
                    m( '.table__cell.table__cell_left',
                        m( 'p', label )
                    ),
                    m( '.table__cell.table__cell_right',
                        m( 'p',
                            link ?
                                m( 'a', { href: link, target: '_blank' }, text )
                            :
                                m( 'p', text )
                        )
                    )
                )
            })
        )
        
    }
    
}