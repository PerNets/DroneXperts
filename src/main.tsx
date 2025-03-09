import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { getDataLayerUpdater } from './services/dataLayerUpdater';
import { hideProductsNotInDataLayer } from './services/productCleaner';
import { setupPriceUpdater } from './services/priceUpdater';

// הפעלת מנגנון העדכון האוטומטי
if (typeof window !== 'undefined') {
  // המתנה לטעינת הדף
  window.addEventListener('load', () => {
    console.log('Main: Page loaded, initializing DataLayer updater');
    
    // הפעלת עדכונים תקופתיים כל 5 שניות
    const updater = getDataLayerUpdater();
    updater.startPeriodicUpdates(5000);
    
    // הסתרת מוצרים שלא קיימים ב-DataLayer
    setTimeout(() => {
      console.log('Main: Hiding products not in DataLayer');
      hideProductsNotInDataLayer();
    }, 1000);
    
    // הוספת מאזין לעדכוני DataLayer
    updater.addListener(() => {
      console.log('Main: DataLayer updated, hiding non-existent products');
      // הסתרת מוצרים שלא קיימים ב-DataLayer לאחר כל עדכון
      hideProductsNotInDataLayer();
    });
    
    // הפעלת מנגנון עדכון המחירים והמלאי
    setupPriceUpdater();
    
    console.log('Main: DataLayer updater initialized');
  });
}

// הוספת סגנונות CSS לאנימציית עדכון מחירים
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .price-updated {
      animation: price-flash 2s ease-in-out;
    }
    
    @keyframes price-flash {
      0%, 100% { background-color: transparent; }
      50% { background-color: rgba(59, 130, 246, 0.2); }
    }
    
    .in-stock {
      color: #10b981;
    }
    
    .out-of-stock {
      color: #ef4444;
    }
  `;
  document.head.appendChild(style);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
