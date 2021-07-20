from portfolio import Portfolio
from money import Money
import unittest


class TestMoney(unittest.TestCase):
    def testMultiplication(self):
        tenEuros = Money(10, "EUR")
        twentyEuros = Money(20, "EUR")
        self.assertEqual(twentyEuros, tenEuros.times(2))

    def testDivision(self):
        originalMoney = Money(4002, "KRW")
        expectedMoneyAfterDivision = Money(1000.5, "KRW")
        self.assertEqual(originalMoney.divide(4),
                         expectedMoneyAfterDivision)

    def testAddtion(self):
        fiveDollars = Money(5, 'USD')
        tenDollars = Money(10, 'USD')
        fifteenDollars = Money(15, 'USD')
        portfolio = Portfolio()
        portfolio.add(fiveDollars, tenDollars)
        self.assertEqual(portfolio.evaluate('USD'), fifteenDollars)

    def testAdditionOfDollarsAndEuros(self):
        fiveDollars = Money(5, "USD")
        tenEuros = Money(10, "EUR")
        portfolio = Portfolio()
        portfolio.add(fiveDollars, tenEuros)
        expectedValue = Money(17, "USD")
        actualValue = portfolio.evaluate("USD")
        self.assertEqual(expectedValue, actualValue,
                         "%s != %s" % (expectedValue, actualValue)
                         )


if __name__ == '__main__':
    unittest.main()
