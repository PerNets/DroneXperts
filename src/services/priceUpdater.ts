import { DataLayerProduct } from './dataLayerService';
import { getDataLayerUpdater } from './dataLayerUpdater';
import { formatPrice } from '../types';

/**
 * פונקציה לעדכון המחירים והמלאי בזמן אמת
 */
export function setupPriceUpdater(): void {
  const updater = getDataLayerUpdater();
  
  // הוספת מאזין לעדכוני DataLayer
  updater.addListener(updatePricesAndStock);
  
  console.log('מנגנון עדכון מחירים ומלאי הופעל');
}

/**
 * פונקציה לעדכון המחירים והמלאי בדף
 * @param products המוצרים המעודכנים מה-DataLayer
 */
function updatePricesAndStock(products: DataLayerProduct[]): void {
  try {
    // עבור על כל המוצרים ועדכן את המחירים והמלאי
    products.forEach(product => {
      updateProductPriceAndStock(product);
    });
  } catch (error) {
    console.error('שגיאה בעדכון מחירים ומלאי:', error);
  }
}

/**
 * פונקציה לעדכון המחיר והמלאי של מוצר בודד
 * @param product המוצר המעודכן מה-DataLayer
 */
function updateProductPriceAndStock(product: DataLayerProduct): void {
  try {
    // מציאת אלמנטי המוצר בדף
    const productElements = document.querySelectorAll(
      `[data-product-id="${product.product_id}"], [data-product-slug="${product.slug}"]`
    );
    
    if (productElements.length === 0) {
      return;
    }
    
    // המרת המחיר למחרוזת מפורמטת
    const priceNis = typeof product.price_nis === 'number' 
      ? formatPrice(product.price_nis, 'ILS')
      : product.price_nis.toString();
    
    // המרת סטטוס המלאי לבוליאני
    const inStock = typeof product.in_stock === 'string'
      ? product.in_stock.toUpperCase() === 'TRUE'
      : !!product.in_stock;
    
    // עדכון כל אלמנטי המוצר
    productElements.forEach(element => {
      // עדכון המחיר
      updateElementPrice(element, priceNis);
      
      // עדכון סטטוס המלאי
      updateElementStock(element, inStock);
      
      // עדכון שם המוצר
      updateElementName(element, product.product_display_name);
    });
  } catch (error) {
    console.error(`שגיאה בעדכון מוצר ${product.product_id}:`, error);
  }
}

/**
 * פונקציה לעדכון המחיר של אלמנט
 * @param element האלמנט לעדכון
 * @param price המחיר המעודכן
 */
function updateElementPrice(element: Element, price: string): void {
  // חיפוש אלמנט המחיר
  const priceElements = element.querySelectorAll('.product-price, .price, [data-price]');
  
  if (priceElements.length > 0) {
    priceElements.forEach(priceElement => {
      // בדיקה אם המחיר השתנה
      if (priceElement.textContent !== price) {
        // עדכון המחיר
        priceElement.textContent = price;
        
        // הוספת אנימציה להדגשת השינוי
        priceElement.classList.add('price-updated');
        
        // הסרת האנימציה לאחר 2 שניות
        setTimeout(() => {
          priceElement.classList.remove('price-updated');
        }, 2000);
      }
    });
  }
}

/**
 * פונקציה לעדכון סטטוס המלאי של אלמנט
 * @param element האלמנט לעדכון
 * @param inStock האם המוצר במלאי
 */
function updateElementStock(element: Element, inStock: boolean): void {
  // חיפוש אלמנט סטטוס המלאי
  const stockElements = element.querySelectorAll('.stock-status, [data-stock]');
  
  if (stockElements.length > 0) {
    stockElements.forEach(stockElement => {
      // עדכון הטקסט
      stockElement.textContent = inStock ? 'במלאי' : 'אזל מהמלאי';
      
      // עדכון המחלקות
      if (inStock) {
        stockElement.classList.remove('out-of-stock');
        stockElement.classList.add('in-stock');
      } else {
        stockElement.classList.remove('in-stock');
        stockElement.classList.add('out-of-stock');
      }
    });
  } else {
    // אם אין אלמנט סטטוס מלאי ואין מלאי, צור אלמנט חדש
    if (!inStock) {
      const stockBadge = document.createElement('div');
      stockBadge.className = 'absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm out-of-stock';
      stockBadge.textContent = 'אזל מהמלאי';
      
      // הוספת האלמנט לאלמנט המוצר
      const imageContainer = element.querySelector('.relative');
      if (imageContainer) {
        imageContainer.appendChild(stockBadge);
      } else {
        element.appendChild(stockBadge);
      }
    }
  }
}

/**
 * פונקציה לעדכון שם המוצר של אלמנט
 * @param element האלמנט לעדכון
 * @param name השם המעודכן
 */
function updateElementName(element: Element, name: string): void {
  // חיפוש אלמנט השם
  const nameElements = element.querySelectorAll('h2, h3, .product-name, [data-name]');
  
  if (nameElements.length > 0) {
    nameElements.forEach(nameElement => {
      // בדיקה אם השם השתנה
      if (nameElement.textContent !== name) {
        // עדכון השם
        nameElement.textContent = name;
      }
    });
  }
} 