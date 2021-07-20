from money import Money
import functools
import operator


class Portfolio:
    def __init__(self) -> None:
        self.moneys = []
        self._eur_to_usd = 1.2

    def add(self, *moneys):
        self.moneys.extend(moneys)

    def evaluate(self, currency: str) -> Money:
        total = functools.reduce(operator.add, map(
            lambda m: self.__convert(m, currency), self.moneys))
        return Money(total, currency)

    def __convert(self, money, currency: str):
        if money.currency == currency:
            return money.amount
        return money.amount * self._eur_to_usd
