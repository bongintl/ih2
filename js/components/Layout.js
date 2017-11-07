var m = require('mithril');

var Logo = require('./Logo');

module.exports = {
    
    view: ({ children } ) => {
        
        return [
            m( Logo ),
            children
        ]
        
    }
    
}