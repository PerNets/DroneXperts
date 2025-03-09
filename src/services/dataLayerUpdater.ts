import { getProductsFromDataLayer, DataLayerProduct } from './dataLayerService';

/**
 * מחלקה לעדכון מוצרים בזמן אמת מה-DataLayer
 */
export class DataLayerUpdater {
  private static instance: DataLayerUpdater;
  private updateInterval: number | null = null;
  private listeners: Array<(products: DataLayerProduct[]) => void> = [];
  private lastProducts: DataLayerProduct[] = [];

  private constructor() {
    // מאזין לאירועי GTM
    document.addEventListener('gtm.dom', this.checkForUpdates);
    document.addEventListener('gtm.load', this.checkForUpdates);
    
    // הוספת מאזין לאירוע מותאם אישית לעדכון מוצרים
    document.addEventListener('dataLayer.updated', this.checkForUpdates);
    
    // בדיקה ראשונית
    this.checkForUpdates();
    
    // התחלת עדכונים תקופתיים
    this.startPeriodicUpdates(3000); // בדיקה כל 3 שניות
  }

  /**
   * קבלת מופע יחיד של המחלקה (Singleton)
   */
  public static getInstance(): DataLayerUpdater {
    if (!DataLayerUpdater.instance) {
      DataLayerUpdater.instance = new DataLayerUpdater();
    }
    return DataLayerUpdater.instance;
  }

  /**
   * התחלת עדכונים תקופתיים
   * @param intervalMs זמן בין עדכונים במילישניות
   */
  public startPeriodicUpdates(intervalMs: number = 5000): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    
    this.updateInterval = window.setInterval(() => {
      this.checkForUpdates();
    }, intervalMs);
    
    console.log(`התחלת עדכונים תקופתיים כל ${intervalMs}ms`);
  }

  /**
   * עצירת עדכונים תקופתיים
   */
  public stopPeriodicUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      console.log('עצירת עדכונים תקופתיים');
    }
  }

  /**
   * הוספת מאזין לעדכוני מוצרים
   * @param listener פונקציה שתקרא כאשר יש עדכון
   */
  public addListener(listener: (products: DataLayerProduct[]) => void): void {
    this.listeners.push(listener);
    
    // שליחת המוצרים הנוכחיים למאזין החדש
    if (this.lastProducts.length > 0) {
      listener(this.lastProducts);
    } else {
      // אם אין מוצרים, נסה לקבל אותם
      const products = getProductsFromDataLayer();
      if (products.length > 0) {
        this.lastProducts = products;
        listener(products);
      }
    }
  }

  /**
   * הסרת מאזין
   * @param listener המאזין להסרה
   */
  public removeListener(listener: (products: DataLayerProduct[]) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * קבלת המוצרים הנוכחיים
   */
  public getProducts(): DataLayerProduct[] {
    return this.lastProducts;
  }

  /**
   * בדיקה אם יש עדכונים ב-DataLayer
   */
  private checkForUpdates = (): void => {
    try {
      const products = getProductsFromDataLayer();
      
      if (products.length > 0) {
        // בדיקה אם יש שינוי במוצרים
        const hasChanges = this.hasProductChanges(products);
        
        if (hasChanges || this.lastProducts.length === 0) {
          console.log(`נמצאו עדכונים ב-DataLayer: ${products.length} מוצרים`);
          this.lastProducts = products;
          
          // עדכון כל המאזינים
          this.notifyListeners(products);
          
          // שליחת אירוע מותאם אישית לעדכון המוצרים
          const event = new CustomEvent('products.updated', { detail: products });
          document.dispatchEvent(event);
        }
      }
    } catch (error) {
      console.error('שגיאה בבדיקת עדכונים מה-DataLayer:', error);
    }
  };

  /**
   * בדיקה אם יש שינויים במוצרים
   * @param newProducts המוצרים החדשים
   */
  private hasProductChanges(newProducts: DataLayerProduct[]): boolean {
    if (this.lastProducts.length !== newProducts.length) {
      return true;
    }
    
    // בדיקה אם יש שינוי במחירים או במלאי
    for (let i = 0; i < newProducts.length; i++) {
      const newProduct = newProducts[i];
      const oldProduct = this.lastProducts.find(p => p.product_id === newProduct.product_id);
      
      if (!oldProduct) {
        return true;
      }
      
      if (
        newProduct.price_nis !== oldProduct.price_nis ||
        newProduct.in_stock !== oldProduct.in_stock ||
        newProduct.product_display_name !== oldProduct.product_display_name ||
        newProduct.price_usd !== oldProduct.price_usd ||
        newProduct.comments !== oldProduct.comments
      ) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * עדכון כל המאזינים
   * @param products המוצרים המעודכנים
   */
  private notifyListeners(products: DataLayerProduct[]): void {
    this.listeners.forEach(listener => {
      try {
        listener(products);
      } catch (error) {
        console.error('שגיאה בעדכון מאזין:', error);
      }
    });
  }
}

// יצוא פונקציה נוחה לקבלת המופע
export const getDataLayerUpdater = (): DataLayerUpdater => {
  return DataLayerUpdater.getInstance();
}; 