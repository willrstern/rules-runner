
[![travis build status](https://travis-ci.org/willrstern/rules-runner.svg?branch=master)](https://github.com/willrstern/rules-runner)

# Introduction
rules-runner allows you to cleanly abstract your rules away from your application code
- run your dataset against a config JSON object
- results can modify your dataset or can return a new dataset of outcomes
- It's isomorphic and has minimal package dependencies - great for the browser and the server

# Installation
`npm install rules-runner`

# Examples
```js
var Rules = require("rules-runner");

var config = {
  "Must be 16 or older if no adult is present": {
    //if ALL "tests" in the if statement match,
    if: {
      "person.age": {
        lessThan: 16
      },
      "person.adultPresent": false
    },
    //process all of the outcomes
    then: {
      "person.error": "Must be 16 or older if no adult is present",
      "errors.all[]": "person"
    }
  },
  "Must be employed": {
    if: {
      "company.isEmployed": false
    },
    then: {
      "company.error": "Must be employed",
      "errors.all[]": "company" //add [] to the end of a key to push values onto an array
    }
  };
};

var data = {
  person: {
    age: 15,
    adultPresent: false
  },
  company: {
    isEmployed: false
  }
};

var rules = new Rules(config);
rules.run(data);
assert.equal(data.person.error, "Must be 16 or older if no adult is present");
assert.equal(data.company.error, "Must be employed");
assert.deepEqual(data.errors.all, ["person", "company"]);
//by default, rules modify data object
//only want results leaving data unchanged? 
//var results = rules.run(data, {rulesModifyData: false});
```


##Use an array of `if` statements to treat conditions as `else if` or `OR like`

```js

var config = {
  "Person will be in house if person is tired or hungry": {
    if: [
      {"person.tired": true}, //if this matches
      {"person.hungry": true} //OR if this matches
    ],
    then: {
      "person.location": "house" //then run this
    }
  }
};
    
var data = {
  person: {
    tired: false,
    hungry: true
  }
};

var rules = new Rules(config);
rules.run(data);

assert.equal(data.person.location, 'house');
```

##`otherwise` will process if no conditions match

```js

var config = {
  "Person will be in house if person is tired or hungry": {
    if: [
      {"person.tired": true},
      {"person.hungry": true}
    ],
    then: {
      "person.location": "house"
    },
    otherwise: { // if all conditions are false
      "person.location": 'work'
    }
  }
};
var data = {
  person: {
    tired: false,
    hungry: false
  }
};

var rules = new Rules(config);
rules.run(data);

assert.equal(data.person.location, 'work');
```

# Comparators/Tests
- **between**: `"person.age": {between: [1, 20]}` (note: this is exclusive of given values)
- **equality/scalar values**: `"person.exists": true` `"person.firstName": "John"`
- **contains**: `"person.name": {contains: "Jr"}`` (also checks for values in arrays)
- **greaterThan**: `"person.age": {greaterThan: 20}`
- **in**: `"person.state": {in: ["CA", "TX", "NY"]}`
- **lessThan**: `"person.age": {lessThan: 21}`
- **matches**: `"person.name": {matches: "/(john|bob|mary)/i"i`
- **not**: `"person.state": {not: "CA"}`, `"person.state": {not: {in: ["CA", "TX"]}}`

# Options
- **caseSensitive**
  - default: `true`
  - `contains` and `equals` ignore case
- **rulesModifyData**
  - default: `true`
  - matching rules modify original data set `rules.run()` returns modified dataset
  - when `false`, rules create a new object, which gets returned
- **strict**
  - default: `false`
  - useful for debugging. when `true`, if a rule path (i.e. `if: "person.age"`) isn't found in data, an error is thrown
  - when `false`, a rule path that isn't set in data evaluates to `undefined`
- **stringNumbers**:
  - default: `true`
  - `greaterThan`, `lessThan`, and `between` comparators will parse numbers.  `in` will match with `==` instead of `===`
