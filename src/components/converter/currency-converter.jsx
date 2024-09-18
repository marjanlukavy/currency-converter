import React from "react";
import SwapButton from "../common/forms/buttons/swap-button";
import CurrencyInput from "./currency-input";
import { CURRENCIES, INPUT_NAMES } from "../../constants";
import useCurrencyConverter from "../../hooks/useCurrencyConverter";

const CurrencyConverter = () => {
  const {
    amount1,
    amount2,
    currency1,
    currency2,
    loading,
    error,
    handleAmountChange,
    handleCurrencyChange,
    swapCurrencies,
  } = useCurrencyConverter();

  const currencyOptions = Object.values(CURRENCIES);

  return (
    <div className="min-h-[calc(100vh-188px)] px-4 md:px-0 md:min-h-[calc(100vh-88px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="p-8 relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl transform transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Currency Converter
        </h2>
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-md animate-fade-in-down"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}
        <div className="flex flex-col gap-6">
          <CurrencyInput
            label="From"
            amount={amount1}
            currency={currency1}
            onAmountChange={(e) =>
              handleAmountChange(INPUT_NAMES.AMOUNT1, e.target.value)
            }
            onCurrencyChange={(e) =>
              handleCurrencyChange(INPUT_NAMES.CURRENCY1, e.target.value)
            }
            currencies={currencyOptions}
          />
          <SwapButton onClick={swapCurrencies} />
          <CurrencyInput
            label="To"
            amount={amount2}
            currency={currency2}
            onAmountChange={(e) =>
              handleAmountChange(INPUT_NAMES.AMOUNT2, e.target.value)
            }
            onCurrencyChange={(e) =>
              handleCurrencyChange(INPUT_NAMES.CURRENCY2, e.target.value)
            }
            currencies={currencyOptions}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
