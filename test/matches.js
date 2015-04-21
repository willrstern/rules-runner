var assert = require("assert");
var Rules = require("../lib/Rules");

describe("matches comparator", function() {
  it("matches regex values", function() {
    var config = {
      "Any of these people have great names": {
        if: {
          "val": { matches: "/(John|Bob|Mary)/" }
        },
        then: { "hasGreatName": true }
      }
    };

    [{val: "John"}, {val: "Bob"}, {val: "Mary"}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.hasGreatName, true);
    });
  });

  it("doesn't match values not in regex", function() {
    var config = {
      "Any of these people have great names": {
        if: {
          "val": { matches: "/(John|Bob|Mary)/i" }
        },
        then: { "hasGreatName": true }
      }
    };

    [{val: "Juanito"}, {val: "Frank"}, {val: "Beatrice"}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.hasGreatName, undefined);
    });
  });

  it("accepts regex flags", function() {
    var config = {
      "Any of these people have great names": {
        if: {
          "val": { matches: "/(John|Bob|Mary)/i" }
        },
        then: { "hasGreatName": true }
      }
    };

    [{val: "john"}, {val: "bob"}, {val: "mary"}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.hasGreatName, true);
    });
  });

  it("recognizes regex objects", function() {
    var config = {
      "Any of these people have great names": {
        if: {
          "val": { matches: /(John|Bob|Mary)/i }
        },
        then: { "hasGreatName": true }
      }
    };

    [{val: "john"}, {val: "bob"}, {val: "mary"}].forEach(function(data) {
      var rules = new Rules(config);
      var results = rules.run(data);
      assert.equal(results.hasGreatName, true);
    });
  });

});
