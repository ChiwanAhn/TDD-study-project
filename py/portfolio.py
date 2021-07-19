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
            lambda m: m.amount, self.moneys))
        return Money(total, currency)
