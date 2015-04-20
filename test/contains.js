var assert = require("assert");
var Rules = require("../lib/Rules");

describe("contains comparator", function() {
  it("matches strings", function() {
    var data = {
      person: { jobDescription: "Nursing management and oversight" }
    };

    var config = {
      "Anything to do with nursing is a good thing": {
        if: {
          "person.jobDescription": { contains: "Nursing" }
        },
        then: { "status.hasGoodJob": true }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.status.hasGoodJob, true);
  });

  it("matches arrays", function() {
    var data = {
      person: { friends: ["John", "Bob", "Susan"] }
    };

    var config = {
      "People who know Bob": {
        if: {
          "person.friends": { contains: "Bob" }
        },
        then: { "status.knowsBob": true }
      },
      "People who know Karen": {
        if: {
          "person.friends": { contains: "Karen" }
        },
        then: { "status.knowsKaren": true }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert(results.status.knowsBob);
    assert(!results.status.knowsKaren);
  });
});
