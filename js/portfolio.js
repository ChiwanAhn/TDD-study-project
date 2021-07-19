const Money = require("./money");

class Portfolio {
  constructor() {
    this.moneys = [];
  }

  add(...args) {
    this.moneys = [...this.moneys, ...args];
  }

  evaluate(currency) {
    let total = this.moneys.reduce((res, el) => res + el.amount, 0);
    return new Money(total, currency);
  }
}
module.exports = Portfolio;
