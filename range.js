//
// Return a range of numbers
//
//   You can pass in a single range, or multiple ones.
//
//   Options for a range are:
//
//   - from: The first number in the range (defaults to 1)
//   - to: No number can be larger than this in the range (but it could be less!)
//       . if from = 1, step = 2, to = 10, then the last item will be 9
//       . if from = 1, to = 10, excluding = function(num) { num !== 10 }, then the last item will also be 9
//   - step: number to bump the range by each time (defaults to 1)
//   - excluding: function that returns false if an item should not be including in the set
//
// - Create a single range from one rule
//
//    integerRange({
//      from: 1,
//      to: 10
//    }) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//
// - Create a range from multiple rules
//
//    integerRange([
//      { from: 1,  to: 10 },
//      { from: 20, to: 30 },
//    ])
//
// Limitations
//
// - Positive steps only (from small to large)
// - Doesn't make sure that the result is a unique set with multiple rules
//

module.exports = {
  // If we are passed an array or a single range, do your worst
  integerRange: function(range) {
    return Array.isArray(range) ? integerRanges(range) : integerRange(range);
  }
};

// For the given rules, return
function integerRange(rules) {
  // At least tell me where to stop
  if (!("to" in rules)) {
    throw "Can't go on forever, please give me a 'to' option.";
  }

  // Where do we start?
  if (!("from" in rules)) {
    rules.from = 1; // We default to 1 not 0!
  }

  // We only support low to high, so make sure that 'from' is less than 'to'
  if (rules.to < rules.from) {
    throw "The 'from' needs to be less than the 'to'. You gave us { from: " + rules.from + ", to: " + rules.to + " }.";
  }

  if (!("step" in rules)) {
    rules.step = 1; // Chances are you want to step one at a time right?
  }

  var range = [];

  var current = rules.from;

  // Keep moving the current pointer, bumping it by the step
  while (current <= rules.to) {
    var past = current; // keep this around so we can push the current ahead of time
    current = current + rules.step; // bump it ahead now before we potentially jump out via the continue
    if (typeof rules["excluding"] === "function" && rules.excluding(past)) {
      continue;
    }
    range.push(past);
  }

  return range;
}

// Loop through the set of rules and aggregate the results into one range
function integerRanges(arrayOfRules) {
  var range = [];
  arrayOfRules.forEach(function(rules) {
    range = range.concat(integerRange(rules));
  });
  return range;
}
