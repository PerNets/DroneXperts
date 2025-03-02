import React, { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';

// Create a context for currency
interface CurrencyContextType {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  exchangeRate: number;
  isLoading: boolean;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'ILS',
  setCurrency: () => {},
  exchangeRate: 3.6, // Default exchange rate (1 USD to ILS)
  isLoading: false,
});

function App() {
  const [currency, setCurrency] = useState('ILS'); // ILS או USD
  const [exchangeRate, setExchangeRate] = useState(3.6); // Default exchange rate
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the current exchange rate when the component mounts
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setIsLoading(true);
        // Using ExchangeRate-API for real-time exchange rates
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        
        if (data && data.rates && data.rates.ILS) {
          setExchangeRate(data.rates.ILS);
          console.log(`Current exchange rate: 1 USD = ${data.rates.ILS} ILS`);
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        // Keep the default exchange rate if there's an error
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
    
    // Refresh exchange rate every hour
    const intervalId = setInterval(fetchExchangeRate, 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRate, isLoading }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productSlug" element={<ProductPage />} />
      </Routes>
    </CurrencyContext.Provider>
  );
}

export default App;