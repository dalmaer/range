range
=====

[![browser support](http://ci.testling.com/dalmaer/range.png)](http://ci.testling.com/dalmaer/range)

A simple utility module to return Integer series from simple rules.

You can pass in a single range, or multiple ones.

There is a helper syntax that allows you to pass in a string to define the rules.

Options for a range are:

- `from`: The first number in the range (defaults to 1)
- `to`: No number can be larger than this in the range (but it could be less!)
  - if `from` = 1, `step` = 2, `to` = 10, then the last item will be 9
  - if `from` = 1, `to` = 10, `excluding = function(num) { num !== 10 }`, then the last item will also be 9
- `step`: number to bump the range by each time (defaults to 1)
- `excluding`: function that returns false if an item should not be including in the set

## Create a range using the nice syntax (unable to set an excluding function)

    var range = require('range');

    // Syntax: numberOrRange[,numberOrRange][by stepAmount]

    range.ofIntegers('1..4'); // [1, 2, 3, 4]

    range.ofIntegers('1..4,5,7..8'); // [1, 2, 3, 4, 5, 7, 8]

    range.ofIntegers('1..10 by 2'); // [1, 3, 5, 7, 9]

## Create a single range from one rule using an Object


    range.ofIntegers({
      from: 1,
      to: 10
    }) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

## Create a range from multiple rules using an array of Objects

    range.ofIntegers([
      { from: 1,  to: 10 },
      { from: 20, to: 30 }
    ])

# Limitations

- Positive steps only (from small to large)
- Doesn't make sure that the result is a unique set with multiple rules (Do the equivilent to Array.uniq() on the result)

# Examples

The best examples are in ([the tests themselves](https://github.com/dalmaer/range/test/test.js)).

