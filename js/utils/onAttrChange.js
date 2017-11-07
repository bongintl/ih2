var isArray = Array.isArray;
var arraysEqual = ( a, b ) => a.every( ( x, i ) => b[ i ] === x );
var eq = ( a, b ) => a === b || ( isArray( a ) && isArray( b ) && arraysEqual( a, b ) );

module.exports = ( vnode, old, attr, cb ) => {
    var from = old.attrs[ attr ];
    var to = vnode.attrs[ attr ];
    if ( !eq( from, to ) ) cb( from, to );
}