# performance utility
[Performance](https://github.com/micro-perf/performance-polyfill) is too hard to use search entries, measure group and analyze measure. So This project is made for easy to use at [performance](https://github.com/micro-perf/performance-polyfill). 


## Support features
- **markStart** : This method set to start mark.
- **markEnd** : This method set to end mark. and It called measure between `markStart` and `markEnd`.
- **analyzeMark** : This method get to analyze to information having count, average, median, durationList.
- **searchEntries** : This method can search entry using advanced option. (like `Regexp`)

## Sample
```js
for (var i = 0; i < 10; i++) {
	performance.markStart("foo");
	doSomething();
	performance.markEnd("foo");
}

// analyze group
var info = performance.analyzeMark("foo");
/*
{
	"count" : 10, // Call count between markStart and markEnd
	"average" : 10, // average speed per between markStart and markEnd
	"median" : 10, // median speed per between markStart and markEnd
	"durationList" : 10 // list of duration
}
*/

// search entries using advanced option
var info = performance.searchEntries( {
	"name": /foo/,
	"entryType": "measure"
} );
/*
[
	{
		"name" : "foo", // name
		"entryType" : "measure", // entryType
		"startTime" : 10, // start time
		"duration" : 20 // duration
	}
]
*/
```

## Usage

### download
```html
<script src="https://github.com/micro-perf/performance-util/blob/master/perf-util.js"></script>
```
### bower
```
bower install perf-util
```
### build
```
git clone https://github.com/micro-perf/performance-util
cd performance-util
gulp
```

## Licence

```
The MIT License (MIT)

Copyright (c) 2015 YongWoo Jeon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
