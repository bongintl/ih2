var fit = fn => ( [ srcW, srcH ], [ destW, destH ] ) => {
    var scale = fn( destW / srcW, destH / srcH );
    return [ srcW * scale, srcH * scale ];
}

module.exports = {
    contain: fit( Math.min ),
    cover: fit( Math.max )
}