module.exports = function(expected, actual) {
  if (typeof expected === "string" && !this.opts.caseSensitive) {
    return actual.toLowerCase() === expected.toLowerCase();
  }

  return actual === expected;
};
