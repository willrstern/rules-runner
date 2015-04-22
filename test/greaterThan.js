var assert = require("assert");
var Rules = require("../lib/Rules");

describe("greaterThan comparator", function() {
  it("matches numbers greater than config", function() {
    var data = {
      person: { age: 26 }
    };

    var config = {
      "Older than 25 gets a bonus": {
        if: {
          "person.age": { greaterThan: 25 }
        },
        then: { "person.getsBonus": true }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.person.getsBonus, true);
  });

  it("doesn't match numbers less than config", function() {
    var data = {
      person: { age: 24 }
    };

    var config = {
      "Older than 25 gets a bonus": {
        if: {
          "person.age": { greaterThan: 25 }
        },
        then: { "person.getsBonus": true }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.person.getsBonus, undefined);
  });

  it("allows for parseable configuration values", function() {
    var data = {
      person: { age: 26 }
    };

    var config = {
      "Older than 25 gets a bonus": {
        if: {
          "person.age": { greaterThan: "25" }
        },
        then: { "person.getsBonus": true }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.person.getsBonus, true);
  });

});
