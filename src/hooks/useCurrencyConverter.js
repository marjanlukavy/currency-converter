import { useState, useEffect } from "react";
import useExchangeRateStore from "../store/useExchangeRateStore";
import useDebounce from "./useDebounce";
import {
  CONVERTER_DELAY,
  CURRENCIES,
  INPUT_NAMES,
  ACTIVE_INPUTS,
} from "../constants";

const useCurrencyConverter = (
  initialCurrency1 = CURRENCIES.USD,
  initialCurrency2 = CURRENCIES.UAH,
  initialAmount = 1
) => {
  const { convertCurrency } = useExchangeRateStore();

  const [amount1, setAmount1] = useState(initialAmount);
  const [currency1, setCurrency1] = useState(initialCurrency1);
  const [amount2, setAmount2] = useState("");
  const [currency2, setCurrency2] = useState(initialCurrency2);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeInput, setActiveInput] = useState(ACTIVE_INPUTS.AMOUNT1);

  const debouncedAmount1 = useDebounce(amount1, CONVERTER_DELAY);
  const debouncedAmount2 = useDebounce(amount2, CONVERTER_DELAY);
  const debouncedCurrency1 = useDebounce(currency1, CONVERTER_DELAY);
  const debouncedCurrency2 = useDebounce(currency2, CONVERTER_DELAY);

  useEffect(() => {
    if (activeInput === ACTIVE_INPUTS.AMOUNT1) {
      handleConversion(
        debouncedAmount1,
        debouncedCurrency1,
        debouncedCurrency2
      );
    }
  }, [debouncedAmount1, debouncedCurrency1, debouncedCurrency2]);

  useEffect(() => {
    if (activeInput === ACTIVE_INPUTS.AMOUNT2) {
      handleReverseConversion(
        debouncedAmount2,
        debouncedCurrency2,
        debouncedCurrency1
      );
    }
  }, [debouncedAmount2, debouncedCurrency1, debouncedCurrency2]);

  const handleConversion = async (amount, fromCurrency, toCurrency) => {
    if (!amount) {
      setAmount2("");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await convertCurrency(fromCurrency, toCurrency, amount);
      setAmount2(result ? result.toFixed(2) : "");
    } catch (error) {
      setError(error.message);
      setAmount2("");
    } finally {
      setLoading(false);
    }
  };

  const handleReverseConversion = async (amount, fromCurrency, toCurrency) => {
    if (!amount) {
      setAmount1("");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await convertCurrency(fromCurrency, toCurrency, amount);
      setAmount1(result ? result.toFixed(2) : "");
    } catch (error) {
      setError(error.message);
      setAmount1("");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (inputName, value) => {
    if (inputName === INPUT_NAMES.AMOUNT1) {
      setAmount1(value);
      setActiveInput(ACTIVE_INPUTS.AMOUNT1);
    } else {
      setAmount2(value);
      setActiveInput(ACTIVE_INPUTS.AMOUNT2);
    }
  };

  const handleCurrencyChange = (inputName, value) => {
    if (inputName === INPUT_NAMES.CURRENCY1) {
      setCurrency1(value);
      setActiveInput(ACTIVE_INPUTS.AMOUNT1);
    } else {
      setCurrency2(value);
      setActiveInput(ACTIVE_INPUTS.AMOUNT2);
    }
  };

  const swapCurrencies = () => {
    setCurrency1(currency2);
    setCurrency2(currency1);
    setAmount1(amount2);
    setAmount2(amount1);
    setActiveInput(ACTIVE_INPUTS.AMOUNT1);
  };

  return {
    amount1,
    amount2,
    currency1,
    currency2,
    loading,
    error,
    handleAmountChange,
    handleCurrencyChange,
    swapCurrencies,
  };
};

export default useCurrencyConverter;
