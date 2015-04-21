module.exports = function(expected, actual) {
  var pattern;

  if (expected instanceof RegExp) {
    pattern = expected;
  } else if (actual[0] === "/") {
    if (actual[actual.length - 1] === "/") {
      pattern = new RegExp(actual.substr(1, actual.length - 2));
    } else {
      const flags = actual.split("/").pop();
      pattern = new RegExp(actual.substr(1, actual.length - 2 - flags.length), flags);
    }
  } else {
    pattern = new RegExp(actual);
  }

  return pattern.test(actual);
};
