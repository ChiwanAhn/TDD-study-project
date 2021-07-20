const Money = require("./money");

class Portfolio {
  constructor() {
    this.moneys = [];
  }

  add(...args) {
    this.moneys = [...this.moneys, ...args];
  }

  evaluate(currency) {
    let total = this.moneys.reduce(
      (res, el) => res + this.convert(el, currency),
      0,
    );
    return new Money(total, currency);
  }

  convert(money, currency) {
    const eurToUsd = 1.2;
    if (money.currency === currency) {
      return money.amount;
    }
    return money.amount * eurToUsd;
  }
}
module.exports = Portfolio;
