var range  = require('../range');
var should = require('should');

describe('range', function() {
  it('a simple range with from 1 and to 10', function() {
    range.ofIntegers({
      from: 1,
      to: 10
    }).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('a simple odd starting range with a step', function() {
    range.ofIntegers({
      from: 1,
      to: 10,
      step: 2
    }).should.eql([1, 3, 5, 7, 9]);
  });

  it('a simple even starting range with a step', function() {
    range.ofIntegers({
      from: 0,
      to: 10,
      step: 2
    }).should.eql([0, 2, 4, 6, 8, 10]);
  });

  it('a simple range with an excluding function', function() {
    range.ofIntegers({
      from: 1,
      to: 3,
      excluding: function(num) {
        return num === 2;
      }
    }).should.eql([1, 3]);
  });

  it('a simple range with the minimal info (a "to", prooves default "from" is 1)', function() {
    range.ofIntegers({
      to: 3
    }).should.eql([1, 2, 3]);
  });

  it('multiple ranges with simple from and to', function() {
    range.ofIntegers([{
        from: 1,
        to: 2
      }, {
        from: 3,
        to: 4
    }]).should.eql([1, 2, 3, 4]);
  });

  it('a range where the from is higher than the to', function() {
    (function() {
      range.ofIntegers({
       from: 2,
       to: 1
      });
    }).should['throw']();
  });

  it('a range where the there is no "to"', function() {
    (function() {
      range.ofIntegers({});
    }).should['throw']();
  });

  it('a range with a huge step', function() {
    range.ofIntegers({
      from: 1,
      to: 2,
      step: 10
    }).should.eql([1]);
  });

  it('a range where the step lands on the to', function() {
    range.ofIntegers({
      from: 1,
      to: 3,
      step: 2
    }).should.eql([1, 3]);
  });

  it('a range where the from is negative', function() {
    range.ofIntegers({
      from: -4,
      to: 4
    }).should.eql([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
  });

  it('a range where the from is negative with a step', function() {
    range.ofIntegers({
      from: -4,
      to: 4,
      step: 2
    }).should.eql([-4, -2, 0, 2, 4]);
  });

  it('a range where the from and to are negative', function() {
    range.ofIntegers({
      from: -4,
      to: -3
    }).should.eql([-4, -3]);
  });

  //
  // String ranges
  //

  it('a simple string range', function() {
    range.ofIntegers('1..4').should.eql([1, 2, 3, 4]);
  });

  it('a string range with commas', function() {
    range.ofIntegers('1..4,5,7..8').should.eql([1, 2, 3, 4, 5, 7, 8]);
  });

  it('a string range with commas, spaces, and negative "from"', function() {
    range.ofIntegers('1..4, 5, -1..5').should.eql([1, 2, 3, 4, 5, -1, 0, 1, 2, 3, 4, 5]);
  });

  it('a string range with step "by"', function() {
    range.ofIntegers('1..10 by 2').should.eql([1, 3, 5, 7, 9]);
  });

  it('a simple error string', function() {
    (function() {
      range.ofIntegers('');
    }).should['throw']();
  });

  it('a simple error string with no "to"', function() {
    (function() {
      range.ofIntegers('1..');
    }).should['throw']();
  });

});
