var m = require('mithril');
var { apiBase } = require('./config');

module.exports = url => {
    return m.request( apiBase + url )
}

var repeat = ( arr, times ) => arr.concat( times === 1 ? [] : repeat( arr, times - 1 ) );

// var data = {
    
//     '/': {
//         featured: [{
//             image: [{ w: 1700, h: 1134, url: 'http://isabelandhelen.com/img/_xlarge/LCC_IH_RESIZE_07.jpg' }],
//             slug: 'lcc-degree-show-2017'
//         },{
//             image: [{ w: 1300, h: 1950, url: 'http://isabelandhelen.com/img/_large/IMG_5443.jpg' }],
//             slug: 'lcc-degree-show-2017'
//         },{
//             image: [{ w: 1700, h: 1134, url: 'http://isabelandhelen.com/img/_xlarge/isabelhelen_selfridges_10.jpg' }],
//             slug: 'lcc-degree-show-2017'
//         }],
//         projects: repeat( [{
//             title: 'LCC Degree Show 2017',
//             thumbnail: [
//                 { w: 1700, h: 1134, url: 'http://isabelandhelen.com/img/_xlarge/LCC_IH_RESIZE_07.jpg' }
//             ],
//             slug: 'lcc-degree-show-2017'
//         },{
//             title: 'The Noisemakers',
//             thumbnail: [
//                 { w: 1300, h: 1950, url: 'http://isabelandhelen.com/img/_large/IMG_5443.jpg' }
//             ],
//             slug: 'the-noisemakers'
//         }], 4 ),
//         contact: [{
//             label: 'Email',
//             text: 'isabelandhelen@gmail.com',
//             url: 'bong.international'
//         },{
//             label: 'Instagram',
//             text: '@isabelandhelen',
//             url: null
//         },{
//             label: 'Isabel',
//             text: '+44 1241 420420',
//             url: null
//         },{
//             label: 'Helen',
//             text: '+44 1241 420420',
//             url: null
//         }]
//     },
    
//     'project': {
//         title: 'LCC Degree Show 2017',
//         images: [{
//             size: 'large',
//             srcs: [{ w: 1700, h: 1134, url: 'http://isabelandhelen.com/img/_xlarge/LCC_IH_RESIZE_07.jpg' }]
//         },{
//             size: 'huge',
//             srcs: [{ w: 1700, h: 1134, url: 'http://isabelandhelen.com/img/_xlarge/LCC_IH_RESIZE_07.jpg' }]
//         }],
//         description: "<p>Signage and wayfinding for LCC's degree shows in collaboration with designer Nina Jua Klein.</p>",
//         credits: [{
//             label: 'Commissioned by',
//             text: 'Nina Jua Klien',
//             url: 'bong.international'
//         },{
//             label: 'Client',
//             text: 'LCC',
//             url: null
//         }]
//     }
    
// }
