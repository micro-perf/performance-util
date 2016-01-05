describe("performance.markStart", function() {
	var mock = {}, getPerformanceInfo;
	
	beforeEach(function() {
		mock.performance = window.performance;
		getPerformanceInfo = cache(mock);
	});

	it("If it set markName to markStart then It set markName-start-[index] to mark.", function() {
		// Given
		// When
		mock.performance.markStart("foo");
		var nameCount = getPerformanceInfo().nameCount;
		var entryList = mock.performance.getEntries({name:"foo-start-1"});
		
		// Then
		expect(nameCount.foo.count).toBe(1);
		expect(entryList.length).toBe(1);
		expect(entryList[0].name).toBe("foo-start-1");

	});

	afterEach(function() {
		mock.performance.clearMarks();
		mock.performance.clearMeasures();
	});
});

describe("performance.markEnd", function() {
	var mock = {}, getPerformanceInfo;
	
	beforeEach(function() {
		mock.performance = window.performance;
		getPerformanceInfo = cache(mock);
	});

	it("If it set markName to markEnd then It set markName-end-[index] to mark.", function() {
		// Given
		mock.performance.markStart("foo");
		// When
		mock.performance.markEnd("foo");
		var nameCount = getPerformanceInfo().nameCount;
		var entryList = mock.performance.getEntries({name:"foo-end-1"});
		
		// Then
		expect(nameCount.foo.count).toBe(1);
		expect(entryList.length).toBe(1);
		expect(entryList[0].name).toBe("foo-end-1");

	});

	it("When it don`t set markName to markStart If It called markEnd It should be raise exception.", function() {
		// Given
		// When
		// Then
		expect(function(){
				mock.performance.markEnd("shouldBeException");
		}).toThrowError("You don`t have to same markEnd name.(shouldBeException)");

	});


	afterEach(function() {
		mock.performance.clearMarks();
		mock.performance.clearMeasures();
	});
});

describe("performance.analyzeMeasure", function() {
	var mock = {}, getPerformanceInfo;
	
	beforeEach(function() {
		mock.performance = window.performance;
		getPerformanceInfo = cache(mock);
	});

	it("analyzeMeasure have to return info.", function() {
		// Given
		function nonp(){
			for (var i = 0; i < 10000; i++) {
			}			
		};

		for (var i = 0; i < 10; i++) {
			mock.performance.markStart("foo");
			nonp();
			mock.performance.markEnd("foo");
		}

		// When
		var info = mock.performance.analyzeMeasure("foo");

		// Then
		expect(info.count).toBe(10);
		expect(info.average > 0).toBe(true);
		expect(info.median > 0).toBe(true);
		expect(info.durationList.length).toBe(10);

	});

	afterEach(function() {
		mock.performance.clearMarks();
		mock.performance.clearMeasures();
	});
});

describe("global.performance.searchEntries", function() {
	var mock = {}, getPerformanceInfo;
	
	beforeEach(function() {
		mock.performance = window.performance;
		getPerformanceInfo = cache(mock);
	});

	it("If searchEntries has not parameter then it has to return all entryList.", function() {
		// Given
		function nonp(){
			for (var i = 0; i < 10000; i++) {
			}			
		};

		mock.performance.mark("bar");
		for (var i = 0; i < 10; i++) {
			mock.performance.markStart("foo");
			nonp();
			mock.performance.markEnd("foo");
		}
		mock.performance.mark("baz");
		var allEntryList = mock.performance.getEntries();

		// When
		var info = mock.performance.searchEntries();


		// Then
		expect(info.length).toBe(allEntryList.length);

	});

	it("If searchEntries has name in parameter then it has to return matched entryList.", function() {
		// Given
		function nonp(){
			for (var i = 0; i < 10000; i++) {
			}			
		};

		mock.performance.mark("bar");
		for (var i = 0; i < 10; i++) {
			mock.performance.markStart("foo");
			nonp();
			mock.performance.markEnd("foo");
		}
		mock.performance.mark("baz");

		// When
		var info = mock.performance.searchEntries( {
			"name": /foo/
		} );


		// Then
		expect(info.length).toBe(30);

	});

	it("If searchEntries has name, entryType in parameter then it has to return matched entryList.", function() {
		// Given
		function nonp(){
			for (var i = 0; i < 10000; i++) {
			}			
		};

		mock.performance.mark("bar");
		for (var i = 0; i < 10; i++) {
			mock.performance.markStart("foo");
			nonp();
			mock.performance.markEnd("foo");
		}
		mock.performance.mark("baz");

		// When
		var info = mock.performance.searchEntries( {
			"name": /foo/,
			"entryType": "measure"
		} );


		// Then
		expect(info.length).toBe(10);

	});

	afterEach(function() {
		mock.performance.clearMarks();
		mock.performance.clearMeasures();
	});
});
