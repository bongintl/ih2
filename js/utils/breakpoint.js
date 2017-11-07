var { breakpoints } = require('../config');

module.exports = () => {
    return [ 'large', 'medium', 'small' ].find( key => {
        return breakpoints[ key ] <= window.innerWidth
    });
}