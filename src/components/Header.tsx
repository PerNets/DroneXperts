import React, { useState, useEffect } from 'react';
import { Menu, X, Home, ShoppingBag, Info, Phone } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('#');
  const location = useLocation();
  const navigate = useNavigate();
  const isProductPage = location.pathname.includes('/product/');

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active menu item based on scroll position
      const sections = ['#', '#catalog', '#about', '#contact'];
      for (const section of sections) {
        if (section === '#') continue;
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveItem(section);
            return;
          }
        }
      }
      // If no section is active or we're at the top, set home as active
      if (window.scrollY < 100) {
        setActiveItem('#');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = document.querySelector('.mobile-menu-content');
      const menuButton = document.querySelector('.mobile-menu-button');
      const target = event.target as Node;

      // אם לחצו על הכפתור או על התפריט - לא עושים כלום
      if (menuButton?.contains(target) || menuElement?.contains(target)) {
        return;
      }
      
      // אם התפריט פתוח ולחצו מחוץ - סוגרים אותו
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // מוסיפים את ה-event listener רק אם התפריט פתוח
    if (isMenuOpen) {
      // נחכה רגע קט לפני הוספת ה-listener כדי למנוע סגירה מיידית
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    
    if (href) {
      setActiveItem(href);
      
      if (href === '#') {
        if (isProductPage) {
          navigate('/');
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        if (isProductPage) {
          // Navigate to home page with the section ID
          navigate('/', { state: { scrollTo: href.substring(1) } });
        } else {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
    
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled 
          ? 'bg-gradient-to-b from-black/95 to-black/90 shadow-md py-1.5' 
          : 'bg-gradient-to-b from-black/90 to-black/85 py-2'
      }`}
    >
      <div className="container mx-auto relative">
        <nav className="px-3">
          <div className="flex flex-row-reverse justify-between items-center relative z-50">
            {/* Logo positioned on the right for RTL layout */}
            <div className="flex items-center">
              <a 
                href="#" 
                onClick={(e) => handleNavClick(e)} 
                className="flex-shrink-0 transition-all hover:scale-105 duration-300 relative group"
                aria-label="דף הבית"
              >
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 rounded-full transition-all duration-300"></div>
                <img 
                  src="/all-images/DronExpers-Logo.png" 
                  alt="DroneXperts Logo" 
                  className={`object-contain transition-all duration-300 ${
                    scrolled ? 'h-10 w-auto' : 'h-11 w-auto'
                  }`}
                />
              </a>
            </div>
            
            {/* Enhanced Desktop Navigation Menu */}
            <div className="hidden md:block">
              <div className="flex items-center gap-1.5">
                <NavItem 
                  href="#contact" 
                  label="צור קשר" 
                  icon={<Phone size={16} />} 
                  isActive={activeItem === '#contact'} 
                  onClick={handleNavClick} 
                />
                <NavItem 
                  href="#about" 
                  label="אודות" 
                  icon={<Info size={16} />} 
                  isActive={activeItem === '#about'} 
                  onClick={handleNavClick} 
                />
                <NavItem 
                  href="#catalog" 
                  label="קטלוג" 
                  icon={<ShoppingBag size={16} />} 
                  isActive={activeItem === '#catalog'} 
                  onClick={handleNavClick} 
                />
                <NavItem 
                  href="#" 
                  label="דף הבית" 
                  icon={<Home size={16} />} 
                  isActive={activeItem === '#'} 
                  onClick={handleNavClick} 
                />
              </div>
            </div>

            {/* Enhanced Mobile menu button on the left for RTL layout */}
            <button 
              className={`mobile-menu-button md:hidden flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 ${
                isMenuOpen 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-blue-500/20 text-white hover:bg-blue-500/40 active:bg-blue-500/50'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X size={22} strokeWidth={2.5} className="transition-all duration-300" />
                ) : (
                  <Menu size={22} strokeWidth={2} className="transition-all duration-300" />
                )}
                <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400 ${isMenuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></span>
              </div>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
      
      {/* Enhanced Mobile Menu with Animation - positioned below the header */}
      <div 
        className={`md:hidden fixed inset-x-0 bottom-0 top-[60px] bg-black/80 backdrop-blur-lg transition-all duration-300 z-40 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className={`mobile-menu-content mx-4 bg-gradient-to-b from-blue-900/90 to-black/95 p-4 rounded-lg shadow-xl border border-blue-500/20 transition-all duration-300 transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-3 py-2">
            <a 
              href="#" 
              onClick={handleNavClick} 
              className="flex items-center gap-3 py-2.5 px-4 text-white hover:text-blue-300 bg-white/5 hover:bg-blue-500/20 rounded-md transition-all text-base font-medium"
            >
              <Home size={18} className="text-blue-400" />
              <span>דף הבית</span>
            </a>
            <a 
              href="#catalog" 
              onClick={handleNavClick} 
              className="flex items-center gap-3 py-2.5 px-4 text-white hover:text-blue-300 bg-white/5 hover:bg-blue-500/20 rounded-md transition-all text-base font-medium"
            >
              <ShoppingBag size={18} className="text-blue-400" />
              <span>קטלוג</span>
            </a>
            <a 
              href="#about" 
              onClick={handleNavClick} 
              className="flex items-center gap-3 py-2.5 px-4 text-white hover:text-blue-300 bg-white/5 hover:bg-blue-500/20 rounded-md transition-all text-base font-medium"
            >
              <Info size={18} className="text-blue-400" />
              <span>אודות</span>
            </a>
            <a 
              href="#contact" 
              onClick={handleNavClick} 
              className="flex items-center gap-3 py-2.5 px-4 text-white hover:text-blue-300 bg-white/5 hover:bg-blue-500/20 rounded-md transition-all text-base font-medium"
            >
              <Phone size={18} className="text-blue-400" />
              <span>צור קשר</span>
            </a>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-500/20 text-center">
            <p className="text-sm text-blue-300/80">DroneXperts - המומחים לרחפנים מקצועיים</p>
          </div>
        </div>
      </div>
    </header>
  );
};

// NavItem component for desktop navigation
interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon, isActive, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative flex items-center gap-1.5 px-4 py-2 rounded-md transition-all duration-300 text-base font-medium ${
        isActive
          ? 'text-blue-400 bg-blue-500/10'
          : 'text-white/90 hover:text-blue-300 hover:bg-white/5'
      }`}
    >
      <span className="flex items-center justify-center">{icon}</span>
      <span>{label}</span>
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full transform scale-x-100 origin-right transition-transform duration-300"></span>
      )}
    </a>
  );
};

export default Header;