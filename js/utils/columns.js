var breakpoint = require('./breakpoint');

var { spacing, columns } = require('../config');

var ww = () => window.innerWidth;
var cols = () => columns[ breakpoint() ];

var columnWidth = w => ( ( ww() - spacing ) / cols() * w ) - spacing;
var columnX = x => spacing + ( ww() - spacing ) / cols() * x;

module.exports = { columnWidth, columnX };