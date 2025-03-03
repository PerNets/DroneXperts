import { useExchangeRate, formatILS } from '../utils/currency';

interface ProductPriceProps {
  priceUSD: string;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ priceUSD }) => {
  const { rate, loading, error } = useExchangeRate();
  
  const usdValue = parseFloat(priceUSD.replace('$', '').replace(',', ''));
  const ilsValue = usdValue * rate;

  return (
    <div className="price-container" dir="ltr">
      <div className="main-price">
        {formatILS(ilsValue)}
      </div>
      <div className="usd-price text-sm text-gray-500">
        {priceUSD}
      </div>
      {error && (
        <div className="text-red-500 text-xs">
          {error}
        </div>
      )}
      {loading && (
        <div className="text-gray-500 text-xs">
          מעדכן מחירים...
        </div>
      )}
    </div>
  );
}; 