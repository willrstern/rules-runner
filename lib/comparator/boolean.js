module.exports = function(expected, actual) {
  if (actual === "0") {
    actual = false;
  }

  if (actual === undefined) { return false; }

  return !!(actual) === expected;
};
