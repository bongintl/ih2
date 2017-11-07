var m = require('mithril');
var Page = require('./Page');
var IH = require('./IH');
var Table = require('./Table');
var Thumbnail = require( './Thumbnail' );
var Toggler = require('./Toggler');

var { state } = require('../state');
var config = require('../config');
var breakpoint =  require('../utils/breakpoint')

var Logo = () => {
    
    return m('.projects-logo',
        m( IH, { letter: 'i' } ),
        m( IH, { letter: 'h' } )
    )
    
}

var Contact = rows => m( Table, { rows } )

var minIndex = arr => arr.indexOf( Math.min( ...arr ) );

var columns = ( projects, contact ) => {
    
    var cols;
    
    switch ( breakpoint() ) {
        
        case 'large':
            cols = [
                [],
                [ Contact( contact ) ],
                []
            ];
            break;
            
        case 'medium':
            cols = [
                [],
                [ Contact( contact ) ]
            ];
            break;
            
        case 'small':
            cols = [
                [ Logo(), Contact( contact ) ]
            ];
            break;
        
    }
    
    cols = cols.map( items => ({ items, height: 0 }) )
    
    projects.forEach( project => {
        
        var shortest = cols[ minIndex( cols.map( col => col.height ) ) ];
        
        shortest.items.push( m( Thumbnail, { project } ) );
        var thumb = project.thumbnail[ 0 ];
        shortest.height += thumb.h / thumb.w;
        
    })
    
    return cols.map( col => m( '.column', col.items ) );
    
}

module.exports = {
    
    onbeforeremove: ({ dom }) => {
        
        if ( !dom ) return;
        
        dom.classList.add('page_exit');
        
        return new Promise( resolve => setTimeout( resolve, 500 ) );
        
    },
    
    view: ({ attrs: { without } }) => {
        
        var { projects, contact } = state.data;
        
        projects = projects.filter( project => project.slug !== without );
        
        return m( Toggler, { visible: state.projectsVisible },
            m('#projects',
                columns( projects, contact )
            )
        );
        
    }
    
}