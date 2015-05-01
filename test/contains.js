var assert = require("assert");
var Rules = require("../lib/Rules");

describe("contains comparator", function() {
  it("matches acceptable values", function() {

    var config = {
      "Anything to do with nursing is a good thing": {
        if: {
          "job": { contains: "Nursing" }
        },
        then: { "status.hasGoodJob": true }
      }
    };
    [
      {job: "I'm into Nursing"},
      {job: "Nursing specialist"},
      {job: ["medical", "Nursing"]},
    ].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.status.hasGoodJob, true);
    });
  });

  it("accepts caseSensitive:false option", function() {

    var config = {
      "Anything to do with nursing is a good thing": {
        if: {
          "job": { contains: "Nursing" }
        },
        then: { "status.hasGoodJob": true }
      }
    };
    [
      {job: "I'm into nursing"},
      {job: "nursing specialist"},
      {job: ["medical", "nursing"]},
    ].forEach(function(data) {
      var rules = new Rules(config, {caseSensitive: false});
      var results = rules.run(data);
      assert.equal(results.status.hasGoodJob, true);
    });
  });

  it("doesn't match bad values", function() {

    var config = {
      "Anything to do with nursing is a good thing": {
        if: {
          "job": { contains: "Nursing" }
        },
        then: { "status.hasGoodJob": true }
      }
    };
    [
      {job: "I'm into nursing"},
      {job: "nursing specialist"},
      {job: ["medical", "nursing"]},
    ].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.status, undefined);
    });
  });
});
