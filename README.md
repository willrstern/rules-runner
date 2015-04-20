# Introduction
node-business-rules allows you to cleanly abstract your rules away from your application code
- run your dataset against a config JSON object
- results can modify your dataset or can return a new dataset of outcomes

# Examples
```js
var config = {
  "Must be 21 or older": {
    //if all "tests" in the if statement match,
    if: {
      "person.age": {
        lessThan: 21
      }
    },
    //process all of the outcomes
    then: {
      "person.error": "Must be 21 or older",
      "errors[]": "person"
    }
  },
  "Must be employed": {
    if: {
      "company.isEmployed": false
    },
    then: {
      "company.error": "Must be employed",
      "errors[]": "company"
    }
  };
};

var data = {
  person: {
    age: 20
  }
};

var rules = new Rules(config);
var results = rules.run(data);
assert.equal(results.person.error, "Must be 21 or older");
assert.equal(results.errors.length, 2);
assert.deepEqual(results.errors, ["person", "company"]);
```

# Comparators/Tests
- **between**: `"person.age": {between: [1, 20]}`
- **equality/scalar values**: `"person.exists": true` `"person.firstName": "John"`
- **contains**: `"person.name": {contains: "Jr"}`` (also checks for values in arrays)
- **greaterThan**: `"person.age": {greaterThan: 20}`
- **in**: `"person.state": {in: ["CA", "TX", "NY"]}`
- **lessThan**: `"person.age": {lessThan: 21}`
- **not**: `"person.state": {not: "CA"}`, `"person.state": {not: {in: ["CA", "TX"]}}`

# Options
- **rulesModifyData**
  - default: `true`
  - matching rules modify original data set `rules.run()` returns modified dataset.
  - when `false`, rules create a new object, which gets returned.
- **stringNumbers**:
  - default: `true`
  - `greaterThan`, `lessThan`, and `between` comparators will parse numbers
