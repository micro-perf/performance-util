_wrap_ ( function( global ) {
	var nameInfo = {};

	function mark( name, type ) {
		var count = nameInfo[ name ];
		if ( count === undefined ) {
			count = nameInfo[ name ] = 0;
		}
		nameInfo[ name ] = ++count;
		global.performance.mark( name + "-" + type + "-" + count );
	}

	global.performance.markStart = function( name ) {
		mark( name, "start" );
	}

	global.performance.markEnd = function( name ) {
		mark( name, "end" );
	}

	return function() {
		return {
			"nameInfo": nameInfo
		}
	}
} );
