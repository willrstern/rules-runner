var assert = require("assert");
var Rules = require("../lib/Rules");

describe("equality comparator", function() {
  it("matches strings", function() {
    var data = {
      person: {
        profile: {
          gender: "M"
        },
      },
      company: {
        name: "Walmart"
      }
    };

    var config = {
      "Walmart Males are eligible for Walmart-male-scholarship": {
        if: {
          "person.profile.gender": "M",
          "company.name": "Walmart"
        },
        then: {
          "status.eligible": "Walmart-male-scholarship"
        }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.status.eligible, "Walmart-male-scholarship");
  });

  it("matches numbers", function() {
    var data = {
      person: {
        profile: {
          age: 25
        },
      },
      company: {
        name: "Walmart"
      }
    };

    var config = {
      "25 Year Old Employees of Walmart Get a Bonus": {
        if: {
          "person.profile.age": 25,
          "company.name": "Walmart"
        },
        then: {
          "status.bonus": 500
        }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.status.bonus, 500);
  });
});
