from money import Money
import functools
import operator


class Portfolio:
    def __init__(self) -> None:
        self.moneys = []

    def add(self, *moneys):
        self.moneys.extend(moneys)

    def evaluate(self, currency: str) -> Money:
        total = functools.reduce(operator.add, map(
            lambda m: self.__convert(m, currency), self.moneys))
        return Money(total, currency)

    def __convert(self, money, currency: str):
        exchangeRates = {
            "EUR->USD": 1.2,
            "USD->KRW": 1100,
        }
        if money.currency == currency:
            return money.amount
        key = money.currency + '->' + currency
        return money.amount * exchangeRates[key]
