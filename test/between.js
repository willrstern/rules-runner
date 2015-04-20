var assert = require("assert");
var Rules = require("../lib/Rules");

describe("between comparator", function() {
  it("matches values between given range", function() {
    var config = {
      "Any of these values win a prize": {
        if: {
          "val": { between: [20, 30] }
        },
        then: { "winsAPrize": true }
      }
    };

    [{val: 20}, {val: 25}, {val: 30}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.winsAPrize, true);
    });

  });

  it("doesn't match values outside of given range", function() {
    var config = {
      "Any of these values win a prize": {
        if: {
          "val": { in: [20, 30] }
        },
        then: { "winsAPrize": true }
      }
    };

    [{val: 1}, {val: 19}, {val: 31}, {val: -25}, {val: 0}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.winsAPrize, undefined);
    });

  });
});
