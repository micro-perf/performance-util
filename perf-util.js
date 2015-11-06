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

	global.performance.searchEntries = function( filter ) {

		if ( !filter ) {
			return global.performance.getEntries();
		}
		var perfEntryList;
		if ( filter.entryType ) {
			perfEntryList = global.performance.getEntriesByType( filter.entryType );
		} else {
			perfEntryList = global.performance.getEntries();
		}

		return perfEntryList.filter( function( entry ) {
			return filter.name.test( entry.name )
		} );

	}

	return function() {
		return {
			"nameCount": nameCount
		}
	}
} );

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if ( !Array.prototype.reduce ) {
  Array.prototype.reduce = function( callback /*, initialValue*/ ) {
    if ( this == null ) {
        throw new TypeError( "Array.prototype.reduce called on null or undefined" );
    }
    if ( typeof callback !== "function" ) {
        throw new TypeError( callback + " is not a function" );
    }
    var t = Object( this ), len = t.length >>> 0, k = 0, value;
    if ( arguments.length == 2 ) {
        value = arguments[ 1 ];
    } else {
        while ( k < len && !( k in t ) ) {
            k++;
        }
        if ( k >= len ) {
            throw new TypeError( "Reduce of empty array with no initial value" );
        }
        value = t[ k++ ];
    }
    for ( ; k < len; k++ ) {
        if ( k in t ) {
            value = callback( value, t[k], k, t );
        }
    }
    return value;
  };
}

function _wrap_ ( fp ) {
	fp( window );
}
