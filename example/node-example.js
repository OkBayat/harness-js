var path = require("path"),
	assert = require("assert"),
	harness = require("../harness");

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
