var assert = require("assert");
var Rules = require("../lib/Rules");

describe("in comparator", function() {
  it("matches values in the array", function() {
    var config = {
      "Any of these values win a prize": {
        if: {
          "val": { in: [1, "a", undefined] }
        },
        then: { "winsAPrize": true }
      }
    };

    [{val: 1}, {val: "a"}, {val: undefined}].forEach(function(data) {
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

    [{val: 2}, {val: "b"}, {val: null}, {val: NaN}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.winsAPrize, undefined);
    });

  });
});
