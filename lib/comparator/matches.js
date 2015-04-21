module.exports = function(expected, actual) {
  var pattern;

  if (expected.matches instanceof RegExp) {
    pattern = expected.matches;
  } else if (expected.matches[0] === "/") {
    if (expected.matches[expected.matches.length - 1] === "/") {
      pattern = new RegExp(expected.matches.substr(1, expected.matches.length - 2));
    } else {
      const flags = expected.matches.split("/").pop();
      pattern = new RegExp(expected.matches.substr(1, expected.matches.length - 2 - flags.length), flags);
    }
  } else {
    pattern = new RegExp(expected.matches);
  }

  return pattern.test(actual);
};
