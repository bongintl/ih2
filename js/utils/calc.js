var unit = unit => value => ({ unit, value });
var rem = unit('rem');
var px = unit('px');
var pct = unit('%');

var op = ( symbol, fn ) => ( a, b ) => {
    if ( a.unit === b.unit ) return { value: fn( a, b ), unit: a.unit };
    return { op: symbol, a, b, fn };
}

var add = op( '+', ( a, b ) => a + b );
var subtract = op( '-', ( a, b ) => a - b );
var multiply = op( '*', ( a, b ) => a * b );
var divide = op( '/', ( a, b ) => a / b );

var write = x => {
    if ( x.op ) {
        return `( ${ write( x.a ) } ${ x.op } ${ write( x.b ) } )`;
    } else if ( x.value ) {
        return x.value + x.unit;
    }
}

var px = ( x, units ) => {
    if ( x.op ) {
        return x.fn( px( x.a, rem, pct ), px( x.b, rem, pct ) );
    } else if ( x.unit === 'rem' ) {
        return x.value * rem;
    } else if ( x.unit === 'pct' ) {
        return x.value * pct;
    } else {
        return x.value;
    }
}

var calc = ( x, units ) => ({ px: px( x ), css: 'calc(' + write( x ) })