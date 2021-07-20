class Money:
    def __init__(self, amount: int, currency: str) -> None:
        self.amount = amount
        self.currency = currency

    def __str__(self) -> str:
        return "%s %0.2f" % (self.currency, self.amount)

    def times(self, multiplier):
        return Money(self.amount * multiplier, self.currency)

    def divide(self, divisor):
        return Money(self.amount / divisor, self.currency)

    def __eq__(self, o: object) -> bool:
        return self.amount == o.amount and self.currency == o.currency
