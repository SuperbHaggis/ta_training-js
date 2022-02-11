const assert = require('assert');
const Calculator = require('./Calculator.js')


describe('Calculator', function() {
  const calc = new Calculator();

  describe('#add()', function() {
    it('should return sum of all arguments', function() {
      assert.equal(calc.add(1, 2, 3), 6);
    })
  });

  describe('#multiply', function() {
    it('should return the product of all arguments', function() {
      assert.equal(calc.multiply(1, 2, 3), 6);
    })
  })
});
