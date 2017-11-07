var DPR = window.devicePixelRatio || 1;

var bigEnough = width => src => src.w >= width * DPR;

module.exports = ( srcs, width ) => {
    
    return srcs.find( bigEnough( width ) ) || srcs[ srcs.length - 1 ];
    
}