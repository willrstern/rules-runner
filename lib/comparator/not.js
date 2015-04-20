module.exports = function(expected, actual) {
  return !(this.runTest(expected.not, actual));
};
