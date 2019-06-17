<?php	
namespace Craft;

ini_set('max_execution_time', 300);

return [
    'all' => function () {

        $home = craft()
            -> elements
            -> getCriteria( ElementType::Entry, [ 'section' => 'home' ] )
            -> first();
        
        $projects = craft()
            -> elements
            -> getCriteria( ElementType::Entry, [ 'section' => 'projects', 'limit' => null ] );
        
        return [
            'featured' => featured( $home -> featured ),
            'contact' => table( $home -> contact ),
            'projects' => projects( $projects )
        ];
        
    }
];

function featured ( $assets ) {
    $featured = [];
    foreach ( $assets as $image ) {
        $featured[] = transform( $image );
    }
    return $featured;
}

function table ( $rows ) {
    $table = [];
    foreach ( $rows as $row ) {
        $table[] = [
            'label' => $row -> label,
            'text' => $row -> text,
            'link' => $row -> tableLink
        ];
    }
    return $table;
}

function projects ( $entries ) {
    $projects = [];
    foreach ( $entries as $entry ) {
        $projects[] = project( $entry );
    }
    return $projects;
}

function project ( $entry ) {
    return [
        'title' => $entry -> title,
        'slug' => $entry -> slug,
        'thumbnail' => transform( $entry -> thumbnail -> first() ),
        'files' => files( $entry -> files ),
        'description' => $entry -> description ? $entry -> description -> getParsedContent() : '',
        'credits' => table( $entry -> credits )
    ];
}

function files ( $matrix ) {
    $files = [];
    foreach( $matrix as $block ) {
        switch ( $block -> type ) {
            case 'image':
            	$files[] = [
	            	'type' => 'image',
                    'srcs' => transform( $block -> file -> first() ),
                    'size' => $block -> size -> value
            	];
            	break;
            case 'vimeo':
                $files[] = [
                    'type' => 'video',
                	'url' => $block -> vimeoUrl,
                	'autoplay' => $block -> options -> contains('autoplay'),
                	'loop' => $block -> options -> contains('loop'),
                	'size' => [ $block -> width, $block -> height ]
                ];
                break;
        }
    }
    return $files;
}

function transform ( $asset ) {
	$transforms = craft() -> assetTransforms -> allTransforms;
	$sortByWidth = function ( $transformA, $transformB ) {
        return $transformA -> width > $transformB -> width ? 1 : -1;
    };
    usort( $transforms, $sortByWidth );
    $naturalWidth = (int) $asset -> getWidth();
    $naturalHeight = (int) $asset -> getHeight();
    $srcs = [];
	foreach ( $transforms as $transform ) {
		if ( $transform -> width > $naturalWidth ) continue;
		$srcs[] = [
			'w' => $asset -> getWidth( $transform ),
			'h' => $asset -> getHeight( $transform ),
			'url' => $asset -> getUrl( $transform )
		];
	}
	if ( count( $srcs ) < count( $transforms ) ) {
		$natural = $asset -> getUrl([
			'mode' => 'crop',
			'width' => $naturalWidth,
			'height' => $naturalHeight,
			'quality' => 75
		]);
		$srcs[] = [
			'w' => $naturalWidth,
			'h' => $naturalHeight,
			'url' => $natural
		];
	}
	return $srcs;
}