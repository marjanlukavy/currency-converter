import React, { useEffect } from "react";
import { FaSpinner, FaExchangeAlt } from "react-icons/fa";
import useExchangeRateStore from "../../../store/useExchangeRateStore";

const Header = () => {
  const { rates, fetchRates, loading, error } = useExchangeRateStore();

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <FaExchangeAlt className="text-4xl mr-3" />
          <h1 className="text-3xl font-bold">Currency Converter</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
          {loading && (
            <div className="flex items-center">
              <FaSpinner className="animate-spin mr-2" />
              <span>Loading rates...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500 text-white px-4 py-2 rounded-md">
              Error fetching rates
            </div>
          )}

          {!loading && !error && rates["USD"] && rates["EUR"] && (
            <>
              <div className="flex items-center hover:bg-purple-500 rounded-full px-4 py-2 transition-colors duration-200">
                <span>1 UAH = {rates["EUR"].toFixed(4)} EUR</span>
              </div>
              <div className="flex items-center hover:bg-purple-500 rounded-full px-4 py-2 transition-colors duration-200">
                <span>1 UAH = {rates["USD"].toFixed(4)} USD</span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
