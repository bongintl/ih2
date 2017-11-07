var m = require('mithril');

module.exports = {
    
    view: ({ attrs: { visible }, children }) => {
        
        return m('.toggler', { class: visible ? '' : 'toggler_hidden' }, children );
        
    }
    
}