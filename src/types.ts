export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'premium' | 'professional' | 'compact' | 'all' | 'batteries' | 'controllers' | 'cameras' | 'accessories';
  price: string;
  image: string;
  specs: string[];
  includes?: string[];
}

export interface Category {
  id: 'all' | 'premium' | 'professional' | 'compact' | 'batteries' | 'controllers' | 'cameras' | 'accessories';
  name: string;
}

export interface ProductsDisplayState {
  showAll: boolean;
  initialCount: number;
}