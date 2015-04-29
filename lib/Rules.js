var assert = require("assert");
var assign = require("object-assign");
var comparators = require("./comparator");
var path = require("object-path");

function Rules(config, opts) {
  this.config = config;
  this.comparators = comparators;
  this.opts = assign({
    rulesModifyData: true,
    stringNumbers: true,
    caseSensitive: true,
  }, opts || {});
}

Rules.prototype.run = function(data) {
  var outcomeResults = (this.opts.rulesModifyData) ? data : {};
  var rules = Object.keys(this.config);
  for (var i = 0; i < rules.length; i++) {
    var rule = this.config[rules[i]];
    assert(rule.if && rule.then, "rules must have an `if` and `then` object");

    if (this.testsPass(rule.if, data)) {
      this.runOutcomes(rule.then, outcomeResults);
    }
  }
  return outcomeResults;
};

Rules.prototype.testsPass = function(tests, data){
  var expected, actual;
  var testKeys = Object.keys(tests);
  //if any test is false, return
  for (var i = 0; i < testKeys.length; i++) {
    expected = tests[testKeys[i]];
    actual = path.get(data, testKeys[i]);
    if (!this.runTest(expected, actual)) {
      return;
    }
  }
  return true;
};

Rules.prototype.runTest = function(expected, actual) {
  if (typeof expected === "object") {
    var comparator = Object.keys(expected)[0];
    assert(this.comparators[comparator], "Unknown comparator: " + comparator);
    return this.comparators[comparator].call(this, expected, actual);
  } else if (typeof expected === "boolean") {
    return this.comparators.boolean.call(this, expected, actual);
  } else {
    return this.comparators.equals.call(this, expected, actual);
  }
};

Rules.prototype.runOutcomes = function (outcomes, data) {
  var outcomeKey;
  var keys = Object.keys(outcomes);
  //if any test is false, return
  for (var i = 0; i < keys.length; i++) {
    //handle arrays
    if (keys[i].slice(-2) === "[]") {
      outcomeKey = keys[i].slice(0, keys[i].length - 2);
      path.push(data, outcomeKey, outcomes[keys[i]]);
    } else {
      path.set(data, keys[i], outcomes[keys[i]]);
    }
  }
  return data;
};

module.exports = Rules;
