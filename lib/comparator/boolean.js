module.exports = function(expected, actual) {
  if (actual === "0") {
    actual = false;
  }

  return !!(actual) === expected;
};
