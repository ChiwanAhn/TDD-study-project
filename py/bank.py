from money import Money


class Bank:
    def __init__(self) -> None:
        self.exchangeRates = {}

    def addExchangeRate(self, currencyFrom: str, currencyTo: str, rate: float) -> None:
        key = currencyFrom + '->' + currencyTo
        self.exchangeRates[key] = rate

    def convert(self, aMoney: Money, aCurrency: str):
        if aMoney.currency == aCurrency:
            return Money(aMoney.amount, aCurrency)
        key = aMoney.currency + '->' + aCurrency
        if key in self.exchangeRates:
            return Money(aMoney.amount * self.exchangeRates[key], aCurrency)
        raise Exception(key)
