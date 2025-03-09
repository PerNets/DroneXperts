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
              {currency === 'USD' && product.priceUSD ? (
                <ProductPrice priceUSD={product.priceUSD} />
              ) : (
                <div className="font-bold text-xl text-blue-600">{displayPrice}</div>
              )}
            </div>
            
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              פרטים נוספים
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;