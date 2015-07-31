var assert = require("assert");
var Rules = require("../lib/Rules");

describe("Else", function() {
    it("matches booleans", function() {
        // test data
        var data = {
            person: {
                profile: {
                    isLiving: false
                },
                status: {
                    getsPaid: false
                }
            },
            company: {
                isActive: true
            }
        };

        // test rule
        var config = {
            "Dead people at active companies don't get paid": {
                if: {
                    "person.profile.isLiving": true,
                    "company.isActive": true
                },
                then: {
                    "person.status.getsPaid": false
                },
                else: {
                    "person.status.getsPaid": true
                }

            }
        };
        var rules = new Rules(config);
        var results = rules.run(data);

        assert.equal(results.person.status.getsPaid, true);
    });
});