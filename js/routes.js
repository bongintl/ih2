var m = require('mithril')

var { state, emitter } = require('./state');

var Layout = require('./components/Layout');
var Home = require('./components/Home');
var Project = require('./components/Project');

var route = ( name, render ) => ({
    onmatch : () => emitter.emit( state.events.ROUTE, name ),
    render: () => render( m.route.param )
})

module.exports = {
    
    '/': route( 'home', () => m( Layout, m( Home ) ) ),
    
    '/project/:slug': route( 'project', () => {
        var slug = m.route.param('slug');
        return m( Layout,
            m( Project, { slug, key: slug } )
        )
    })
    
}