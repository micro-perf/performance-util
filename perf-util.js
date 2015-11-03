_wrap_ ( function( global ) {
	var nameInfo = {};

	global.performance.markStart = function( markName ) {
		var count = nameInfo[ markName ];
		if ( count === undefined ) {
			count = nameInfo[ markName ] = 0;
		}
		nameInfo[ markName ] = ++count;
		global.performance.mark( markName + "-start-" + count );
	}

	return function() {
		return {
			"nameInfo": nameInfo
		}
	}
} );

function _wrap_ ( fp ) {
	fp( window );
}
