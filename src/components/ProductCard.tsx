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
  const [currentImage, setCurrentImage] = useState<string>(product.image || '/images/placeholder.jpg');
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
    setCurrentImage(product.image || '/images/placeholder.jpg');
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
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
          
          {/* מחיר */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-blue-600">
              {displayPrice}
            </div>
            
            {/* כפתור יצירת קשר */}
            <a
              href={`https://wa.me/972542323232?text=היי,%20אני%20מעוניין%20לקבל%20פרטים%20על%20המוצר:%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              <span>צור קשר</span>
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;