[![build status](https://secure.travis-ci.org/rsdoiel/harness-js.png)](http://travis-ci.org/rsdoiel/harness-js)
harness-js
==========

Yet another test organizers except that is work in NodeJS, Mongo's shell and
you modern web browser.  Being able to run across these three environments 
without depending on libraries like RequireJS was a major reason I wrote this
module. Hopefully it is helpful to others.

# Overview

Harness provides a simple way of organizing assertive tests in Mongo's shell
(using mongo-modules), NodeJS and in many web browsers.

## NodeJS example

```JavaScript
	var path = require("path"),
		assert = require("assert"),
		harness = require("harness");
	
	// Setup a test by assigning a function to callback and
	// a label to the test group.
	harness.push({callback: function (test_label) {
		assert.strictEqual(harness.counts("running"), 1, "Should have on test running for 'Testing push()'");
	
		// Now that you've completed this test
		// group tell harness that this label
		// is now complete.
		harness.completed(test_label);
	}, label: "Test group 1"});
	
	// This is a second test group just to show you can do
	// more than one group of tests.
	// Setup a test by assigning a function to callback and
	// a label to the test group.
	harness.push({callback: function (test_label) {
		assert.strictEqual(harness.counts("running"), 2, "Should have on test running for 'Testing push()'");
	
		// Now that you've completed this test
		// group tell harness that this label
		// is now complete.
		harness.completed(test_label);
	}, label: "Test group 2"});
	
	harness.RunIt(path.basename(module.filename), 10);
```

The command to run *example/node-example.js* looks like-

```shell
	node example/node-example.js
```

The output would look something like-

```shell
	Starting [node-example.js] ...
		Starting Test group 1 ...
			Test group 1 called
			Test group 1 OK
		Starting Test group 2 ...
			Test group 2 called
			Test group 2 OK
	node-example.js Success!
```

## Mongo example

Harness support comes with [mongo-modules](git@github.com:rsdoiel/mongo-modules) and mongo-modules will need to be installed for it to work. Other
than that it looks much like the NodeJS version above. The difference is
that the module.filename object isn't defined by mongo-modules so we must
define that ourselves.

```JavaScript
	var path = require("path"),
		assert = require("assert"),
		harness = require("harness"),
		// mongo-modules does not define the module object's
		// filename.
		module = {
			filename: "mongo-example.js"
		};
	
	// Setup a test by assigning a function to callback and
	// a label to the test group.
	harness.push({callback: function (test_label) {
		assert.strictEqual(harness.counts("running"), 1,
			"Should have on test running for 'Testing push()'");

		// Now that you've completed this test
		// group tell harness that this label
		// is now complete.
		harness.completed(test_label);
	}, label: "Test group 1"});
	
	// This is a second test group just to show you can do
	// more than one group of tests.
	// Setup a test by assigning a function to callback and
	// a label to the test group.
	harness.push({callback: function (test_label) {
		assert.strictEqual(harness.counts("running"), 2, "Should have on test running for 'Testing push()'");
	
		// Now that you've completed this test
		// group tell harness that this label
		// is now complete.
		harness.completed(test_label);
	}, label: "Test group 2"});
	
	harness.RunIt(path.basename(module.filename), 10);
```

Running the *example/mongo-example.js* with mongo-modules available is done like-

```shell
	mongo ~/.mongojs.rc example/mongo-example.js
```

The output should look something like-

```shell
	MongoDB shell version: 2.2.0
	connecting to: test
	loading file: /Users/johndoe/.mongorc.js
	loading file: example/mongo-example.js
	Starting [mongo-example.js] ...
		Starting Test group 1 ...
			Test group 1 called
			Test group 1 OK
		Starting Test group 2 ...
			Test group 2 called
			Test group 2 OK
	mongo-example.js Success!
```

# Including targets for tests

Now that we can run tests on multiple platforms we still have occasion
to only need to run tests for specific targets. You can test a list
of targets when you call harness' push method.  The list of supported
targets are "node", "mongo" and "browser".  Here's an example of group
tests for each of these targets-

```JavaScript
	var path = require("path"),
		assert = require("assert"),
		harness = require("../harness");
	
	// This are tests targeted at the browser only
	harness.push({callback: function (test_label) {
		assert.ok(true, "Browser only");
		harness.completed(test_label);
	}, label: "BrowserOnly", targets: ["browser"]});
	
	harness.push({callback: function (test_label) {
		assert.ok(true, "Node only");
		harness.completed(test_label);
	}, label: "NodeOnly", targets: ["node"]});
	
	harness.push({callback: function (test_label) {
		assert.ok(true, "Mongo only");
		harness.completed(test_label);
	}, label: "MongoOnly", targets: ["mongo"]});
	
	harness.push({callback: function (test_label) {
		assert.ok(true, "Mongo only");
		harness.completed(test_label);
	}, label: "Combination", targets: ["node", "mongo", "browser"]});
	
	harness.RunIt("Target Demo", 10);
```