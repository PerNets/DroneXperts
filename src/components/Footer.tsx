import React from 'react';
import { MessageCircle, Phone, ChevronRight, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = '972548943395';
  const phoneNumber = '0548943395';
  const generalWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('היי, אני מעוניין לשמוע יותר על המוצרים שלכם')}`;

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black py-20">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600"></div>
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-6 text-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo & About - Now centered */}
          <div className="md:col-span-5">
            <div className="mb-6 flex justify-center">
              <img 
                src="/images/image-removebg-preview.png" 
                alt="DroneXperts Logo" 
                className="h-32 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              המומחים לרחפנים מקצועיים בישראל. אנו מספקים את הטכנולוגיה המתקדמת ביותר בתחום הרחפנים, עם דגש על איכות, שירות ומקצועיות.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gradient-to-br from-purple-600 to-pink-500 hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition-all">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold mb-6 text-gradient relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-500">
              קישורים מהירים
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  דף הבית
                </a>
              </li>
              <li>
                <a 
                  href="/#catalog"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  קטלוג מוצרים
                </a>
              </li>
              <li>
                <a 
                  href="/#about"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  אודות
                </a>
              </li>
              <li>
                <a 
                  href="/#contact"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  צור קשר
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold mb-6 text-gradient relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-500">
              צור קשר
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-800/50 p-5 rounded-xl backdrop-blur-sm hover:bg-gray-800/70 transition-all">
                <a 
                  href={generalWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium">WhatsApp</div>
                    <div className="text-sm text-gray-400">לחץ לשיחה מיידית</div>
                  </div>
                </a>
              </div>
              
              <div className="bg-gray-800/50 p-5 rounded-xl backdrop-blur-sm hover:bg-gray-800/70 transition-all">
                <a 
                  href={`tel:+${phoneNumber}`}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{phoneNumber}</div>
                    <div className="text-sm text-gray-400">א'-ה' 9:00-18:00, ו' 9:00-14:00</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {currentYear} כל הזכויות שמורות.</p>
          <div className="mt-4 md:mt-0">
            <span className="px-2">מדיניות פרטיות</span>
            <span className="px-2 border-r border-gray-700">תנאי שימוש</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 