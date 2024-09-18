import React from "react";
import CustomDropdown from "../common/forms/dropdowns/dropdown";

const CurrencyInput = ({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  currencies,
  readOnly = false,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={`amount-${label}`}
        className="block text-sm font-medium text-gray-700 uppercase"
      >
        {label}
      </label>
      <div className="flex space-x-4">
        <input
          id={`amount-${label}`}
          type="number"
          value={amount}
          onChange={onAmountChange}
          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-200 hover:border-blue-300"
          placeholder={readOnly ? "Converted amount" : "Enter amount"}
          readOnly={readOnly}
        />
        <CustomDropdown
          value={currency}
          onChange={onCurrencyChange}
          options={currencies}
          className="w-28"
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
