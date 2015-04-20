module.exports = function(expected, actual) {
  if (this.opts.stringNumbers) {
    actual = (typeof actual === "number") ? actual : parseFloat(actual);
  }

  if (isNaN(actual) || typeof actual !== "number") {
    throw new Error("unexpected value (" + actual + ") for lessThan: value must be a number or a parseable number");
  }

  return actual < expected.lessThan;
};
