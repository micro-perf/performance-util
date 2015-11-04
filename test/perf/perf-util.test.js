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
		var nameInfo = getPerformanceInfo().nameInfo;
		var entryList = mock.performance.getEntries({name:"foo-start-1"});
		
		// Then
		expect(nameInfo.foo).toBe(1);
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
		var nameInfo = getPerformanceInfo().nameInfo;
		var entryList = mock.performance.getEntries({name:"foo-end-1"});
		
		// Then
		expect(nameInfo.foo).toBe(1);
		expect(entryList.length).toBe(1);
		expect(entryList[0].name).toBe("foo-end-1");

	});

	afterEach(function() {
		mock.performance.clearMarks();
		mock.performance.clearMeasures();
	});
});

describe("performance.groupMeasure", function() {
	var mock = {}, getPerformanceInfo;
	
	beforeEach(function() {
		mock.performance = window.performance;
		getPerformanceInfo = cache(mock);
	});

	it("If it set name to groupMeasure then It set name-measure-[index] to measure.", function() {
		// Given
		function nonp(){};
		mock.performance.markStart("foo");
		nonp();
		mock.performance.markEnd("foo");

		// When
		mock.performance.groupMeasure("foo");
		var nameInfo = getPerformanceInfo().nameInfo;
		var entryList = mock.performance.getEntries({name:"foo-measure-1"});
		
		// Then
		expect(nameInfo.foo).toBe(1);
		expect(entryList.length).toBe(1);
		expect(entryList[0].name).toBe("foo-measure-1");
		expect(entryList[0].duration > 0).toBe(true);

	});

	afterEach(function() {
		mock.performance.clearMarks();
		mock.performance.clearMeasures();
	});
});