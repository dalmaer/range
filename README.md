range
=====

A simple utility module to return Integer series from simple rules.

You can pass in a single range, or multiple ones.

Options for a range are:

- `from`: The first number in the range (defaults to 1)
- `to`: No number can be larger than this in the range (but it could be less!)
  - if `from` = 1, `step` = 2, `to` = 10, then the last item will be 9
  - if `from` = 1, `to` = 10, `excluding = function(num) { num !== 10 }`, then the last item will also be 9
- `step`: number to bump the range by each time (defaults to 1)
- `excluding`: function that returns false if an item should not be including in the set

## Create a single range from one rule

    var range = require('range');

    range.integerRange({
      from: 1,
      to: 10
    }) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

## Create a range from multiple rules

    range.integerRange([
      { from: 1,  to: 10 },
      { from: 20, to: 30 }
    ])

# Limitations

- Positive steps only (from small to large)
- Doesn't make sure that the result is a unique set with multiple rules

# Examples

The best examples are in ([the tests themselves](https://github.com/dalmaer/range/test/test.js)).

