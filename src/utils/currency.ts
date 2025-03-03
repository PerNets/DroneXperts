import { useEffect, useState } from 'react';

const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export const useExchangeRate = () => {
  const [rate, setRate] = useState<number>(3.6); // ברירת מחדל
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch(EXCHANGE_API_URL);
        const data = await response.json();
        setRate(data.rates.ILS);
        setLoading(false);
      } catch (err) {
        setError('שגיאה בטעינת שער החליפין');
        setLoading(false);
      }
    };

    fetchRate();
    // מתעדכן כל שעה
    const interval = setInterval(fetchRate, 3600000);
    return () => clearInterval(interval);
  }, []);

  return { rate, loading, error };
};

export const convertUSDToILS = (usdAmount: string): number => {
  const numericValue = parseFloat(usdAmount.replace('$', '').replace(',', ''));
  return numericValue * 3.6; // שער ברירת מחדל אם אין חיבור ל-API
};

export const formatILS = (amount: number): string => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}; 