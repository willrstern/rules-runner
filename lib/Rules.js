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
    strict: false
  }, opts || {});
}

Rules.prototype.run = function(data) {
  var outcomeResults = (this.opts.rulesModifyData) ? data : {};
  var rules = Object.keys(this.config);

  for (var i = 0; i < rules.length; i++) {
    var rule = this.config[rules[i]],
      isRulesArray;

    if (!rule["if"] || !rule.then) {
      throw new Error("rules must have an `if` and `then` object");
    }

    isRulesArray = Object.prototype.toString.call(rule["if"]) === "[object Array]";

    if (!isRulesArray) {

      if (this.testsMatch(rule["if"], data)) {
        this.runOutcomes(rule.then, outcomeResults);
      }
      else {
        if (rule.otherwise) {
          this.runOutcomes(rule.otherwise, outcomeResults);
        }
      }
    }
    else if (isRulesArray) { // can track N number of rule sets, i.e. series of OR conditions
      var passes = false;

      for (var j = 0; j < rule["if"].length; j++) {
        var item = rule["if"][j];
        if (this.testsMatch(item, data)) {
          passes = true;
          break;
        }
      }

      if (passes) {
        this.runOutcomes(rule.then, outcomeResults);
      }
      else {
        if (rule.otherwise) {
          this.runOutcomes(rule.otherwise, outcomeResults);
        }
      }
    }
  }

  return outcomeResults;
};

Rules.prototype.testsMatch = function(tests, data){
  var expected, actual;
  var testKeys = Object.keys(tests);

  //if any test is false, return
  for (var i = 0; i < testKeys.length; i++) {
    var hasValue = path.has(data, testKeys[i]);

    if (this.opts.strict && !hasValue) {
      throw new Error("Value does not exist in data:" + testKeys[i]);
    } else if (!hasValue) {
      return;
    }

    expected = tests[testKeys[i]];
    actual = path.get(data, testKeys[i]);

    if (!this.runTest(expected, actual)) {
      return;
    }
  }

  return true;
};

Rules.prototype.runTest = function(expected, actual) {
  if (typeof expected === "object" && expected !== null) {
    var comparator = Object.keys(expected)[0];
    if (!this.comparators[comparator]) {
      throw new Error("Unknown comparator: " + comparator);
    }

    return this.comparators[comparator].apply(this, arguments);
  } else if (typeof expected === "boolean") {
    return this.comparators["boolean"].apply(this, arguments);
  } else {
    return this.comparators.equals.apply(this, arguments);
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
