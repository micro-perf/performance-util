describe("performance.markStart", function() {
	var mock = {}, getPerformanceInfo;
	
	beforeEach(function() {
		mock.performance = window.performance;
		getPerformanceInfo = cache(mock);
	});

	it("If it set markName to markStart then It set markStart-[star]-[index] to mark.", function() {
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