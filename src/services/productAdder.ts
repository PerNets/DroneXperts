import { DataLayerProduct, convertDataLayerProductToProduct } from './dataLayerService';
import { getDataLayerUpdater } from './dataLayerUpdater';
import { Product } from '../types';

/**
 * פונקציה להוספת מוצרים חדשים שקיימים ב-DataLayer אך לא קיימים באתר
 * @param existingProducts מערך המוצרים הקיים
 * @param setProducts פונקציה לעדכון מערך המוצרים
 */
export function setupProductAdder(
  existingProducts: Product[],
  setProducts: (products: Product[]) => void
): void {
  const updater = getDataLayerUpdater();
  
  // הוספת מאזין לעדכוני DataLayer
  updater.addListener(products => {
    addNewProducts(products, existingProducts, setProducts);
  });
  
  console.log('מנגנון הוספת מוצרים חדשים הופעל');
}

/**
 * פונקציה להוספת מוצרים חדשים
 * @param dataLayerProducts המוצרים מה-DataLayer
 * @param existingProducts מערך המוצרים הקיים
 * @param setProducts פונקציה לעדכון מערך המוצרים
 */
function addNewProducts(
  dataLayerProducts: DataLayerProduct[],
  existingProducts: Product[],
  setProducts: (products: Product[]) => void
): void {
  try {
    // יצירת מערך של מזהים קיימים
    const existingIds = existingProducts.map(p => p.id);
    const existingSlugs = existingProducts.map(p => p.slug);
    
    // סינון מוצרים חדשים
    const newDataLayerProducts = dataLayerProducts.filter(p => {
      const productId = p.product_id.toString();
      return !existingIds.includes(productId) && !existingSlugs.includes(p.slug);
    });
    
    if (newDataLayerProducts.length === 0) {
      return;
    }
    
    console.log(`נמצאו ${newDataLayerProducts.length} מוצרים חדשים ב-DataLayer`);
    
    // המרת המוצרים החדשים למבנה המתאים
    const newProducts = newDataLayerProducts.map(convertDataLayerProductToProduct);
    
    // הוספת המוצרים החדשים למערך הקיים
    const updatedProducts = [...existingProducts, ...newProducts];
    
    // עדכון מערך המוצרים
    setProducts(updatedProducts);
    
    console.log(`נוספו ${newProducts.length} מוצרים חדשים`);
  } catch (error) {
    console.error('שגיאה בהוספת מוצרים חדשים:', error);
  }
} 