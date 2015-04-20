module.exports = function(expected, actual) {
  if (!Array.isArray(expected.in)) {
    throw new Error("unexpected configuration value (" + expected.in + ") for rule - in: value must be an array");
  }

  return !!(~expected.in.indexOf(actual));
};
