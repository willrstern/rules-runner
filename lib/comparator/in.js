module.exports = function(expected, actual) {
  if (!Array.isArray(expected["in"])) {
    throw new Error("unexpected configuration value (" + expected["in"] + ") for rule - in: value must be an array");
  }

  if (this.opts.stringNumbers) {
    for (var i = 0; i < expected["in"].length; i++) {
      if (expected["in"][i] == actual) { return true; }
    }
    return false;
  }
  return !!~expected["in"].indexOf(actual);
};
