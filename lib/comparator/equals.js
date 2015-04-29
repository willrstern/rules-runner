module.exports = function(expected, actual) {
  if (typeof actual === "string" && typeof expected === "string" && !this.opts.caseSensitive) {
    return actual.toLowerCase() === expected.toLowerCase();
  }
  if (this.opts.stringNumbers && typeof expected === "number") {
    actual = parseInt(actual);
  }
  return actual === expected;
};
