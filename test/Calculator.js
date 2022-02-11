class Calculator {
  constructor() {}

  add(...numbers) {
    return numbers.reduce((x, y) => x + y);
  }
  
  multiply(...numbers) {
    return numbers.reduce((x, y) => x * y);
  }
}

module.exports = Calculator;