import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'DJI Mavic 3 Pro',
    description: 'רחפן מקצועי עם מערך צילום משולש Hasselblad, צילום 5.1K וטיסה של עד 43 דקות',
    category: 'premium',
    price: '₪12,999',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specs: [
      'מצלמה ראשית Hasselblad עם חיישן 4/3 אינץ\'',
      'זמן טיסה מקסימלי: 43 דקות',
      'טווח שידור: 15 ק"מ',
      'מהירות מקסימלית: 75 קמ"ש'
    ],
    includes: [
      'רחפן Mavic 3 Pro',
      'שלט רחוק DJI RC',
      'סוללה אחת',
      'מטען',
      'כבלים וברגים',
      'תיק נשיאה'
    ]
  },
  {
    id: '2',
    name: 'DJI Air 3',
    description: 'רחפן מתקדם עם מערכת צילום כפולה, מושלם לצילום אווירי מקצועי',
    category: 'professional',
    price: '₪4,999',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specs: [
      'מצלמה כפולה עם חיישני 1/1.3 אינץ\'',
      'זמן טיסה מקסימלי: 46 דקות',
      'טווח שידור: 10 ק"מ',
      'מהירות מקסימלית: 68 קמ"ש'
    ],
    includes: [
      'רחפן Air 3',
      'שלט רחוק',
      'סוללה אחת',
      'מטען',
      'כבלים'
    ]
  },
  {
    id: '3',
    name: 'DJI Mini 4 Pro',
    description: 'רחפן קומפקטי במשקל 249 גרם עם ביצועים מקצועיים',
    category: 'compact',
    price: '₪3,499',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specs: [
      'מצלמה עם חיישן 1/1.3 אינץ\'',
      'זמן טיסה מקסימלי: 34 דקות',
      'טווח שידור: 12 ק"מ',
      'משקל: פחות מ-249 גרם'
    ],
    includes: [
      'רחפן Mini 4 Pro',
      'שלט רחוק',
      'סוללה אחת',
      'מטען',
      'כבלים'
    ]
  },
  {
    id: '4',
    name: 'DJI Mavic 3 Enterprise',
    description: 'רחפן מקצועי לשימושים עסקיים עם מצלמה תרמית מובנית',
    category: 'premium',
    price: '₪29,999',
    image: '/images/mavic3e.jpg',
    specs: [
      'מצלמה תרמית משולבת',
      'חיישן 4/3 אינץ\'',
      'זמן טיסה: עד 45 דקות',
      'מערכת RTK מובנית'
    ],
    includes: [
      'רחפן Mavic 3 Enterprise',
      'שלט רחוק DJI RC Pro Enterprise',
      'סוללה אחת',
      'מטען מקצועי',
      'תיק קשיח'
    ]
  },
  {
    id: '5',
    name: 'DJI Mavic 3 Thermal',
    description: 'רחפן פרימיום עם יכולות צילום תרמי מתקדמות',
    category: 'premium',
    price: '₪34,999',
    image: '/images/mavic3t.jpg',
    specs: [
      'מצלמה תרמית ברזולוציה גבוהה',
      'חיישן 4/3 אינץ\'',
      'זמן טיסה: עד 45 דקות',
      'מערכת חישה כל-כיוונית'
    ],
    includes: [
      'רחפן Mavic 3 Thermal',
      'שלט רחוק DJI RC Pro',
      'סוללה אחת',
      'מטען מקצועי',
      'תיק קשיח'
    ]
  },
  {
    id: '6',
    name: 'DJI Matrice 30T',
    description: 'רחפן תעשייתי מתקדם לשימושים מקצועיים',
    category: 'premium',
    price: '₪49,999',
    image: '/images/matrice30t.jpg',
    specs: [
      'מצלמה תרמית וזום אופטי',
      'עמידות IP55',
      'זמן טיסה: עד 41 דקות',
      'טווח שידור: 15 ק"מ'
    ],
    includes: [
      'רחפן Matrice 30T',
      'שלט רחוק DJI RC Plus',
      '2 סוללות TB30',
      'תחנת עגינה BS30',
      'תיק קשיח'
    ]
  },
  {
    id: '7',
    name: 'DJI Avata',
    description: 'רחפן FPV קומפקטי לחוויית טיסה אימרסיבית',
    category: 'compact',
    price: '₪3,999',
    image: '/images/avata.jpg',
    specs: [
      'מצלמת 4K/60fps',
      'זמן טיסה: עד 18 דקות',
      'משקל: 410 גרם',
      'מערכת ייצוב תמונה מתקדמת'
    ],
    includes: [
      'רחפן Avata',
      'משקפי DJI Goggles 2',
      'שלט רחוק Motion Controller',
      'סוללה אחת'
    ]
  },
  {
    id: '8',
    name: 'DJI Avata 2 Combo',
    description: 'חבילת רחפן FPV מתקדם עם סוללה',
    category: 'professional',
    price: '₪4,999',
    image: '/images/avata2.jpg',
    specs: [
      'מצלמת 4K/120fps',
      'סוללה מקורית',
      'משקלים FPV',
      'שלט רחוק מקצועי'
    ],
    includes: [
      'רחפן Avata 2',
      'משקפי DJI Goggles 3',
      'שלט רחוק FPV Controller',
      'סוללה אחת',
      'תיק נשיאה'
    ]
  },
  {
    id: '9',
    name: 'DJI Avata 2 FMC',
    description: 'חבילת Fly More Combo עם 3 סוללות ואביזרים',
    category: 'professional',
    price: '₪6,499',
    image: '/images/avata2fmc.jpg',
    specs: [
      '3 סוללות מקוריות',
      'תיק נשיאה',
      'מטען מרובה',
      'סט פרופלורים נוסף'
    ],
    includes: [
      'רחפן Avata 2',
      'משקפי DJI Goggles 3',
      'שלט רחוק FPV Controller',
      '3 סוללות',
      'מטען מרובה',
      'תיק נשיאה מורחב',
      'סט פרופלורים נוסף'
    ]
  },
  {
    id: '10',
    name: 'DJI Mini 3',
    description: 'רחפן קל משקל אידיאלי למתחילים',
    category: 'compact',
    price: '₪2,499',
    image: '/images/mini3.jpg',
    specs: [
      'מצלמת 4K',
      'משקל: פחות מ-249 גרם',
      'זמן טיסה: עד 38 דקות',
      'צילום אנכי'
    ],
    includes: [
      'רחפן Mini 3',
      'שלט רחוק RC-N1',
      'סוללה אחת',
      'מטען',
      'כבלים'
    ]
  },
  {
    id: '11',
    name: 'DJI Mini 3 Pro',
    description: 'רחפן קומפקטי עם יכולות מקצועיות',
    category: 'professional',
    price: '₪3,999',
    image: '/images/mini3pro.jpg',
    specs: [
      'מצלמת 4K/60fps',
      'חיישני התנגשות',
      'מעקב אוטומטי',
      'משקל: פחות מ-249 גרם'
    ],
    includes: [
      'רחפן Mini 3 Pro',
      'שלט רחוק DJI RC',
      'סוללה אחת',
      'מטען',
      'כבלים'
    ]
  },
  {
    id: '12',
    name: 'DJI Mini 2 SE',
    description: 'רחפן קומפקטי למתחילים',
    category: 'compact',
    price: '₪1,999',
    image: '/images/mini2se.jpg',
    specs: [
      'מצלמת 2.7K',
      'משקל: פחות מ-249 גרם',
      'זמן טיסה: עד 31 דקות',
      'שידור HD'
    ],
    includes: [
      'רחפן Mini 2 SE',
      'שלט רחוק RC-N1',
      'סוללה אחת',
      'מטען',
      'כבלים'
    ]
  },
  {
    id: '13',
    name: 'DJI Air 3 FMC',
    description: 'חבילת Fly More Combo עם סוללות נוספות ואביזרים',
    category: 'professional',
    price: '₪6,999',
    image: '/images/air3fmc.jpg',
    specs: [
      '3 סוללות',
      'תיק נשיאה',
      'מטען מרובה',
      'פרופלורים נוספים'
    ],
    includes: [
      'רחפן Air 3',
      'שלט רחוק DJI RC 2',
      '3 סוללות',
      'מטען מרובה',
      'תיק נשיאה',
      '3 זוגות פרופלורים'
    ]
  },
  {
    id: '14',
    name: 'DJI Matrice 350 RTK',
    description: 'רחפן תעשייתי מתקדם עם מערכת RTK',
    category: 'premium',
    price: '₪59,999',
    image: '/images/m350.jpg',
    specs: [
      'מערכת RTK מובנית',
      'תאימות למצלמות מקצועיות',
      'עמידות IP55',
      'זמן טיסה: עד 55 דקות'
    ],
    includes: [
      'רחפן M350 RTK',
      'שלט רחוק DJI RC Plus',
      '2 סוללות TB65',
      'תחנת עגינה BS65',
      'תיק קשיח'
    ]
  },
  {
    id: '15',
    name: 'Autel EVO 4T Max',
    description: 'רחפן מקצועי עם יכולות צילום מתקדמות',
    category: 'premium',
    price: '₪24,999',
    image: '/images/evo4tmax.jpg',
    specs: [
      'מצלמה 10K',
      'זום אופטי x10',
      'זמן טיסה: עד 42 דקות',
      'טווח שידור: 15 ק"מ'
    ],
    includes: [
      'רחפן EVO 4T Max',
      'שלט רחוק Autel Smart Controller V3',
      'סוללה אחת',
      'מטען',
      'תיק נשיאה'
    ]
  },
  {
    id: '16',
    name: 'Autel EVO 4N',
    description: 'רחפן מקצועי לצילום אווירי',
    category: 'professional',
    price: '₪14,999',
    image: '/images/evo4n.jpg',
    specs: [
      'מצלמה 8K',
      'זום אופטי x6',
      'זמן טיסה: עד 40 דקות',
      'מערכת חישה כל-כיוונית'
    ],
    includes: [
      'רחפן EVO 4N',
      'שלט רחוק Autel Smart Controller',
      'סוללה אחת',
      'מטען',
      'תיק נשיאה'
    ]
  },
  // מוצרים נלווים
  {
    id: '17',
    name: 'DJI Avata Battery',
    description: 'סוללה מקורית לרחפן DJI Avata',
    category: 'batteries',
    price: '₪599',
    image: '/images/avata-battery.jpg',
    specs: [
      'קיבולת: 2420mAh',
      'מתח: 14.76V',
      'זמן טיסה: עד 18 דקות',
      'משקל: 162 גרם'
    ]
  },
  {
    id: '18',
    name: 'DJI Mavic Battery',
    description: 'סוללה מקורית לסדרת Mavic',
    category: 'batteries',
    price: '₪799',
    image: '/images/mavic-battery.jpg',
    specs: [
      'קיבולת: 5000mAh',
      'מתח: 15.4V',
      'זמן טיסה: עד 46 דקות',
      'משקל: 335 גרם'
    ]
  },
  {
    id: '19',
    name: 'TB65 Battery',
    description: 'סוללה מקצועית לרחפן Matrice 350',
    category: 'batteries',
    price: '₪2,999',
    image: '/images/tb65-battery.jpg',
    specs: [
      'קיבולת: 12000mAh',
      'מתח: 52.8V',
      'זמן טיסה: עד 55 דקות',
      'תמיכה בטעינה מהירה'
    ]
  },
  {
    id: '20',
    name: 'BS65 Charging Station',
    description: 'תחנת טעינה מקצועית לסוללות TB65',
    category: 'accessories',
    price: '₪4,999',
    image: '/images/bs65-charger.jpg',
    specs: [
      'טעינה של עד 4 סוללות במקביל',
      'תצוגת מצב טעינה',
      'קירור אקטיבי',
      'חיבור חשמל תלת-פאזי'
    ]
  },
  {
    id: '21',
    name: 'DJI H20 Camera',
    description: 'מצלמה היברידית לשימוש תעשייתי',
    category: 'cameras',
    price: '₪9,999',
    image: '/images/h20-camera.jpg',
    specs: [
      'זום אופטי x20',
      'חיישן 1/1.7"',
      'צילום תרמי',
      'מדידת מרחק בלייזר'
    ]
  },
  {
    id: '22',
    name: 'DJI H20T Camera',
    description: 'מצלמה היברידית עם יכולות תרמיות מתקדמות',
    category: 'cameras',
    price: '₪14,999',
    image: '/images/h20t-camera.jpg',
    specs: [
      'זום אופטי x20',
      'חיישן תרמי ברזולוציה גבוהה',
      'מדידת טמפרטורה מדויקת',
      'צילום לילה מתקדם'
    ]
  },
  {
    id: '23',
    name: 'FPV Remote Controller',
    description: 'שלט רחוק מקצועי לטיסות FPV',
    category: 'controllers',
    price: '₪1,499',
    image: '/images/fpv-controller.jpg',
    specs: [
      'מקלות בדיוק גבוה',
      'סוללה נטענת',
      'תאימות למשקפי FPV',
      'חיבור אנטנות חיצוניות'
    ]
  }
];

export const categories = [
  { id: 'all', name: 'הכל' },
  { id: 'premium', name: 'פרימיום' },
  { id: 'professional', name: 'מקצועי' },
  { id: 'compact', name: 'קומפקטי' },
  { id: 'batteries', name: 'סוללות' },
  { id: 'controllers', name: 'שלטים' },
  { id: 'cameras', name: 'מצלמות' },
  { id: 'accessories', name: 'אביזרים' }
];