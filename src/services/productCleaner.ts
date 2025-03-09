import { getProductsFromDataLayer } from './dataLayerService';

/**
 * פונקציה להסרת מוצרים שלא קיימים ב-DataLayer
 * @param products מערך המוצרים הנוכחי
 * @returns מערך המוצרים המסונן
 */
export function filterProductsByDataLayer<T extends { id: string; slug?: string }>(products: T[]): T[] {
  // קבלת המוצרים מה-DataLayer
  const dataLayerProducts = getProductsFromDataLayer();
  
  // אם אין מוצרים ב-DataLayer, החזר מערך ריק
  if (!dataLayerProducts || dataLayerProducts.length === 0) {
    console.warn('לא נמצאו מוצרים ב-DataLayer, מחזיר מערך ריק');
    return [];
  }
  
  // יצירת מערכים של מזהים ו-slugs מה-DataLayer
  const dataLayerIds = dataLayerProducts.map(p => p.product_id.toString());
  const dataLayerSlugs = dataLayerProducts.map(p => p.slug);
  
  // סינון המוצרים
  const filteredProducts = products.filter(product => {
    // בדיקה אם המוצר קיים ב-DataLayer לפי ID או slug
    const existsById = dataLayerIds.includes(product.id);
    const existsBySlug = product.slug && dataLayerSlugs.includes(product.slug);
    
    return existsById || existsBySlug;
  });
  
  console.log(`סוננו ${products.length - filteredProducts.length} מוצרים שלא קיימים ב-DataLayer`);
  
  return filteredProducts;
}

/**
 * פונקציה להסתרת אלמנטי HTML של מוצרים שלא קיימים ב-DataLayer
 */
export function hideProductsNotInDataLayer(): void {
  try {
    // קבלת המוצרים מה-DataLayer
    const dataLayerProducts = getProductsFromDataLayer();
    
    // אם אין מוצרים ב-DataLayer, לא עושים כלום
    if (!dataLayerProducts || dataLayerProducts.length === 0) {
      console.warn('לא נמצאו מוצרים ב-DataLayer, לא מסתיר מוצרים');
      return;
    }
    
    // יצירת מערכים של מזהים ו-slugs מה-DataLayer
    const dataLayerIds = dataLayerProducts.map(p => p.product_id.toString());
    const dataLayerSlugs = dataLayerProducts.map(p => p.slug);
    
    // מציאת כל אלמנטי המוצרים בדף
    const productElements = document.querySelectorAll('[data-product-id], [data-product-slug]');
    
    // עבור על כל אלמנט ובדוק אם הוא קיים ב-DataLayer
    let hiddenCount = 0;
    
    productElements.forEach(element => {
      const productId = element.getAttribute('data-product-id');
      const productSlug = element.getAttribute('data-product-slug');
      
      // בדיקה אם המוצר קיים ב-DataLayer
      const existsById = productId && dataLayerIds.includes(productId);
      const existsBySlug = productSlug && dataLayerSlugs.includes(productSlug);
      
      if (!existsById && !existsBySlug) {
        // הסתרת האלמנט
        (element as HTMLElement).style.display = 'none';
        hiddenCount++;
      }
    });
    
    if (hiddenCount > 0) {
      console.log(`הוסתרו ${hiddenCount} אלמנטי מוצרים שלא קיימים ב-DataLayer`);
    }
  } catch (error) {
    console.error('שגיאה בהסתרת מוצרים שלא קיימים ב-DataLayer:', error);
  }
} 