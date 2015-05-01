module.exports = function(expected, actual) {
  if (typeof actual === "string") {
    return checkValue(actual, expected, this.opts.caseSensitive);
  } else if (Object.prototype.toString.call(actual) === "[object Array]") {
    var str;
    for (var i = actual.length - 1; i >= 0; i--) {
      str = typeof actual[i] === "object" ? JSON.stringify(actual[i]) : String(actual[i]);
      if ( checkValue(str, expected, this.opts.caseSensitive) ) {
        return true;
      }
    }
    return false;
  }

  throw new Error("unexpected value (" + actual + ") for contains: value must be a string or an array");

};

function checkValue(str, expected, caseSensitive) {
  if (!caseSensitive) {
    return !!(~str.toLowerCase().indexOf(expected.contains.toLowerCase()));
  }

  return !!(~str.indexOf(expected.contains));
}
