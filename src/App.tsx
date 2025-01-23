import React, { useState } from 'react';
import { ChevronDown, Award, Shield, Clock, ChevronUp } from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { products, categories } from './data/products';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(3);
  const initialCount = 3;
  const incrementBy = 3;
  const whatsappNumber = '972XXXXXXXXX';
  const generalWhatsappLink = `https://wa.me/${whatsappNumber}`;

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
        
        <div className="content-layer container mx-auto px-4 text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gradient leading-tight">
              המומחים לרחפנים מקצועיים
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto">
              הטכנולוגיה המתקדמת ביותר, הניסיון העשיר ביותר, השירות הטוב ביותר
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center max-w-xl mx-auto">
              <a
                href={generalWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg text-lg"
              >
                דבר עם מומחה
              </a>
              <a
                href="#catalog"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="glass-effect px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white/20 transition-all text-lg"
              >
                לקטלוג המוצרים
                <ChevronDown className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="h-8 w-8 text-white/50" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <Award className="h-16 w-16 mx-auto mb-6 text-blue-400" />
              <h3 className="text-xl font-bold mb-4">מומחיות מוכחת</h3>
              <p className="text-gray-400">שנים של ניסיון בתחום הרחפנים המקצועיים</p>
            </div>
            <div className="text-center">
              <Shield className="h-16 w-16 mx-auto mb-6 text-blue-400" />
              <h3 className="text-xl font-bold mb-4">אחריות מלאה</h3>
              <p className="text-gray-400">שירות ותמיכה מקצועית לאורך כל הדרך</p>
            </div>
            <div className="text-center">
              <Clock className="h-16 w-16 mx-auto mb-6 text-blue-400" />
              <h3 className="text-xl font-bold mb-4">זמינות מיידית</h3>
              <p className="text-gray-400">משלוח מהיר ושירות תמיכה 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gradient">הקטלוג שלנו</h2>
          
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setDisplayCount(initialCount);
                }}
                className={`px-6 py-3 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'glass-effect text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12 flex flex-col md:flex-row gap-4 justify-center">
            {hasMore && (
              <button
                onClick={handleShowMore}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg text-lg"
              >
                תראה לי עוד!
                <ChevronDown className="h-5 w-5" />
              </button>
            )}
            {displayCount > initialCount && (
              <button
                onClick={handleShowLess}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg text-lg"
              >
                הצג פחות
                <ChevronUp className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gradient">המומחיות שלנו</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            עם ניסיון של שנים בתחום הרחפנים המקצועיים, אנחנו מביאים לכם את הטכנולוגיה המתקדמת ביותר בעולם. הצוות שלנו מורכב ממומחים מובילים בתחום, המספקים ייעוץ מקצועי והדרכה מקיפה לכל לקוח.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gradient">צור קשר</h2>
          <p className="text-xl mb-12 text-gray-300">המומחים שלנו כאן בשבילכם</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <a
              href={generalWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl flex-1 inline-flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
            >
              וואטסאפ
            </a>
            <a
              href="tel:+972XXXXXXXXX"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl flex-1 inline-flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
            >
              חייג עכשיו
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;