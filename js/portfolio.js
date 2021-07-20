const Money = require("./money");

class Portfolio {
  constructor() {
    this.moneys = [];
  }

  add(...args) {
    this.moneys = [...this.moneys, ...args];
  }

  evaluate(currency) {
    let failures = [];
    let total = this.moneys.reduce((res, el) => {
      const convertedAmount = this.convert(el, currency);
      if (!convertedAmount) return failures.push(el.currency + "->" + currency);
      return res + convertedAmount;
    }, 0);
    if (failures.length === 0) {
      return new Money(total, currency);
    }
    throw new Error(`Missing exchange rate(s):[${failures.join(",")}]`);
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
    const rate = exchangeRates[key];

    if (!rate) return undefined;

    return money.amount * rate;
  }
}
module.exports = Portfolio;
