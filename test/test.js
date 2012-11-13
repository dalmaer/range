var range  = require('../range');
var should = require('should');

describe('range', function() {
  it('a simple range with from 1 and to 10', function() {
    range.integerRange({
      from: 1,
      to: 10
    }).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('a simple odd starting range with a step', function() {
    range.integerRange({
      from: 1,
      to: 10,
      step: 2
    }).should.eql([1, 3, 5, 7, 9]);
  });

  it('a simple even starting range with a step', function() {
    range.integerRange({
      from: 0,
      to: 10,
      step: 2
    }).should.eql([0, 2, 4, 6, 8, 10]);
  });

  it('a simple range with an excluding function', function() {
    range.integerRange({
      from: 1,
      to: 3,
      excluding: function(num) {
        return num === 2;
      }
    }).should.eql([1, 3]);
  });

  it('a simple range with the minimal info (a to)', function() {
    range.integerRange({
      to: 3
    }).should.eql([1, 2, 3]);
  });

  it('multiple ranges with simple from and to', function() {
    range.integerRange([{
        from: 1,
        to: 2
      }, {
        from: 3,
        to: 4
    }]).should.eql([1, 2, 3, 4]);
  });

  it('a range where the from is higher than the to', function() {
    (function() {
      range.integerRange({
       from: 2,
       to: 1
      });
    }).should['throw']();
  });

  it('a range with a huge step', function() {
    range.integerRange({
      from: 1,
      to: 2,
      step: 10
    }).should.eql([1]);
  });

  it('a range where the step lands on the to', function() {
    range.integerRange({
      from: 1,
      to: 3,
      step: 2
    }).should.eql([1, 3]);
  });

  it('a range where the from is negative', function() {
    range.integerRange({
      from: -4,
      to: 4
    }).should.eql([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
  });

  it('a range where the from is negative with a step', function() {
    range.integerRange({
      from: -4,
      to: 4,
      step: 2
    }).should.eql([-4, -2, 0, 2, 4]);
  });

  it('a range where the from and to are negative', function() {
    range.integerRange({
      from: -4,
      to: -3
    }).should.eql([-4, -3]);
  });

});
