export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'premium' | 'professional' | 'compact' | 'all' | 'batteries' | 'controllers' | 'cameras' | 'accessories';
  price: string;
  priceUSD?: string;
  priceValue?: number;
  slug?: string;
  image: string;
  images?: string[];
  specs: string[];
  includes?: string[];
  inStock?: boolean;
}

export interface Category {
  id: 'all' | 'premium' | 'professional' | 'compact' | 'batteries' | 'controllers' | 'cameras' | 'accessories';
  name: string;
}

export interface ProductsDisplayState {
  showAll: boolean;
  initialCount: number;
}

// Helper function to extract numeric value from price string
export const extractPriceValue = (priceString: string): number => {
  // Remove non-numeric characters except for decimal point
  const numericString = priceString.replace(/[^\d.]/g, '');
  return parseFloat(numericString) || 0;
};

// Helper function to format price with currency symbol
export const formatPrice = (value: number, currency: string): string => {
  if (currency === 'ILS') {
    return `₪${value.toLocaleString('he-IL')}`;
  } else {
    return `$${value.toLocaleString('en-US')}`;
  }
};

// Helper function to convert price between currencies
export const convertPrice = (value: number, fromCurrency: string, toCurrency: string, exchangeRate: number): number => {
  if (fromCurrency === toCurrency) return value;
  
  if (fromCurrency === 'ILS' && toCurrency === 'USD') {
    return value / exchangeRate;
  } else {
    return value * exchangeRate;
  }
};

// Helper function to create a URL-friendly slug from a product name
export const createSlug = (name: string): string => {
  // Convert to lowercase, replace spaces with hyphens, and remove special characters
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')        // Remove all non-word chars
    .replace(/--+/g, '-')           // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')             // Trim hyphens from start
    .replace(/-+$/, '');            // Trim hyphens from end
};