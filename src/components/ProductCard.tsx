import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { MessageCircle, Camera, Battery, Wifi, Wind } from 'lucide-react';
import { CurrencyContext } from '../App';
import { extractPriceValue, formatPrice, convertPrice } from '../types';
import { ProductPrice } from './ProductPrice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currency, exchangeRate } = useContext(CurrencyContext);
  const whatsappNumber = '972548943395';
  const message = encodeURIComponent(`היי, אני מעוניין לשמוע יותר על ${product.name}`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
  const [currentImage, setCurrentImage] = useState<string>(product.image);
  const [imageError, setImageError] = useState(false);
  const [attemptedImages, setAttemptedImages] = useState<string[]>([]);

  // Extract the numeric price value
  const priceValue = extractPriceValue(product.price);
  
  // Convert price if needed
  const displayPrice = currency === 'USD' && product.priceUSD 
    ? product.priceUSD 
    : currency === 'USD' 
      ? formatPrice(convertPrice(priceValue, 'ILS', 'USD', exchangeRate), 'USD')
      : product.price;

  // טיפול בשגיאת טעינת תמונה
  const handleImageError = () => {
    const productId = product.id;
    const currentExt = currentImage.split('.').pop();
    
    // נסה פורמטים אחרים לתמונה הראשונה
    if (currentImage.includes('_1')) {
      if (currentExt === 'jpg') {
        setCurrentImage(`/all-images/${productId}_1.png`);
      } else if (currentExt === 'png') {
        setCurrentImage(`/all-images/${productId}_1.webp`);
      } else if (currentExt === 'webp') {
        setCurrentImage(`/all-images/${productId}_1(1).jpg`);
      } else if (currentImage.includes('(1)')) {
        // אם כל הניסיונות נכשלו, נשתמש בתמונת ברירת מחדל
        setCurrentImage('/images/placeholder.jpg');
      }
    } else {
      // נתחיל עם התמונה הראשונה
      setCurrentImage(`/all-images/${productId}_1.jpg`);
    }
  };

  // עדכון התמונה כאשר המוצר משתנה
  useEffect(() => {
    setCurrentImage(product.image);
    setImageError(false);
  }, [product.id, product.image]);

  return (
    <div 
      className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl relative border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-product-id={product.id}
      data-product-slug={product.slug}
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* תמונת המוצר */}
        <div className="relative pb-[75%] overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          <img 
            src={currentImage} 
            alt={product.name} 
            className={`absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            onError={handleImageError}
          />
          
          {/* סטטוס מלאי */}
          {product.inStock === false && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              אזל מהמלאי
            </div>
          )}
          
          {/* קטגוריה */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shadow-sm">
              {product.category === 'premium' ? 'פרימיום' : 
               product.category === 'professional' ? 'מקצועי' : 
               product.category === 'compact' ? 'קומפקטי' : 
               product.category === 'batteries' ? 'סוללות' :
               product.category === 'controllers' ? 'שלטים' :
               product.category === 'cameras' ? 'מצלמות' :
               'אביזרים'}
            </span>
          </div>
        </div>
        
        {/* פרטי המוצר */}
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">{product.name}</h3>
          
          <div className="mb-4">
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
          </div>
          
          {/* מפרט מקוצר */}
          <div className="space-y-2 mb-4">
            {product.specs && product.specs.slice(0, 3).map((spec, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                {index === 0 && <Camera className="h-4 w-4 text-blue-500" />}
                {index === 1 && <Battery className="h-4 w-4 text-green-500" />}
                {index === 2 && <Wifi className="h-4 w-4 text-purple-500" />}
                <span className="line-clamp-1">{spec}</span>
              </div>
            ))}
          </div>
          
          {/* מחיר וכפתור */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">מחיר</span>
              <div className="font-bold text-xl text-blue-600">{product.price}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;