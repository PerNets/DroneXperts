import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href || href === '#') return;

    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img 
                src="/images/drone-removebg-preview.png" 
                alt="Drone Icon" 
                className="h-12 w-12 object-contain blue-filter"
              />
            </div>
            <div>
              <span className="text-2xl font-bold text-gradient">DroneXperts</span>
              <span className="text-sm block text-gray-400">המומחים לרחפנים</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-8">
            <a href="#" onClick={handleNavClick} className="text-white hover:text-blue-400 transition-colors">דף הבית</a>
            <a href="#catalog" onClick={handleNavClick} className="text-white hover:text-blue-400 transition-colors">קטלוג</a>
            <a href="#about" onClick={handleNavClick} className="text-white hover:text-blue-400 transition-colors">אודות</a>
            <a href="#contact" onClick={handleNavClick} className="text-white hover:text-blue-400 transition-colors">צור קשר</a>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 bg-black/90 p-4 rounded-xl">
            <a href="#" onClick={handleNavClick} className="block py-2 text-white hover:text-blue-400 transition-colors">דף הבית</a>
            <a href="#catalog" onClick={handleNavClick} className="block py-2 text-white hover:text-blue-400 transition-colors">קטלוג</a>
            <a href="#about" onClick={handleNavClick} className="block py-2 text-white hover:text-blue-400 transition-colors">אודות</a>
            <a href="#contact" onClick={handleNavClick} className="block py-2 text-white hover:text-blue-400 transition-colors">צור קשר</a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;