const Money = require("./money");

class Bank {
  constructor() {
    this.exchangeRates = {};
  }

  addExchangeRate(currencyFrom, currencyTo, rate) {
    const key = currencyFrom + "->" + currencyTo;
    this.exchangeRates = { ...this.exchangeRates, [key]: rate };
  }

  convert(money, currency) {
    if (money.currency == currency) {
      return new Money(money.amount, money, currency);
    }
    const key = money.currency + "->" + currency;

    const rate = this.exchangeRates[key];
    if (!rate) {
      throw new Error(key);
    }

    return new Money(money.amount * rate, currency);
  }
}

module.exports = Bank;
