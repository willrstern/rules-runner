var assert = require("assert");
var Rules = require("../lib/Rules");

describe("not comparator", function() {
  it("invert matches scalar values", function() {
    var config = {
      "Anything but curling is a real sport": {
        if: {
          "some.val": { not: "curling" }
        },
        then: { "isRealSport": true }
      }
    };

    var data = {
      some: { val: "football" }
    };

    var rules = new Rules(config);
    var results = rules.run(data);
    assert.equal(results.isRealSport, true);

  });

  it("invert matches boolean values", function() {
    var config = {
      "Anything but true wins": {
        if: {
          "some.val": { not: true }
        },
        then: { "wins": true }
      }
    };

    var data = {
      some: { val: false }
    };

    var rules = new Rules(config);
    var results = rules.run(data);
    assert.equal(results.wins, true);

  });

  it("invert matches in values", function() {
    var config = {
      "Anything but a,b,c wins": {
        if: {
          "some.val": {
            not: {in: ["a", "b", "c"]}
          }
        },
        then: { "wins": true }
      }
    };

    var data = {
      some: { val: "d" }
    };

    var rules = new Rules(config);
    var results = rules.run(data);
    assert.equal(results.wins, true);

  });

  it("can perform a nested double-negative", function() {
    var config = {
      "Double Negative": {
        if: {
          "some.val": {
            not: {not: "football"}
          }
        },
        then: { "wins": true }
      }
    };

    var data = {
      some: { val: "football" }
    };

    var rules = new Rules(config);
    var results = rules.run(data);
    assert.equal(results.wins, true);

  });

});
