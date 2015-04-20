var assert = require("assert");
var Rules = require("../lib/Rules");

describe("lessThan comparator", function() {
  it("matches numbers less than config", function() {
    var data = {
      person: { age: 24 }
    };

    var config = {
      "Younger than 25 gets a bonus": {
        if: {
          "person.age": { lessThan: 25 }
        },
        then: { "person.getsBonus": true }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.person.getsBonus, true);
  });

  it("doesn't match numbers equal or greater than config", function() {
    var data = {
      person: { age: 25 }
    };

    var config = {
      "Younger than 25 gets a bonus": {
        if: {
          "person.age": { lessThan: 25 }
        },
        then: { "person.getsBonus": true }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.person.getsBonus, undefined);
  });
});
