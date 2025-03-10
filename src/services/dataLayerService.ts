import { Product } from '../types';
import { products as staticProducts } from '../data/products';

// הרחבת טיפוס Window כדי לכלול את dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// טיפוס למוצר ב-DataLayer
export interface DataLayerProduct {
  product_id: number | string;
  product_display_name: string;
  brand: string;
  slug: string;
  full_url?: string;
  price_usd?: string;
  price_nis: string | number;
  in_stock: boolean | string;
  comments?: string;
}

// מערך לשמירת תמונות שנבדקו ונמצאו תקפות
const validatedImages: Record<string, boolean> = {};

// פונקציה לקבלת מוצרים מה-DataLayer
export function getProductsFromDataLayer(): DataLayerProduct[] {
  if (typeof window === 'undefined') return [];
  
  // מצא את האובייקט שמכיל את מערך הרחפנים
  const dataLayer = window.dataLayer || [];
  console.log('DataLayerService: Current dataLayer:', dataLayer);
  
  const dronesObject = dataLayer.find((item: any) => item.drones);
  console.log('DataLayerService: Found drones object:', dronesObject);
  
  // אם נמצא, החזר את מערך הרחפנים, אחרת החזר מערך ריק
  const products = dronesObject ? dronesObject.drones : [];
  console.log('DataLayerService: Retrieved products:', products);
  return products;
}

// פונקציה לבדיקה אם תמונה קיימת
function imageExists(imagePath: string): boolean {
  // אם כבר בדקנו את התמונה הזו בעבר, החזר את התוצאה השמורה
  if (validatedImages[imagePath] !== undefined) {
    return validatedImages[imagePath];
  }
  
  // בדיקה אם התמונה קיימת בתיקיית all-images
  // במקום לבדוק בצורה אסינכרונית, נחזיר true ונסמוך על טיפול השגיאות בקומפוננט
  validatedImages[imagePath] = true;
  return true;
}

// פונקציה למציאת תמונה תקפה למוצר
function findValidImageForProduct(productId: string): string {
  const fileExtensions = ['.jpg', '.png', '.webp'];
  const defaultImage = '/images/placeholder.jpg';
  
  // קודם כל ננסה את התמונה הראשונה בכל הפורמטים
  for (const ext of fileExtensions) {
    const imagePath = `/all-images/${productId}_1${ext}`;
    return imagePath;
  }
  
  // אם לא מצאנו, ננסה את התמונה הראשונה עם סוגריים
  for (const ext of fileExtensions) {
    const imagePath = `/all-images/${productId}_1(1)${ext}`;
    return imagePath;
  }
  
  return defaultImage;
}

