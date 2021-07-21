package main

import (
	"reflect"
	s "tdd/stocks"
	"testing"
)

var bank s.Bank

func init() {
	bank = s.NewBank()
	bank.AddExchangeRate("EUR", "USD", 1.2)
	bank.AddExchangeRate("USD", "KRW", 1100)
}

func TestMultiplicationInDollars(t *testing.T) {
	fiveDollars := s.NewMoney(5, "USD")

	actualResult := fiveDollars.Times(2)
	expectedResult := s.NewMoney(10, "USD")
	assertEqual(t, expectedResult, actualResult)
}

func TestMultiplicationInEuros(t *testing.T) {
	tenEuros := s.NewMoney(10, "EUR")
	actualResult := tenEuros.Times(2)
	expectedResult := s.NewMoney(20, "EUR")
	assertEqual(t, expectedResult, actualResult)
}

// In Go, printing a struct with the %+v format “verb” prints the struct’s field names as well as values.

func TestDivision(t *testing.T) {
	originalMoney := s.NewMoney(4002, "KRW")
	actualResult := originalMoney.Divide(4)
	expectedResult := s.NewMoney(1000.5, "KRW")
	assertEqual(t, expectedResult, actualResult)
}

func TestAddition(t *testing.T) {
	var portfolio s.Portfolio

	fiveDollars := s.NewMoney(5, "USD")
	tenDollars := s.NewMoney(10, "USD")
	fifteenDollars := s.NewMoney(15, "USD")

	portfolio = portfolio.Add(fiveDollars)
	portfolio = portfolio.Add(tenDollars)
	portfolioInDollars, err := portfolio.Evaluate(bank, "USD")

	assertNil(t, err)
	assertEqual(t, fifteenDollars, *portfolioInDollars)
}

func TestAdditionOfDollarsAndEuros(t *testing.T) {
	var portfolio s.Portfolio

	fiveDollars := s.NewMoney(5, "USD")
	tenEuros := s.NewMoney(10, "EUR")

	portfolio = portfolio.Add(fiveDollars)
	portfolio = portfolio.Add(tenEuros)

	expectedValue := s.NewMoney(17, "USD")
	actualValue, err := portfolio.Evaluate(bank, "USD")

	assertNil(t, err)
	assertEqual(t, expectedValue, *actualValue)
}

func TestAddtionOfDollarsAndWons(t *testing.T) {
	var portfolio s.Portfolio

	fiveDollars := s.NewMoney(1, "USD")
	elevenHundredWon := s.NewMoney(1100, "KRW")

	portfolio = portfolio.Add(fiveDollars)
	portfolio = portfolio.Add(elevenHundredWon)

	expectedValue := s.NewMoney(2200, "KRW")
	actualValue, err := portfolio.Evaluate(bank, "KRW")

	assertNil(t, err)
	assertEqual(t, expectedValue, *actualValue)
}

func TestAdditionWithMultipleMissingExchangeRates(t *testing.T) {
	var portfolio s.Portfolio

	oneDollar := s.NewMoney(1, "USD")
	oneEuro := s.NewMoney(1, "EUR")
	oneWon := s.NewMoney(1, "KRW")

	portfolio = portfolio.Add(oneDollar)
	portfolio = portfolio.Add(oneEuro)
	portfolio = portfolio.Add(oneWon)

	expectedErrorMessage := "Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid,]"
	value, actualError := portfolio.Evaluate(bank, "Kalganid")

	assertNil(t, value)
	assertEqual(t, expectedErrorMessage, actualError.Error())
}

func TestConversionWithDifferentRatesBetweenTwoCurrencies(t *testing.T) {
	bank.AddExchangeRate("EUR", "KRW", 1300)
	tenEuros := s.NewMoney(10, "EUR")
	actualConvertedMoney, err := bank.Convert(tenEuros, "KRW")
	assertNil(t, err)
	assertEqual(t, s.NewMoney(13000, "KRW"), *actualConvertedMoney)

	bank.AddExchangeRate("EUR", "KRW", 1344)
	actualConvertedMoney, err = bank.Convert(tenEuros, "KRW")
	assertNil(t, err)
	assertEqual(t, s.NewMoney(13440, "KRW"), *actualConvertedMoney)
}

func TestConversionWithMissingExchangeRate(t *testing.T) {
	bank := s.NewBank()
	tenEuros := s.NewMoney(10, "EUR")
	actualConvertedMoney, err := bank.Convert(tenEuros, "Kalganid")
	if actualConvertedMoney != nil {
		t.Errorf("Expected money to be nil, found: [%+v]", actualConvertedMoney)
	}
	assertEqual(t, "EUR->Kalganid", err.Error())

}

// In Go, the empty interface{} is implemented by every type.
func assertEqual(t *testing.T, expected interface{}, actual interface{}) {
	if expected != actual {
		t.Errorf("Expected [%+v], got: [%+v]", expected, actual)
	}
}

func assertNil(t *testing.T, actual interface{}) {
	if actual != nil && !reflect.ValueOf(actual).IsNil() {
		t.Errorf("Expected error to be nil, found: [%+v]", actual)
	}
}
