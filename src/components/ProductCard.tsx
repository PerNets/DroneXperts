import React, { useState } from 'react';
import { Product } from '../types';
import { MessageCircle, Camera, Battery, Wifi, Wind } from 'lucide-react';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const whatsappNumber = '972XXXXXXXXX';
  const message = encodeURIComponent(`שלום, אני מעוניין לרכוש את ${product.name}. האם הוא זמין?`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <>
      <div 
        className="glass-effect rounded-2xl overflow-hidden card-hover cursor-pointer transform transition-all hover:scale-[1.02]"
        onClick={() => setIsModalOpen(true)}
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
            <span className="text-2xl font-bold text-blue-400">{product.price}</span>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="h-5 w-5" />
              הזמן עכשיו
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal 
          product={product} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;