// פונקציה להמרת מוצר מ-DataLayer למוצר באתר
export function convertDataLayerProductToProduct(dataLayerProduct: DataLayerProduct): Product {
  // המרת המחיר למחרוזת מפורמטת
  const priceNis = typeof dataLayerProduct.price_nis === 'number' 
    ? `₪${dataLayerProduct.price_nis.toLocaleString('he-IL')}`
    : dataLayerProduct.price_nis.toString();
  
  // המרת סטטוס המלאי לבוליאני
  const inStock = typeof dataLayerProduct.in_stock === 'string'
    ? dataLayerProduct.in_stock.toUpperCase() === 'TRUE'
    : !!dataLayerProduct.in_stock;
  
  // קביעת קטגוריה לפי שם המוצר
  const category = determineCategory(dataLayerProduct.product_display_name, dataLayerProduct.brand);
  
  // יצירת מערך תמונות למוצר
  const productId = dataLayerProduct.product_id.toString();
  
  // יצירת מערך של אפשרויות סיומות קבצים לבדיקה
  const fileExtensions = ['.jpg', '.png', '.webp'];
  
  // יצירת מערך תמונות אפשריות
  const possibleImagePaths: string[] = [];
  
  // הוספת אפשרויות תמונות בכל הפורמטים האפשריים
  for (let i = 1; i <= 4; i++) {
    fileExtensions.forEach(ext => {
      possibleImagePaths.push(`/all-images/${productId}_${i}${ext}`);
    });
  }
  
  // הוספת אפשרויות נוספות עם סוגריים בשם הקובץ
  for (let i = 1; i <= 4; i++) {
    fileExtensions.forEach(ext => {
      possibleImagePaths.push(`/all-images/${productId}_${i}(1)${ext}`);
    });
  }
  
  // בחירת התמונה הראשית - תמיד נתחיל עם התמונה הראשונה
  const mainImage = `/all-images/${productId}_1.jpg`;
  
  // יצירת מערך מפרטים ריק
  let specs: string[] = [];
  let includes: string[] = [];
  
  // בדיקה אם קיים מוצר סטטי עם אותו slug
  const staticProduct = staticProducts.find(p => p.slug === dataLayerProduct.slug);
  
  if (staticProduct) {
    // אם קיים מוצר סטטי, נשתמש במפרט ובתכולה שלו
    specs = staticProduct.specs;
    includes = staticProduct.includes || [];
    console.log(`Found static product for ${dataLayerProduct.slug}, using its specs and includes`);
  } else {
    // אחרת, ננסה לחלץ מפרטים מהערות
    if (dataLayerProduct.comments) {
      const commentsLines = dataLayerProduct.comments.split('\n');
      commentsLines.forEach(line => {
        if (line.trim()) {
          specs.push(line.trim());
        }
      });
    }
  }
  
  return {
    id: productId,
    name: dataLayerProduct.product_display_name,
    description: `${dataLayerProduct.brand} ${dataLayerProduct.product_display_name}`,
    category,
    price: priceNis,
    priceUSD: dataLayerProduct.price_usd || '',
    slug: dataLayerProduct.slug,
    image: mainImage,
    images: possibleImagePaths,
    specs: specs,
    includes: includes,
    inStock
  };
}

// פונקציה לקביעת קטגוריה לפי שם המוצר
function determineCategory(productName: string, brand: string): 'premium' | 'professional' | 'compact' | 'all' | 'batteries' | 'controllers' | 'cameras' | 'accessories' {
  const name = productName.toLowerCase();
  
  if (name.includes('battery') || name.includes('batteries') || name.includes('tb30') || name.includes('tb60')) {
    return 'batteries';
  } else if (name.includes('controller') || name.includes('controler')) {
    return 'controllers';
  } else if (name.includes('zenmuse') || name.includes('camera') || name.includes('h20')) {
    return 'cameras';
  } else if (name.includes('mavic') && (name.includes('3 pro') || name.includes('3 t') || name.includes('3 e'))) {
    return 'premium';
  } else if (name.includes('matrice') || name.includes('evo')) {
    return 'professional';
  } else if (name.includes('mini') || name.includes('air')) {
    return 'compact';
  } else {
    return 'accessories';
  }
}

// פונקציה לבדיקה אם מוצר קיים ב-DataLayer
export function isProductInDataLayer(productId: string): boolean {
  const dataLayerProducts = getProductsFromDataLayer();
  return dataLayerProducts.some(p => p.product_id.toString() === productId);
}

// פונקציה למציאת מוצר ב-DataLayer לפי ID או slug
export function findProductInDataLayer(productId?: string, slug?: string): DataLayerProduct | undefined {
  console.log('DataLayerService: Searching for product:', { productId, slug });
  const dataLayerProducts = getProductsFromDataLayer();
  
  const product = dataLayerProducts.find(p => 
    (productId && p.product_id.toString() === productId) || 
    (slug && p.slug === slug)
  );
  
  console.log('DataLayerService: Found product:', product);
  return product;
}

// פונקציה להמרת כל המוצרים מ-DataLayer
export function getAllProductsFromDataLayer(): Product[] {
  const dataLayerProducts = getProductsFromDataLayer();
  return dataLayerProducts.map(convertDataLayerProductToProduct);
} 