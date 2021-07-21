const Money = require("./money");

class Portfolio {
  constructor() {
    this.moneys = [];
  }

  add(...args) {
    this.moneys = [...this.moneys, ...args];
  }

  evaluate(bank, currency) {
    let failures = [];
    let total = this.moneys.reduce((res, el) => {
      let convertedMoney;
      try {
        convertedMoney = bank.convert(el, currency);
      } catch (error) {
        failures.push(error.message);
        return res;
      }
      return res + convertedMoney.amount;
    }, 0);
    if (failures.length === 0) {
      return new Money(total, currency);
    }
    throw new Error(`Missing exchange rate(s):[${failures.join(",")}]`);
  }
}
module.exports = Portfolio;
