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
    const exchangeRates = {
      "EUR->USD": 1.2,
      "USD->KRW": 1100,
    };
    if (money.currency === currency) {
      return money.amount;
    }
    const key = `${money.currency}->${currency}`;
    return money.amount * exchangeRates[key];
  }
}
module.exports = Portfolio;
