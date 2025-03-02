import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Package, ListChecks, Home, ChevronLeft, DollarSign, Coins, Search, Loader2, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import { CurrencyContext } from '../App';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { extractPriceValue, formatPrice, convertPrice } from '../types';

const ProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { currency, setCurrency, exchangeRate, isLoading } = useContext(CurrencyContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const product = products.find(p => p.slug === productSlug);
  
  const whatsappNumber = '972548943395';
  const message = product 
    ? encodeURIComponent(`היי, אני מעוניין לשמוע יותר על ${product.name}`) 
    : encodeURIComponent('היי, אני מעוניין לקבל מידע על המוצרים שלכם');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'ILS' ? 'USD' : 'ILS');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const results = products.filter(product => {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.specs && product.specs.some(spec => spec.toLowerCase().includes(query)))
      );
    });
    
    setSearchResults(results);
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      document.title = `${product.name}`;
    } else {
      document.title = 'מוצר לא נמצא';
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-8 text-gradient">המוצר לא נמצא</h1>
          <p className="text-xl mb-12 text-gray-300">המוצר שחיפשת אינו קיים או הוסר מהקטלוג</p>
          <Link 
            to="/" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg text-lg"
          >
            <Home className="h-5 w-5" />
            חזרה לדף הבית
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Extract price values for conversion
  const priceValueILS = extractPriceValue(product.price);
  
  // Calculate USD price based on current exchange rate
  const priceValueUSD = convertPrice(priceValueILS, 'ILS', 'USD', exchangeRate);
  
  // Format prices with currency symbols
  const formattedPriceILS = formatPrice(priceValueILS, 'ILS');
  const formattedPriceUSD = formatPrice(priceValueUSD, 'USD');

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Breadcrumbs */}
        <div className="mb-6 md:mb-8 flex items-center gap-2 text-gray-400 text-sm md:text-base overflow-x-auto pb-2 whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="h-4 w-4" />
            דף הבית
          </Link>
          <ChevronLeft className="h-4 w-4" />
          <Link to="/#catalog" className="hover:text-white transition-colors">
            קטלוג
          </Link>
          <ChevronLeft className="h-4 w-4" />
          <span className="text-white truncate max-w-[150px] md:max-w-none">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-gradient leading-tight">{product.name}</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-4 md:mb-8 leading-relaxed">{product.description}</p>
            
            {/* Price and Currency Section */}
            <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              {/* Price Display */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">מחיר</div>
                  <div className="text-4xl md:text-5xl font-bold text-blue-400">
                    {currency === 'ILS' ? formattedPriceILS : formattedPriceUSD}
                  </div>
                </div>
                
                {/* Currency Toggle Button */}
                <button
                  onClick={toggleCurrency}
                  className={`relative overflow-hidden rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    isLoading 
                      ? 'bg-gray-700 text-gray-300 cursor-wait' 
                      : currency === 'ILS'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                        : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                  } px-5 py-3 shadow-lg`}
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
                      <span>הצג מחיר בדולר</span>
                    </>
                  ) : (
                    <>
                      <Coins className="h-5 w-5" />
                      <span>הצג מחיר בשקלים</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/10 rounded-xl scale-0 transition-transform duration-300 origin-center group-hover:scale-100"></div>
                </button>
              </div>
              
              {/* Exchange Rate Info */}
              <div className="flex items-center gap-2 text-gray-400 text-sm border-t border-gray-700/50 pt-4">
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
                {currency === 'ILS' ? (
                  <div className="flex flex-wrap items-center gap-1">
                    <span>שער חליפין עדכני:</span>
                    <span className="text-blue-400 font-medium">₪{exchangeRate.toFixed(2)} = $1</span>
                    <span className="mx-1">•</span>
                    <span>מחיר בדולר:</span>
                    <span className="text-blue-400 font-medium">{formattedPriceUSD}</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-1">
                    <span>שער חליפין עדכני:</span>
                    <span className="text-blue-400 font-medium">₪{exchangeRate.toFixed(2)} = $1</span>
                    <span className="mx-1">•</span>
                    <span>מחיר בשקלים:</span>
                    <span className="text-blue-400 font-medium">{formattedPriceILS}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-8 mb-8 md:mb-12">
              {/* מפרט */}
              <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 text-gradient">
                  <ListChecks className="h-6 w-6 text-blue-400" />
                  מפרט טכני
                </h3>
                <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-3 text-base md:text-lg">
                      <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* תכולת החבילה */}
              {product.includes && (
                <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 text-gradient">
                    <Package className="h-6 w-6 text-blue-400" />
                    תכולת החבילה
                  </h3>
                  <ul className="space-y-3">
                    {product.includes.map((item, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-3 text-base md:text-lg">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg text-lg flex-1"
              >
                <MessageCircle className="h-5 w-5" />
                דברו איתנו
              </a>
              <Link
                to="/"
                className="glass-effect px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all text-lg flex-1"
              >
                <ArrowRight className="h-5 w-5" />
                חזרה לקטלוג
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-gradient">מוצרים דומים</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {relatedProducts.map(relatedProduct => {
              // Extract price values for related products
              const relatedPriceILS = extractPriceValue(relatedProduct.price);
              const relatedPriceUSD = convertPrice(relatedPriceILS, 'ILS', 'USD', exchangeRate);
              
              return (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.slug}`}
                  className="glass-effect rounded-2xl overflow-hidden card-hover transform transition-all hover:scale-[1.02]"
                >
                  <div className="relative">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-48 md:h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gradient line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2 text-sm md:text-base">{relatedProduct.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-right">
                        <div className="text-xl md:text-2xl font-bold text-blue-400">
                          {currency === 'ILS' 
                            ? formatPrice(relatedPriceILS, 'ILS')
                            : formatPrice(relatedPriceUSD, 'USD')
                          }
                        </div>
                      </div>
                      <span className="glass-effect px-3 py-1 rounded-lg text-xs md:text-sm text-gray-300">
                        {relatedProduct.category}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Search Section */}
        <div className="mt-16 md:mt-24 bg-gray-900/30 p-6 md:p-8 rounded-2xl backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">חיפוש מוצרים</h2>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חפש מוצרים נוספים..."
                className="w-full bg-gray-800/50 text-white border border-gray-700 rounded-xl px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent glass-effect"
                dir="rtl"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="absolute inset-y-0 left-0 px-4 flex items-center bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition-all"
              >
                חפש
              </button>
            </div>
          </form>
          
          {showSearchResults && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">תוצאות חיפוש</h3>
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  נקה חיפוש
                </button>
              </div>
              
              {searchResults.length === 0 ? (
                <p className="text-gray-400 text-center py-8">לא נמצאו תוצאות עבור "{searchQuery}"</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.slice(0, 6).map(result => {
                    // Extract price values for search results
                    const resultPriceILS = extractPriceValue(result.price);
                    const resultPriceUSD = convertPrice(resultPriceILS, 'ILS', 'USD', exchangeRate);
                    
                    return (
                      <Link 
                        key={result.id} 
                        to={`/product/${result.slug}`}
                        className="glass-effect rounded-xl overflow-hidden flex items-center gap-4 p-3 hover:bg-white/10 transition-all"
                        onClick={() => {
                          if (result.slug === productSlug) {
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        <img 
                          src={result.image} 
                          alt={result.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-bold text-gradient line-clamp-1">{result.name}</h4>
                          <p className="text-sm text-gray-400 line-clamp-1">{result.category}</p>
                          <p className="text-blue-400 font-bold">
                            {currency === 'ILS' 
                              ? formatPrice(resultPriceILS, 'ILS')
                              : formatPrice(resultPriceUSD, 'USD')
                            }
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
              
              {searchResults.length > 6 && (
                <div className="text-center mt-6">
                  <Link 
                    to={`/?search=${encodeURIComponent(searchQuery)}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all inline-block"
                  >
                    הצג את כל {searchResults.length} התוצאות
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductPage; 