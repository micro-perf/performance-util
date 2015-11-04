_wrap_ ( function( global ) {
	var nameInfo = {};

	function mark( name, type, count ) {
		global.performance.mark( name + "-" + type + "-" + count );
	}

	global.performance.markStart = function( name ) {
		var count = nameInfo[ name ];
		if ( count === undefined ) {
			count = nameInfo[ name ] = 0;
		}
		nameInfo[ name ] = ++count;
		mark( name, "start", nameInfo[ name ] );
	}

	global.performance.markEnd = function( name ) {
		mark( name, "end", nameInfo[ name ] );
	}

	global.performance.groupMeasure = function( name ) {
		var count = nameInfo[name];
		global.performance.measure( name + "-measure-" + count, name + "-start-" + count, name + "-end-" + count );
	}

	return function() {
		return {
			"nameInfo": nameInfo
		}
	}
} );
