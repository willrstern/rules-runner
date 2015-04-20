var assert = require("assert");
var Rules = require("../lib/Rules");

describe("boolean comparator", function() {
  it("matches booleans", function() {
    var data = {
      person: {
        profile: {
          isLiving: false
        },
      },
      company: {
        isActive: true
      }
    };

    var config = {
      "Dead people at active companies don't get paid": {
        if: {
          "person.profile.isLiving": false,
          "company.isActive": true
        },
        then: {
          "status.getsPaid": false
        }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.status.getsPaid, false);
  });

  it("matches falsey numbers", function() {
    var data = {
      person: { isFriend: "1", isImaginary: "1", isMean: "0"}
    };

    var config = {
      "Friends who aren't mean are true friends": {
        if: {
          "person.isFriend": true,
          "person.isMean": false
        },
        then: {
          "person.isTrueFriend": true
        }
      },
      "Friends who are imaginary aren't real people": {
        if: {
          "person.isFriend": true,
          "person.isImaginary": true
        },
        then: {
          "person.isReal": false
        }
      }
    };

    var rules = new Rules(config);
    var results = rules.run(data);

    assert.equal(results.person.isTrueFriend, true);
    assert.equal(results.person.isReal, false);
  });
});
