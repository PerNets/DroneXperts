import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle, Package, ListChecks, Home, ChevronLeft, DollarSign, Coins, Search, Loader2, RefreshCw, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronUp, ChevronDown, X, Phone } from 'lucide-react';
import { CurrencyContext } from '../App';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { extractPriceValue, formatPrice, convertPrice, Product } from '../types';
import { findProductInDataLayer, convertDataLayerProductToProduct, DataLayerProduct, getAllProductsFromDataLayer } from '../services/dataLayerService';

// תמונת ברירת מחדל למקרה שתמונה לא נטענת
const DEFAULT_IMAGE = '/images/placeholder.jpg';

const ProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const { currency, setCurrency, exchangeRate } = useContext(CurrencyContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // פונקציה לטיפול בשגיאת טעינת תמונה
  const handleImageError = (imageSrc: string) => {
    console.log(`Failed to load image: ${imageSrc}`);
    setLoadedImages(prev => ({
      ...prev,
      [imageSrc]: false
    }));
    
    // עדכון מערך התמונות התקפות
    setValidImages(prev => prev.filter(img => img !== imageSrc));
  };

  // פונקציה לטיפול בטעינת תמונה מוצלחת
  const handleImageLoad = (imageSrc: string) => {
    console.log(`Image loaded successfully: ${imageSrc}`);
    setLoadedImages(prev => ({
      ...prev,
      [imageSrc]: true
    }));
    
    // הוספת התמונה למערך התמונות התקפות אם היא עוד לא שם
    setValidImages(prev => {
      if (!prev.includes(imageSrc)) {
        return [...prev, imageSrc];
      }
      return prev;
    });
  };

  // פונקציה לקבלת התמונה הנוכחית עם טיפול בשגיאות
  const getCurrentImage = () => {
    if (validImages.length === 0) {
      return DEFAULT_IMAGE;
    }
    
    // וודא שהאינדקס הנוכחי תקף
    if (currentImageIndex >= validImages.length) {
      setCurrentImageIndex(0);
    }
    
    return validImages[currentImageIndex];
  };

  // פונקציה להחלפת מטבע
  const toggleCurrency = () => {
    setCurrency(currency === 'ILS' ? 'USD' : 'ILS');
  };

  // פונקציה לחיפוש מוצרים
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // אם החיפוש ריק, נקה את התוצאות
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // קבל את כל המוצרים מה-DataLayer
    const allProducts = getAllProductsFromDataLayer();
    
    // חפש בשם המוצר, בתיאור ובמפרט הטכני
    const results = allProducts.filter((p: Product) => {
      const searchLower = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        (p.specs && p.specs.some(spec => spec.toLowerCase().includes(searchLower)))
      );
    });

    // מיין את התוצאות לפי רלוונטיות
    results.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
      const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });

    setSearchResults(results);
    setShowSearchResults(true);
  };

  // פונקציה לניקוי החיפוש
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // טעינת המוצר מה-DataLayer
  useEffect(() => {
    console.log('ProductPage: Component mounted, slug:', productSlug);
    
    if (productSlug) {
      // ניסיון למצוא את המוצר ב-DataLayer
      const dataLayerProduct = findProductInDataLayer(undefined, productSlug);
      
      if (dataLayerProduct) {
        console.log('ProductPage: Found product in DataLayer:', {
          name: dataLayerProduct.product_display_name,
          slug: dataLayerProduct.slug,
          id: dataLayerProduct.product_id
        });
        const convertedProduct = convertDataLayerProductToProduct(dataLayerProduct);
        setProduct(convertedProduct);
        setIsLoading(false);
        
        // האזנה לעדכוני מוצרים
        const handleProductsUpdated = (event: CustomEvent) => {
          console.log('ProductPage: Received products.updated event');
          const updatedProducts = event.detail as DataLayerProduct[];
          const updatedProduct = updatedProducts.find((p: DataLayerProduct) => p.slug === productSlug);
          
          if (updatedProduct) {
            console.log('ProductPage: Found updated product:', {
              name: updatedProduct.product_display_name,
              slug: updatedProduct.slug,
              id: updatedProduct.product_id
            });
            const convertedUpdatedProduct = convertDataLayerProductToProduct(updatedProduct);
            setProduct(convertedUpdatedProduct);
          } else {
            console.log('ProductPage: Product not found in updated products');
          }
        };
        
        // הוספת מאזין לאירוע עדכון מוצרים
        document.addEventListener('products.updated', handleProductsUpdated as EventListener);
        
        // הסרת המאזין בעת ניקוי הקומפוננט
        return () => {
          console.log('ProductPage: Removing products.updated event listener');
          document.removeEventListener('products.updated', handleProductsUpdated as EventListener);
        };
      } else {
        // אם המוצר לא נמצא ב-DataLayer, מפנה לדף הבית
        console.log('ProductPage: Product not found in DataLayer, redirecting to home page');
        navigate('/');
      }
    }
  }, [productSlug, navigate]);

  // טעינת תמונות מראש ובדיקת תקפותן
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      // איפוס מערך התמונות התקפות
      setValidImages([]);
      setCurrentImageIndex(0);
      
      // טעינת כל התמונות מראש
      product.images.forEach(imageSrc => {
        const img = new Image();
        img.onload = () => {
          console.log(`Image loaded successfully: ${imageSrc}`);
          handleImageLoad(imageSrc);
        };
        img.onerror = () => {
          console.log(`Failed to load image: ${imageSrc}`);
          handleImageError(imageSrc);
          
          // אם התמונה נכשלה בטעינה, ננסה לטעון אותה בפורמט אחר
          const basePath = imageSrc.substring(0, imageSrc.lastIndexOf('.'));
          
          // ננסה פורמטים אחרים
          if (imageSrc.endsWith('.jpg')) {
            tryLoadImage(`${basePath}.png`);
            tryLoadImage(`${basePath}.webp`);
          } else if (imageSrc.endsWith('.png')) {
            tryLoadImage(`${basePath}.jpg`);
            tryLoadImage(`${basePath}.webp`);
          } else if (imageSrc.endsWith('.webp')) {
            tryLoadImage(`${basePath}.jpg`);
            tryLoadImage(`${basePath}.png`);
          }
          
          // ננסה גם תמונות עם סוגריים
          if (imageSrc.includes('_')) {
            const parts = imageSrc.split('.');
            const ext = parts.pop();
            const base = parts.join('.');
            if (ext) {
              tryLoadImage(`${base}(1).${ext}`);
            }
          }
        };
        img.src = imageSrc;
      });
      
      // ננסה גם לטעון תמונות ישירות מתיקיית all-images
      if (product.id) {
        const productId = product.id;
        const fileExtensions = ['.jpg', '.png', '.webp'];
        
        for (let i = 1; i <= 4; i++) {
          fileExtensions.forEach(ext => {
            const imagePath = `/all-images/${productId}_${i}${ext}`;
            if (!product.images?.includes(imagePath)) {
              tryLoadImage(imagePath);
            }
            
            // ננסה גם תמונות עם סוגריים
            const imagePathWithBrackets = `/all-images/${productId}_${i}(1)${ext}`;
            if (!product.images?.includes(imagePathWithBrackets)) {
              tryLoadImage(imagePathWithBrackets);
            }
          });
        }
      }
    }
  }, [product]);

  // פונקציה לניסיון טעינת תמונה בפורמט אחר
  const tryLoadImage = (imageSrc: string) => {
    const img = new Image();
    img.onload = () => {
      console.log(`Alternative format loaded successfully: ${imageSrc}`);
      handleImageLoad(imageSrc);
    };
    img.onerror = () => {
      console.log(`Failed to load alternative format: ${imageSrc}`);
    };
    img.src = imageSrc;
  };

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <p className="mt-4 text-gray-600">טוען מוצר...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // פונקציה למעבר לתמונה הבאה
  const nextImage = () => {
    if (validImages.length > 1) {
      setCurrentImageIndex(prevIndex => 
        prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // פונקציה למעבר לתמונה הקודמת
  const prevImage = () => {
    if (validImages.length > 1) {
      setCurrentImageIndex(prevIndex => 
        prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
      );
    }
  };

  // פונקציה לבחירת תמונה ספציפית
  const selectImage = (image: string, index: number) => {
    setCurrentImageIndex(index);
  };

  // חישוב המחיר בהתאם למטבע הנבחר
  const priceValue = extractPriceValue(product.price);
  const priceInUSD = product.priceUSD 
    ? extractPriceValue(product.priceUSD) 
    : convertPrice(priceValue, 'ILS', 'USD', exchangeRate);
  
  const displayPrice = currency === 'ILS' 
    ? formatPrice(priceValue, 'ILS')
    : formatPrice(priceInUSD, 'USD');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-8">
        {/* ניווט */}
        <div className="flex items-center text-sm text-gray-600 mb-6 bg-white rounded-xl shadow-sm p-4">
          <Link to="/" className="flex items-center hover:text-blue-600 transition-colors">
            <Home className="h-4 w-4 ml-2" />
            דף הבית
          </Link>
          <ChevronLeft className="h-4 w-4 mx-2" />
          <span className="font-medium text-gray-800">{product.name}</span>
        </div>

        {/* פרטי המוצר */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* תמונת המוצר */}
            <div className="flex flex-col">
              <div className="relative aspect-w-1 aspect-h-1 bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden mb-4 border border-gray-100">
                {validImages.length > 0 ? (
                  <img
                    src={getCurrentImage()}
                    alt={product.name}
                    className="object-contain w-full h-full cursor-zoom-in p-4"
                    onClick={() => setIsImageModalOpen(true)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">אין תמונות זמינות למוצר זה</p>
                  </div>
                )}
                
                {validImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors focus:outline-none"
                    >
                      <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors focus:outline-none"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                    </button>
                  </>
                )}
              </div>
              
              {/* תמונות ממוזערות */}
              {validImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {validImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-blue-300'
                      } cursor-pointer bg-gradient-to-br from-gray-50 to-white`}
                      onClick={() => selectImage(image, index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - תמונה ${index + 1}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* פרטי המוצר */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{product.description}</p>
              
              {/* מחיר ומלאי */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-blue-600">{displayPrice}</span>
                    <button
                      onClick={toggleCurrency}
                      className="inline-flex items-center px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      title="החלף מטבע"
                    >
                      {currency === 'ILS' ? (
                        <>
                          <DollarSign className="h-4 w-4 ml-2" />
                          <span>USD</span>
                        </>
                      ) : (
                        <>
                          <Coins className="h-4 w-4 ml-2" />
                          <span>ILS</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {product.inStock ? 'במלאי' : 'אזל מהמלאי'}
                  </div>
                </div>
              </div>
              
              {/* מפרט טכני */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-center mb-4">
                  <ListChecks className="h-6 w-6 text-blue-600 ml-2" />
                  <h2 className="text-xl font-bold text-gray-900">מפרט טכני</h2>
                </div>
                <div className={`space-y-3 ${isSpecsExpanded ? '' : 'max-h-48 overflow-hidden'}`}>
                  {product.specs && product.specs.length > 0 ? (
                    <ul className="space-y-2">
                      {product.specs.map((spec, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">אין מפרט טכני זמין</p>
                  )}
                </div>
                {product.specs && product.specs.length > 3 && (
                  <button
                    onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
                    className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none inline-flex items-center"
                  >
                    {isSpecsExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 ml-1" />
                        הצג פחות
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 ml-1" />
                        הצג עוד
                      </>
                    )}
                  </button>
                )}
              </div>
              
              {/* תכולת האריזה */}
              {product.includes && product.includes.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <Package className="h-6 w-6 text-blue-600 ml-2" />
                    <h2 className="text-xl font-bold text-gray-900">תכולת האריזה</h2>
                  </div>
                  <ul className="space-y-2">
                    {product.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* כפתור יצירת קשר */}
              <a
                href="https://wa.me/972542323232?text=היי,%20אני%20מעוניין%20לקבל%20פרטים%20על%20המוצר"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
              >
                <div className="flex items-center justify-center text-lg font-medium">
                  <MessageCircle className="h-6 w-6 ml-2" />
                  <span>צור קשר לקבלת פרטים</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* חיפוש מוצרים נוספים */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">חיפוש מוצרים נוספים</h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }} className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="חפש מוצרים..."
                  className="w-full px-6 py-4 pl-14 pr-16 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white text-lg text-gray-900 placeholder:text-gray-400"
                  dir="rtl"
                />
                <Search className="absolute right-6 text-gray-400 h-6 w-6 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute left-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* תוצאות חיפוש */}
        {showSearchResults && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">תוצאות חיפוש</h2>
              <span className="text-sm text-gray-500">נמצאו {searchResults.length} תוצאות</span>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100"
                    onClick={clearSearch}
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain w-full h-full p-4 transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 text-gray-900">{product.name}</h3>
                      <p className="text-blue-600 font-bold">{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mb-6">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg mb-2">לא מצאנו את מה שאתם מחפשים</p>
                  <p className="text-gray-500">אבל שווה לבדוק איתנו בטלפון או בווטסאפ אם יש לנו את מה שאתם צריכים</p>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://wa.me/972542323232?text=היי,%20אני%20מחפש%20את%20המוצר:%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-md"
                  >
                    <MessageCircle className="h-5 w-5 ml-2" />
                    צור קשר בווטסאפ
                  </a>
                  
                  <a
                    href="tel:+972542323232"
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-md"
                  >
                    <Phone className="h-5 w-5 ml-2" />
                    חייג עכשיו
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
      
      {/* מודל תמונה מוגדלת */}
      {isImageModalOpen && validImages.length > 0 && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors focus:outline-none"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="relative">
              <img
                src={getCurrentImage()}
                alt={product.name}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              {validImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-colors focus:outline-none"
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-colors focus:outline-none"
                  >
                    <ChevronRightIcon className="h-6 w-6 text-white" />
                  </button>
                </>
              )}
            </div>
            
            {validImages.length > 1 && (
              <div className="absolute -bottom-12 inset-x-0 flex justify-center gap-2">
                {validImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage; 