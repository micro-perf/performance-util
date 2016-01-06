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

	/**
	 * This method set to start mark.
	 * @name performance.markStart
	 * @param {String} [name] - name
	 */
	global.performance.markStart = function( name ) {
		if ( nameCount[ name ] === undefined ) {
			nameCount[ name ] = {
				"count": 0,
				"isMarkEndCalled": false
			}
			count = 0;
		}
		var count = nameCount[ name ].count;
		nameCount[ name ].count = ++count;
		nameCount[ name ].isMarkEndCalled = false;
		mark( name, "start", nameCount[ name ].count );
	}

	/**
	 * This method set to end mark.
	 * @name performance.markEnd
	 * @param {String} [name] - name
	 */
	global.performance.markEnd = function( name ) {
		if ( !nameCount[ name ] || ( nameCount[ name ] && nameCount[ name ].isMarkEndCalled ) ) {
			throw new Error( "You don`t have to same markEnd name.(" + name + ")" );
		} else {
			nameCount[ name ].isMarkEndCalled = true;
			var count = nameCount[ name ].count;
			mark( name, "end", count );
			groupMeasure( name );
		}
	}

	/**
	 * This method set to measure.
	 * @private
	 * @name performance.markEnd
	 * @param {String} [name] - name
	 */
	function groupMeasure( name ) {
		var count = nameCount[name].count;
		global.performance.measure( name + "-measure-" + count, name + "-start-" + count, name + "-end-" + count );
	}

	/**
	 * This method get to analyze to information having count, average, median, durationList.
	 * The count is total mark count.
	 * The average is average duration of measure
	 * The median is median duration of measure
	 * The durationList is list of duration.
	 * @name performance.markEnd
	 * @param {String} [name] - name
	 * @return {Array} performanceEntryList
	 */
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

	/**
	 * This method search entry. It can use name and entryType.
	 * @name performance.searchEntries
	 * @param {Object} [PerformanceEntryFilterOptions] - filter
	 * @param {String} [PerformanceEntryFilterOptions.entryType] - entryType of PerformanceEntry object.
	 * @param {Regexp} [PerformanceEntryFilterOptions.name] - name of PerformanceEntry object.
	 * @return {Array} performanceEntryList
	 */
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
