import unittest


class Money:
    def __init__(self, amount: int, currency: str) -> None:
        self.amount = amount
        self.currency = currency

    def times(self, multiplier):
        return Money(self.amount * multiplier, self.currency)

    def divide(self, divisor):
        return Money(self.amount / divisor, self.currency)

    def __eq__(self, o: object) -> bool:
        return self.amount == o.amount and self.currency == o.currency


class TestMoney(unittest.TestCase):
    def testMultiplication(self):
        fiveDollars = Money(5, 'USD')
        tenDollars = Money(10, 'USD')
        self.assertEqual(tenDollars, fiveDollars.times(2))

    def testMultiplicationInEuros(self):
        tenEuros = Money(10, "EUR")
        twentyEuros = Money(20, "EUR")
        self.assertEqual(twentyEuros, tenEuros.times(2))

    def testDivision(self):
        originalMoney = Money(4002, "KRW")
        expectedMoneyAfterDivision = Money(1000.5, "KRW")
        self.assertEqual(originalMoney.divide(4),
                         expectedMoneyAfterDivision)


if __name__ == '__main__':
    unittest.main()
