import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Award, Shield, Clock, ChevronUp, Phone, MessageCircle, DollarSign, Coins, Search, X, Loader2, RefreshCw } from 'lucide-react';
import { products, categories } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryFilter from '../components/CategoryFilter';
import { CurrencyContext } from '../App';
import { extractPriceValue, formatPrice, convertPrice } from '../types';

const HomePage: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const { currency, setCurrency, exchangeRate, isLoading } = useContext(CurrencyContext);
  
  const initialCount = 3;
  const incrementBy = 3;
  const whatsappNumber = '972548943395';
  const generalWhatsappLink = `https://wa.me/${whatsappNumber}`;
  const phoneNumber = '0548943395';

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
        (product.specs && product.specs.some(spec => spec.toLowerCase().includes(query)))
      );
    });

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const handleShowMore = () => {
    setDisplayCount(prev => Math.min(prev + incrementBy, filteredProducts.length));
  };

  const handleShowLess = () => {
    setDisplayCount(initialCount);
    // גלילה חזרה לתחילת הקטלוג
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'ILS' ? 'USD' : 'ILS');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setDisplayCount(initialCount); // איפוס מספר המוצרים המוצגים בעת חיפוש
  };

  const clearSearch = () => {
    setSearchQuery('');
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
                <MessageCircle className="h-5 w-5" />
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
              onClick={toggleCurrency}
              className={`relative overflow-hidden rounded-xl flex items-center gap-2 transition-all duration-300 ${
                isLoading 
                  ? 'bg-gray-700 text-gray-300 cursor-wait' 
                  : currency === 'ILS'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
              } px-5 py-3 shadow-lg mb-2`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>טוען שער חליפין...</span>
                </>
              ) : currency === 'ILS' ? (
                <>
                  <DollarSign className="h-5 w-5" />
                  <span>הצג מחירים בדולר</span>
                </>
              ) : (
                <>
                  <Coins className="h-5 w-5" />
                  <span>הצג מחירים בשקלים</span>
                </>
              )}
            </button>
            
            {/* Exchange Rate Info */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
              <span>שער חליפין עדכני:</span>
              <span className="text-blue-400 font-medium">₪{exchangeRate.toFixed(2)} = $1</span>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedProducts.map(product => {
                // Extract price values for conversion
                const priceValueILS = extractPriceValue(product.price);
                
                // Use the direct USD price from the product data if available, otherwise calculate it
                const priceValueUSD = product.priceUSD 
                  ? extractPriceValue(product.priceUSD) 
                  : convertPrice(priceValueILS, 'ILS', 'USD', exchangeRate);
                
                // Format prices with currency symbols
                const formattedPriceILS = formatPrice(priceValueILS, 'ILS');
                const formattedPriceUSD = product.priceUSD || formatPrice(priceValueUSD, 'USD');
                
                return (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.slug}`}
                    className="glass-effect rounded-2xl overflow-hidden card-hover transform transition-all hover:scale-[1.02]"
                  >
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 md:h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gradient line-clamp-1">{product.name}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-2 text-sm md:text-base">{product.description}</p>
                      
                      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                        {product.specs.slice(0, 3).map((spec, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                            <span className="line-clamp-1">{spec}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-right">
                          <div className="text-xl md:text-2xl font-bold text-blue-400 bg-blue-900/20 px-3 py-1 rounded-lg">
                            {currency === 'ILS' ? formattedPriceILS : formattedPriceUSD}
                          </div>
                        </div>
                        <span className="glass-effect px-3 py-1 rounded-lg text-xs md:text-sm text-gray-300">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="text-center mt-12 flex flex-col md:flex-row gap-4 justify-center">
              {hasMore && (
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
              <MessageCircle className="h-5 w-5" />
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