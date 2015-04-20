module.exports = function(expected, actual) {
  if (typeof actual === "string" || Array.isArray(actual)) {
    return !!(~actual.toString().indexOf(expected.contains));
  } else {
    return !!(~JSON.stringify(actual).indexOf(expected.contains));
  }
};
