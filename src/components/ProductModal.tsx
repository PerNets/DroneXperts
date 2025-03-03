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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
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