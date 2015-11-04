_wrap_ ( function( global ) {
	var nameCount = {};

	function mark( name, type, count ) {
		global.performance.mark( name + "-" + type + "-" + count );
	}

	function average ( values ) {
		return values.reduce( function( a, b ) {
			return a + b;
		} ) / values.length;
	}

	function median( values ) {
		var values = values.sort( function( a, b ) {
			return a - b;
		} );

		var half = Math.floor( values.length / 2 );
		if ( values.length % 2 ) {
			return values[ half ];
		} else {
			return ( values[ half - 1 ] + values[ half ] ) / 2.0;
		}
	}

	global.performance.markStart = function( name ) {
		var count = nameCount[ name ];
		if ( count === undefined ) {
			count = nameCount[ name ] = 0;
		}
		nameCount[ name ] = ++count;
		mark( name, "start", nameCount[ name ] );
	}

	global.performance.markEnd = function( name ) {
		mark( name, "end", nameCount[ name ] );
	}

	global.performance.groupMeasure = function( name ) {
		var count = nameCount[name];
		global.performance.measure( name + "-measure-" + count, name + "-start-" + count, name + "-end-" + count );
	}

	global.performance.analyzeMeasure = function( name ) {
		var entryList = global.performance.getEntriesByType( "measure" );
		var durationList = entryList.filter( function( v ) {
			return v.name.indexOf( name + "-measure-" ) > -1;
		} ).map( function( v ) {
			return v.duration;
		} );

		return {
			"count": durationList.length,
			"average": average( durationList ),
			"median": median( durationList ),
			"durationList": durationList
		}
	}

	return function() {
		return {
			"nameCount": nameCount
		}
	}
} );
