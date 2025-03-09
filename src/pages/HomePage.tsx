import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Award, Shield, Clock, ChevronUp, Phone, MessageCircle, DollarSign, Coins, Search, X, Loader2, RefreshCw } from 'lucide-react';
import { categories } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { CurrencyContext } from '../App';
import { extractPriceValue, formatPrice, convertPrice } from '../types';
import { getAllProductsFromDataLayer } from '../services/dataLayerService';
import { hideProductsNotInDataLayer } from '../services/productCleaner';
import { setupProductAdder } from '../services/productAdder';

const HomePage: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const { currency, setCurrency, exchangeRate } = useContext(CurrencyContext);
  const [products, setProducts] = useState<any[]>([]);
  const [dataLayerLoaded, setDataLayerLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const initialCount = 3;
  const incrementBy = 3;
  const whatsappNumber = '972548943395';
  const generalWhatsappLink = `https://wa.me/${whatsappNumber}`;
  const phoneNumber = '0548943395';

  // טעינת מוצרים מה-DataLayer
  useEffect(() => {
    const loadProductsFromDataLayer = () => {
      setIsLoading(true);
      try {
        const dataLayerProducts = getAllProductsFromDataLayer();
        
        if (dataLayerProducts && dataLayerProducts.length > 0) {
          console.log(`נטענו ${dataLayerProducts.length} מוצרים מה-DataLayer`);
          
          // בדיקה שלכל מוצר יש תמונה תקפה
          const productsWithImages = dataLayerProducts.map(product => {
            // אם אין תמונה למוצר, ננסה למצוא תמונה מתאימה
            if (!product.image || product.image === '/images/placeholder.jpg') {
              const productId = product.id;
              // בדיקת קיום תמונות בפורמטים שונים
              const fileExtensions = ['.jpg', '.png', '.webp'];
              for (let i = 1; i <= 4; i++) {
                for (const ext of fileExtensions) {
                  const imagePath = `/all-images/${productId}_${i}${ext}`;
                  // אם מצאנו תמונה, נעדכן את המוצר
                  const img = new Image();
                  img.src = imagePath;
                  img.onload = () => {
                    // עדכון התמונה במוצר
                    product.image = imagePath;
                    // עדכון המוצרים בדף
                    setProducts(prevProducts => {
                      const updatedProducts = [...prevProducts];
                      const index = updatedProducts.findIndex(p => p.id === product.id);
                      if (index !== -1) {
                        updatedProducts[index] = { ...updatedProducts[index], image: imagePath };
                      }
                      return updatedProducts;
                    });
                  };
                }
              }
            }
            return product;
          });
          
          setProducts(productsWithImages);
          setDataLayerLoaded(true);
          
          // הפעלת מנגנון הוספת מוצרים חדשים
          setupProductAdder(productsWithImages, setProducts);
        } else {
          console.log('לא נמצאו מוצרים ב-DataLayer');
          // אם אין מוצרים ב-DataLayer, נשאיר מערך ריק
          setProducts([]);
        }
      } catch (error) {
        console.error('שגיאה בטעינת מוצרים מה-DataLayer:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // נסה לטעון מוצרים מה-DataLayer
    loadProductsFromDataLayer();
    
    // הגדר האזנה לאירועי GTM
    const handleGtmEvent = () => {
      loadProductsFromDataLayer();
    };
    
    document.addEventListener('gtm.dom', handleGtmEvent);
    document.addEventListener('gtm.load', handleGtmEvent);
    
    return () => {
      document.removeEventListener('gtm.dom', handleGtmEvent);
      document.removeEventListener('gtm.load', handleGtmEvent);
    };
  }, []);

  // Check for search query in URL when component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
      // Show more results when coming from a search link
      setDisplayCount(6);
    }
  }, [location.search]);

  // פילטור מוצרים לפי קטגוריה וחיפוש
  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .filter(product => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.specs && product.specs.some((spec: string) => spec.toLowerCase().includes(query)))
      );
    });

  // מוצרים להצגה לפי מספר התצוגה הנוכחי
  const displayedProducts = filteredProducts.slice(0, displayCount);

  // פונקציה להצגת עוד מוצרים
  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + incrementBy);
  };

  // פונקציה להצגת פחות מוצרים
  const handleShowLess = () => {
    setDisplayCount(initialCount);
  };

  // פונקציה להחלפת מטבע
  const toggleCurrency = () => {
    setCurrency(currency === 'ILS' ? 'USD' : 'ILS');
  };

  // פונקציה לטיפול בשינוי בשדה החיפוש
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // פונקציה לניקוי החיפוש
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Products grid section
  const renderProductsGrid = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-200">טוען מוצרים...</span>
        </div>
      );
    }
    
    if (displayedProducts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">לא נמצאו מוצרים להצגה</p>
          {searchQuery && (
            <p className="text-gray-500 mt-2">
              נסה לחפש מונח אחר או <button onClick={clearSearch} className="text-blue-500 hover:underline">נקה את החיפוש</button>
            </p>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map(product => (
          <div key={product.id} className="product-card" data-product-id={product.id} data-product-slug={product.slug}>
            <ProductCard product={product} />
            {product.inStock === false && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                אזל מהמלאי
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32">
        <video 
          className="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
        >
          <source src="/images/vidrone.mp4" type="video/mp4" />
        </video>
        <div className="gradient-overlay" />
        
        <div className="content-layer container mx-auto px-4 py-8 md:py-16">
          <div className="hero-text-container">
            <h1 className="hero-title font-heebo font-bold text-gradient">
              המומחים לרחפנים מקצועיים
            </h1>
            <p className="hero-subtitle font-heebo text-gray-100">
              מגוון רחפנים מתקדמים, דגמים נדירים שלא תמצאו בכל מקום, ובמחירים הכי טובים
            </p>
            <div className="hero-buttons">
              <a
                href={generalWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button rounded-xl inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                דברו איתנו
              </a>
              <a
                href="#catalog"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="catalog-button rounded-xl inline-flex items-center justify-center gap-2"
              >
                לקטלוג המוצרים
                <ChevronDown className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/50" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center bg-gray-900/30 p-6 rounded-xl backdrop-blur-sm hover:bg-gray-900/50 transition-all">
              <Award className="h-12 md:h-16 w-12 md:w-16 mx-auto mb-4 md:mb-6 text-blue-400" />
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gradient">מומחיות מוכחת</h3>
              <p className="text-gray-400">שנים של ניסיון בתחום הרחפנים המקצועיים</p>
            </div>
            <div className="text-center bg-gray-900/30 p-6 rounded-xl backdrop-blur-sm hover:bg-gray-900/50 transition-all">
              <Shield className="h-12 md:h-16 w-12 md:w-16 mx-auto mb-4 md:mb-6 text-blue-400" />
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gradient">אחריות מלאה</h3>
              <p className="text-gray-400">שירות ותמיכה מקצועית לאורך כל הדרך</p>
            </div>
            <div className="text-center bg-gray-900/30 p-6 rounded-xl backdrop-blur-sm hover:bg-gray-900/50 transition-all">
              <Clock className="h-12 md:h-16 w-12 md:w-16 mx-auto mb-4 md:mb-6 text-blue-400" />
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gradient">זמינות מיידית</h3>
              <p className="text-gray-400">משלוח מהיר ושירות תמיכה 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gradient">הקטלוג שלנו</h2>
          
          {/* Search Box */}
          <div className="max-w-md mx-auto mb-8 md:mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="חפש מוצרים..."
                className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-xl px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent glass-effect"
                dir="rtl"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-gray-400 mt-2 text-center">
                {filteredProducts.length === 0 
                  ? 'לא נמצאו תוצאות' 
                  : `נמצאו ${filteredProducts.length} תוצאות`}
              </p>
            )}
          </div>
          
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(categoryId) => {
              setSelectedCategory(categoryId);
              setDisplayCount(initialCount);
            }}
          />
          
          {/* Currency Toggle Button */}
          <div className="flex flex-col items-center mb-8">
            <button
              onClick={() => window.location.href = `tel:972548943395`}
              className="relative overflow-hidden rounded-xl flex items-center gap-3 transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 px-6 py-4 shadow-lg mb-2 font-bold text-lg"
            >
              <div className="bg-white/20 p-2 rounded-full">
                <Phone className="h-6 w-6" />
              </div>
              <span>דברו איתנו</span>
            </button>
          </div>

          {filteredProducts.length === 0 && searchQuery ? (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-400">לא נמצאו מוצרים התואמים את החיפוש</p>
              <button
                onClick={clearSearch}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
              >
                נקה חיפוש
              </button>
            </div>
          ) : (
            renderProductsGrid()
          )}

          {filteredProducts.length > 0 && (
            <div className="text-center mt-12 flex flex-col md:flex-row gap-4 justify-center">
              {displayCount < filteredProducts.length && (
                <button
                  onClick={handleShowMore}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg text-base md:text-lg"
                >
                  תראה לי עוד!
                  <ChevronDown className="h-5 w-5" />
                </button>
              )}
              {displayCount > initialCount && (
                <button
                  onClick={handleShowLess}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg text-base md:text-lg"
                >
                  הצג פחות
                  <ChevronUp className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gradient">המומחיות שלנו</h2>
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            עם ניסיון של שנים בתחום הרחפנים המקצועיים, אנחנו מביאים לכם את הטכנולוגיה המתקדמת ביותר בעולם. הצוות שלנו מורכב ממומחים מובילים בתחום, המספקים ייעוץ מקצועי והדרכה מקיפה לכל לקוח.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gradient">צור קשר</h2>
          <p className="text-lg md:text-xl mb-8 md:mb-12 text-gray-300">המומחים שלנו כאן בשבילכם</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center max-w-2xl mx-auto">
            <a
              href={generalWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl flex-1 inline-flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              התייעצות עם נציג
            </a>
            <a
              href={`tel:+${phoneNumber}`}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl flex-1 inline-flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
            >
              <Phone className="h-5 w-5" />
              חייגו עכשיו
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage; 