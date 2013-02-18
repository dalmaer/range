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
//    ofIntegers({
//      from: 1,
//      to: 10
//    }) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//
// - Create a range from multiple rules
//
//    ofIntegers([
//      { from: 1,  to: 10 },
//      { from: 20, to: 30 },
//    ])
//
// - Create a range from a string ruleset
//
//    ofIntegers('1,2')
//    ofIntegers('1..10')
//    ofIntegers('1,3..5,9')
//    ofIntegers('1..10 by 2')
//
//    Format:  numberOrRange[,numberOrRange]['by' number]
//
// Limitations
//
// - Positive steps only (from small to large)
// - Doesn't make sure that the result is a unique set with multiple rules
//

module.exports = {
  // If we are passed an array or a single range (object or string), do your worst
  ofIntegers: function(range) {
    if (Array.isArray(range)) { // [{from:1, to:2}, {from:5, to:9}]
      return integerRanges(range);
    } else if (typeof range === 'string') { // '1..3,6,8..12'
      return integerRanges(rulesFromString(range));
    } else { // {from:1, to:10, step:2}
      return integerRange(range);
    }
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

function rulesFromString(stringRule) {
  var rules = [];

  // do a quick check
  if (!stringRule.match(/\d/)) {
    throw "I don't see a number (which is required) in the rule. Can you try again? You gave me:\n\t" + stringRule;
  }

  // Look specifically for a broken range:
  // "1..aspodj" or "1.."
  if (stringRule.match(/\d+\s*\.\.\s*[^\d]/) || stringRule.match(/\.$/)) {
    throw "There is a range that doesn't fit the required format: 'X..Y' (where both are numbers). Can you try again? You gave me:\n\t" + stringRule;
  }

  // get a step: chop off the " by X"
  var split = stringRule.split(/\s*by\s*(\d+)/);

  // get the result back (chopped if there was a by X)
  stringRule = split[0];

  // get a valid step number and leave undefined so we don't pass it in later
  var step = Number(split[1]) || undefined;

  // split up multiple rules by ","
  stringRule.split(/\s*,\s*/).forEach(function(rule) {
    var splitOnDotDot = rule.split(/\s*\.\.\s*/);
    var newRule = {};
    newRule.from = Number(splitOnDotDot[0]);
    newRule.to   = Number(splitOnDotDot[1]) || newRule.from; // if from and to are the same you just have the one item
    if (step) {
      newRule.step = step;
    }
    rules.push(newRule);
  });

  return rules;
}
