import React, { useContext } from 'react';
import { X, MessageCircle, Package, ListChecks } from 'lucide-react';
import { Product } from '../types';
import { CurrencyContext } from '../App';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { currency } = useContext(CurrencyContext);
  const whatsappNumber = '972548943395';
  const message = encodeURIComponent(`היי, אני מעוניין לשמוע יותר על ${product.name}`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* תמונה */}
          <div className="relative h-[300px] md:h-full">
            <img 
              src={product.image} 
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover rounded-t-2xl md:rounded-r-none md:rounded-l-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent md:hidden" />
          </div>

          {/* תוכן */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4 text-gradient">{product.name}</h2>
            <p className="text-gray-300 mb-6">{product.description}</p>

            <div className="space-y-6">
              {/* מפרט */}
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-blue-400" />
                  מפרט טכני
                </h3>
                <ul className="space-y-2">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* תכולת החבילה */}
              {product.includes && (
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-400" />
                    תכולת החבילה
                  </h3>
                  <ul className="space-y-2">
                    {product.includes.map((item, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* כפתורי פעולה */}
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col">
                {currency === 'ILS' ? (
                  <div className="text-3xl font-bold text-blue-400">{product.price}</div>
                ) : (
                  <div className="text-3xl font-bold text-blue-400">{product.priceUSD}</div>
                )}
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                דברו איתנו
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 