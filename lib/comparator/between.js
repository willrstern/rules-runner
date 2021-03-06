module.exports = function(expected, actual) {
  if (~[null, undefined].indexOf(actual)) {
    return false;
  }

  if (this.opts.stringNumbers) {
    actual = (typeof actual === "number") ? actual : parseFloat(actual);
  }

  if (isNaN(actual) || typeof actual !== "number") {
    throw new Error("unexpected value (" + actual + ") for between: value must be a number or a parseable number");
  }

  return actual >= expected.between[0] && actual <= expected.between[1];
};
