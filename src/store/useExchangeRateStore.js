import { create } from "zustand";
import axios from "axios";

const apiKey = import.meta.env.VITE_FASTFOREX_API_KEY;

const useExchangeRateStore = create((set) => ({
  rates: {},
  baseCurrency: "UAH",
  loadingRates: false,
  errorRates: null,

  fetchRates: async () => {
    set({ loadingRates: true, errorRates: null });
    try {
      const response = await axios.get(
        `https://api.fastforex.io/fetch-multi?api_key=${apiKey}&from=UAH&to=USD,EUR`
      );
      set({
        rates: response.data.results,
        loadingRates: false,
      });
    } catch (error) {
      set({ errorRates: error.message, loadingRates: false });
    }
  },

  convertCurrency: async (from, to, amount) => {
    try {
      const response = await axios.get(
        `https://api.fastforex.io/convert?api_key=${apiKey}&from=${from}&to=${to}&amount=${amount}`
      );
      return response.data.result[to];
    } catch (error) {
      throw error;
    }
  },
}));

export default useExchangeRateStore;
