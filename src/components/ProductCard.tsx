import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { MessageCircle, Camera, Battery, Wifi, Wind } from 'lucide-react';
import { CurrencyContext } from '../App';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { currency } = useContext(CurrencyContext);
  const whatsappNumber = '972548943395';
  const message = encodeURIComponent(`היי, אני מעוניין לשמוע יותר על ${product.name}`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <Link 
      to={`/product/${product.slug}`}
      className="glass-effect rounded-2xl overflow-hidden card-hover cursor-pointer transform transition-all hover:scale-[1.02]"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-gradient">{product.name}</h3>
        <p className="text-gray-300 mb-4">{product.description}</p>
        
        <div className="space-y-3 mb-6">
          {product.specs.slice(0, 4).map((spec, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
              {index === 0 && <Camera className="h-4 w-4" />}
              {index === 1 && <Battery className="h-4 w-4" />}
              {index === 2 && <Wifi className="h-4 w-4" />}
              {index === 3 && <Wind className="h-4 w-4" />}
              {spec}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-right">
            {currency === 'ILS' ? (
              <div className="text-2xl font-bold text-blue-400">{product.price}</div>
            ) : (
              <div className="text-2xl font-bold text-blue-400">{product.priceUSD}</div>
            )}
          </div>
          <span className="glass-effect px-3 py-1 rounded-lg text-sm text-gray-300">
            {product.category}
          </span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="h-5 w-5" />
            דברו איתנו
          </a>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;