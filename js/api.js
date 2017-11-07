var m = require('mithril');
var { apiBase } = require('./config');

module.exports = url => m.request( apiBase + url )