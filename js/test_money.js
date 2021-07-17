const assert = require("assert");

class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  times(multiplier) {
    return new Money(this.amount * multiplier, this.currency);
  }

  divide(divisor) {
    return new Money(this.amount / divisor, this.currency);
  }
}

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

fiveDollars = new Money(5, "USD");
tenDollars = fiveDollars.times(2);
assert.strictEqual(tenDollars.amount, 10);
assert.strictEqual(tenDollars.currency, "USD");

tenEuros = new Money(10, "EUR");
twentyEuros = tenEuros.times(2);
assert.strictEqual(twentyEuros.amount, 20);
assert.strictEqual(twentyEuros.currency, "EUR");

originalMoney = new Money(4002, "KRW");
actualMoneyAfterDivision = originalMoney.divide(4);
expectedMoneyAfterDivision = new Money(1000.5, "KRW");
assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);

fifteenDollars = new Money(15, "USD");
portfolio = new Portfolio();
portfolio.add(fiveDollars, tenDollars);
assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);
