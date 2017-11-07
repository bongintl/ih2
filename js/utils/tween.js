var tween = ( onProgress, duration, from, to ) => {
    
    if ( arguments.length === 1 ) {
        
        return ( from, to, duration ) => tween( onProgress, from, to, duration );
        
    }
    
    var startTime = Date.now();
    
    return new Promise( resolve => {
        
        var tick = () => {
            
            var t = Math.min( ( Date.now() - startTime ) / duration, 1 );
            
            onProgress( t, from, to );
            
            if ( t < 1 ) {
                
                requestAnimationFrame( tick );
                
            } else {
                
                resolve( to );
                
            }
            
        }
        
        requestAnimationFrame( tick );
    
    })
    
}

tween.lerp = ( a, b, t ) => a + ( b - a ) * t;

module.exports = tween;