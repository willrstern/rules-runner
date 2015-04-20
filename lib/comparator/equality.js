module.exports = function(expected, actual) {
  if (typeof actual === "string" && typeof expected === "string" && !this.opts.caseSensitive) {
    return actual.toLowerCase() === expected.toLowerCase();
  }

  return actual === expected;
};
