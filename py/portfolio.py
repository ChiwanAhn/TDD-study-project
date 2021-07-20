from money import Money
import functools
import operator


class Portfolio:
    def __init__(self) -> None:
        self.moneys = []

    def add(self, *moneys):
        self.moneys.extend(moneys)

    def evaluate(self, currency: str) -> Money:
        total = 0.0
        failures = []
        for m in self.moneys:
            try:
                total += self.__convert(m, currency)
            except KeyError as ke:
                failures.append(ke)

        if len(failures) == 0:
            return Money(total, currency)
        failureMessage = ",".join(f.args[0] for f in failures)
        raise Exception("Missing exchange rate(s):[" + failureMessage + "]")

    def __convert(self, money, currency: str):
        exchangeRates = {
            "EUR->USD": 1.2,
            "USD->KRW": 1100,
        }
        if money.currency == currency:
            return money.amount
        key = money.currency + '->' + currency
        return money.amount * exchangeRates[key]
