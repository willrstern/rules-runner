module.exports = function(expected, actual) {
  var str = (typeof actual === "string") ? actual : JSON.stringify(actual);

  if (!this.opts.caseSensitive) {
    return !!(~str.toString().toLowerCase().indexOf(expected.contains.toLowerCase()));
  }

  return !!(~str.toString().indexOf(expected.contains));
};
