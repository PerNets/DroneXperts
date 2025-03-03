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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-whatsapp text-green-500" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                    </svg>
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