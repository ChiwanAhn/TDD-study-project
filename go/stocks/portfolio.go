package stocks

import "errors"

type Portfolio []Money

func NewMoney(amount float64, currency string) Money {
	return Money{amount, currency}
}

func (p Portfolio) Add(money Money) Portfolio {
	p = append(p, money)
	return p
}

func (p Portfolio) Evaluate(bank Bank, currency string) (*Money, error) {
	total := 0.0
	failedConversions := make([]string, 0)
	for _, m := range p {
		if convertedCurrency, err := bank.Convert(m, currency); err == nil {
			total = total + convertedCurrency.amount
		} else {
			failedConversions = append(failedConversions, m.currency+"->"+currency)
		}
	}
	if len(failedConversions) == 0 {
		totalMoney := NewMoney(total, currency)
		return &totalMoney, nil
	}
	var failures string
	for _, f := range failedConversions {
		failures = failures + f + ","
	}
	failures = "[" + failures + "]"

	return nil, errors.New("Missing exchange rate(s):" + failures)
}
