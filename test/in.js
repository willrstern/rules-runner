var assert = require("assert");
var Rules = require("../lib/Rules");

describe("in comparator", function() {
  it("matches values in the array", function() {
    var config = {
      "Any of these values win a prize": {
        if: {
          "val": { in: [1, "a", true] }
        },
        then: { "winsAPrize": true }
      }
    };

    [{val: 1}, {val: "a"}, {val: true}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.winsAPrize, true);
    });

  });

  it("doesn't match values not found in the array", function() {
    var config = {
      "Any of these values win a prize": {
        if: {
          "val": { in: [1, "a", undefined] }
        },
        then: { "winsAPrize": true }
      }
    };

    [{val: 2}, {val: "b"}, {val: NaN}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.winsAPrize, undefined);
    });

  });

  it("parses values to string when stringNumbers is true", function() {
    var config = {
      "Any of these values win a prize": {
        if: {
          "val": { in: ["1", "2", "3"] }
        },
        then: { "winsAPrize": true }
      }
    };

    [{val: 2}, {val: "1"}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.winsAPrize, true);
    });

  });
});
