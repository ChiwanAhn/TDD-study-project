const assert = require("assert");
const Money = require("./money");
const Portfolio = require("./portfolio");
const Bank = require("./bank");

class MoneyTest {
  constructor() {
    this.bank = new Bank();
    this.bank.addExchangeRate("EUR", "USD", 1.2);
    this.bank.addExchangeRate("USD", "KRW", 1100);
  }

  testMultiplication() {
    const tenEuros = new Money(10, "EUR");
    const twentyEuros = tenEuros.times(2);
    assert.strictEqual(twentyEuros.amount, 20);
    assert.strictEqual(twentyEuros.currency, "EUR");
  }

  testDivision() {
    const originalMoney = new Money(4002, "KRW");
    const actualMoneyAfterDivision = originalMoney.divide(4);
    const expectedMoneyAfterDivision = new Money(1000.5, "KRW");
    assert.deepStrictEqual(
      actualMoneyAfterDivision,
      expectedMoneyAfterDivision,
    );
  }
  testAddition() {
    const fiveDollars = new Money(5, "USD");
    const tenDollars = fiveDollars.times(2);
    const fifteenDollars = new Money(15, "USD");
    const portfolio = new Portfolio();
    portfolio.add(fiveDollars, tenDollars);
    assert.deepStrictEqual(
      portfolio.evaluate(new Bank(), "USD"),
      fifteenDollars,
    );
  }
  testAdditionOfDollarsAndEuros() {
    const fiveDollars = new Money(5, "USD");
    const tenEuros = new Money(10, "EUR");
    const portfolio = new Portfolio();
    portfolio.add(fiveDollars, tenEuros);
    const expectedValue = new Money(17, "USD");
    assert.deepStrictEqual(portfolio.evaluate(this.bank, "USD"), expectedValue);
  }
  testAdditionOfDollarsAndWons() {
    const oneDollar = new Money(1, "USD");
    const elevenHundredWon = new Money(1100, "KRW");
    const portfolio = new Portfolio();
    portfolio.add(oneDollar, elevenHundredWon);
    const expectedValue = new Money(2200, "KRW");
    assert.deepStrictEqual(portfolio.evaluate(this.bank, "KRW"), expectedValue);
  }
  testAdditionWithMultipleMissingExchangeRates() {
    const oneDollar = new Money(1, "USD");
    const oneEuro = new Money(1, "EUR");
    const oneWon = new Money(1, "KRW");
    const portfolio = new Portfolio();
    portfolio.add(oneDollar, oneEuro, oneWon);
    const expectedError = new Error(
      "Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid]",
    );
    let bank = this.bank;
    assert.throws(() => {
      portfolio.evaluate(bank, "Kalganid");
    }, expectedError);
  }
  testConversion() {
    const bank = new Bank();
    bank.addExchangeRate("EUR", "USD", 1.2);
    const tenEuros = new Money(10, "EUR");
    assert.deepStrictEqual(bank.convert(tenEuros, "USD"), new Money(12, "USD"));
  }
  testConversionWithMissingExchangeRate() {
    const bank = new Bank();
    const tenEuros = new Money(10, "EUR");
    const expectedError = new Error("EUR->Kalganid");
    assert.throws(() => {
      bank.convert(tenEuros, "Kalganid");
    }, expectedError);
  }

  getAllTestMethods() {
    const moneyPrototype = MoneyTest.prototype;
    const allTests = Object.getOwnPropertyNames(moneyPrototype).filter(
      (p) => typeof moneyPrototype[p] === "function" && p.startsWith("test"),
    );
    return allTests;
  }

  runAllTest() {
    const methods = this.getAllTestMethods();
    methods.forEach((m) => {
      console.log("Running: %s()", m);
      const method = Reflect.get(this, m);
      try {
        Reflect.apply(method, this, []);
      } catch (e) {
        if (e instanceof assert.AssertionError) {
          console.log(e);
        } else {
          throw e;
        }
      }
    });
  }
}

new MoneyTest().runAllTest();
