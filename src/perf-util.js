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
		var count = nameCount[ name ];
		if ( count === undefined ) {
			count = nameCount[ name ] = 0;
		}
		nameCount[ name ] = ++count;
		mark( name, "start", nameCount[ name ] );
	}

	/**
	 * This method set to end mark.
	 * @name performance.markEnd
	 * @param {String} [name] - name
	 */
	global.performance.markEnd = function( name ) {
		mark( name, "end", nameCount[ name ] );
	}

	/**
	 * This method set to measure.
	 * @name performance.markEnd
	 * @param {String} [name] - name
	 */
	global.performance.groupMeasure = function( name ) {
		var count = nameCount[name];
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
