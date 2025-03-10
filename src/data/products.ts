import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'DJI Mavic 3 Pro',
    description: 'רחפן מקצועי עם מערך צילום משולש Hasselblad, צילום 5.1K וטיסה של עד 43 דקות',
    category: 'premium',
    price: '₪12,999',
    priceUSD: '$3,643.20',
    slug: 'dji-mavic-3-pro',
    image: '/images/DJI-Mavic-3-Pro-release-date-price-specs-crop-2.jpg',
    specs: [
      'מצלמה ראשית Hasselblad עם חיישן 4/3 אינץ\' ורזולוציית 20MP',
      'מצלמה משנית עם זום אופטי x7 (עד 28x היברידי)',
      'מצלמה שלישית עם עדשה רחבה 166°',
      'צילום וידאו 5.1K/50fps, 4K/120fps, 1080p/200fps',
      'זמן טיסה מקסימלי: 43 דקות',
      'טווח שידור: 15 ק"מ עם טכנולוגיית O3+',
      'מהירות מקסימלית: 75 קמ"ש במצב ספורט',
      'חיישני התנגשות כל-כיווניים עם טכנולוגיית APAS 5.0',
      'מעקב אוטומטי מתקדם עם זיהוי אובייקטים',
      'משקל: 958 גרם',
      'עמידות לרוח: עד 12 מ/ש',
      'טמפרטורת הפעלה: -10°C עד 40°C',
      'GPS + GLONASS + Galileo לניווט מדויק',
      'תמיכה בכרטיסי זיכרון עד 1TB'
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
    name: 'DJI Mini 4 Pro',
    description: 'רחפן קומפקטי במשקל 249 גרם עם ביצועים מקצועיים',
    category: 'compact',
    price: '₪4,499',
    priceUSD: '$1,300.00',
    slug: 'dji-mini-4-pro',
    image: '/images/DJI-Mini-4-Pro-1.jpg',
    specs: [
      'מצלמה עם חיישן 1/1.3 אינץ\' ורזולוציית 48MP',
      'צילום וידאו 4K/60fps עם HDR',
      'זום דיגיטלי עד x4',
      'זמן טיסה מקסימלי: 34 דקות (45 דקות עם סוללה פלוס)',
      'טווח שידור: 12 ק"מ עם טכנולוגיית O3',
      'מהירות מקסימלית: 58 קמ"ש במצב ספורט',
      'חיישני התנגשות תלת-כיווניים',
      'מעקב אוטומטי עם זיהוי אובייקטים',
      'משקל: פחות מ-249 גרם (ללא רישום ברשויות)',
      'עמידות לרוח: עד 10.7 מ/ש',
      'טמפרטורת הפעלה: -10°C עד 40°C',
      'GPS + GLONASS + Galileo לניווט מדויק',
      'תמיכה בכרטיסי זיכרון עד 512GB'
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
    id: '3',
    name: 'DJI Mavic 3 Enterprise',
    description: 'רחפן מקצועי לשימושים עסקיים עם מצלמה תרמית מובנית',
    category: 'premium',
    price: '₪14,999',
    priceUSD: '$4,032.00',
    slug: 'dji-mavic-3-enterprise',
    image: '/images/dji-mavic-3-enterprise-drones.jpg',
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
    id: '4',
    name: 'DJI Mavic 2 Thermal',
    description: 'רחפן פרימיום עם יכולות צילום תרמי מתקדמות',
    category: 'premium',
    price: '₪11,999',
    priceUSD: '$3,330.00',
    slug: 'dji-mavic-2-thermal',
    image: '/images/DJI-Mavic-3-Thermal-M3T-Drohne-im-Flug-Image-Source-DJI.jpg',
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
    id: '5',
    name: 'DJI Matrice 30T',
    description: 'רחפן תעשייתי מתקדם לשימושים מקצועיים',
    category: 'premium',
    price: '₪34,999',
    priceUSD: '$9,520.00',
    slug: 'dji-matrice-30t',
    image: '/images/DJI-Matrice-30-field.jpg',
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
    id: '6',
    name: 'DJI Avata 2 Combo',
    description: 'חבילת רחפן FPV מתקדם עם סוללה',
    category: 'professional',
    price: '₪4,999',
    priceUSD: '$1,350.00',
    slug: 'dji-avata-2-combo',
    image: '/images/DJI Avata 2 Combo.jpg',
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
    id: '7',
    name: 'DJI Avata 2 FMC',
    description: 'חבילת Fly More Combo עם 3 סוללות ואביזרים',
    category: 'professional',
    price: '₪5,999',
    priceUSD: '$1,628.00',
    slug: 'dji-avata-2-fmc',
    image: '/images/DJI Avata 2 FMC.jpg',
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
    id: '8',
    name: 'DJI Mini 3',
    description: 'רחפן קל משקל אידיאלי למתחילים',
    category: 'compact',
    price: '₪3,499',
    priceUSD: '$951.50',
    slug: 'dji-mini-3',
    image: '/images/DJI Mini 3.jpg',
    specs: [
      'מצלמת 4K/30fps עם חיישן 1/1.3 אינץ\'',
      'רזולוציית תמונות: 12MP',
      'צילום HDR לתמונות וסרטונים',
      'משקל: פחות מ-249 גרם (ללא רישום ברשויות)',
      'זמן טיסה: עד 38 דקות (51 דקות עם סוללה פלוס)',
      'טווח שידור: עד 10 ק"מ',
      'מהירות מקסימלית: 57 קמ"ש במצב ספורט',
      'צילום אנכי לתוכן מותאם לרשתות חברתיות',
      'מצבי צילום אוטומטיים: QuickShots',
      'עמידות לרוח: עד 10.7 מ/ש',
      'טמפרטורת הפעלה: -10°C עד 40°C',
      'GPS + GLONASS לניווט מדויק',
      'תמיכה בכרטיסי זיכרון עד 512GB'
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
    id: '9',
    name: 'DJI Mini 3 Pro',
    description: 'רחפן קומפקטי עם יכולות מקצועיות',
    category: 'professional',
    price: '₪3,999',
    priceUSD: '$1,265.00',
    slug: 'dji-mini-3-pro',
    image: '/images/dji-mini-3-pro-close-up-04.jpg',
    specs: [
      'מצלמת 4K/60fps עם חיישן 1/1.3 אינץ\'',
      'רזולוציית תמונות: 48MP',
      'צילום HDR לתמונות וסרטונים',
      'חיישני התנגשות תלת-כיווניים',
      'מעקב אוטומטי עם FocusTrack',
      'משקל: פחות מ-249 גרם (ללא רישום ברשויות)',
      'זמן טיסה: עד 34 דקות (47 דקות עם סוללה פלוס)',
      'טווח שידור: עד 12 ק"מ עם טכנולוגיית O3',
      'מהירות מקסימלית: 57 קמ"ש במצב ספורט',
      'צילום אנכי לתוכן מותאם לרשתות חברתיות',
      'מצבי צילום מתקדמים: MasterShots, Hyperlapse',
      'עמידות לרוח: עד 10.7 מ/ש',
      'טמפרטורת הפעלה: -10°C עד 40°C',
      'תמיכה בכרטיסי זיכרון עד 512GB'
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
    id: '10',
    name: 'Autel EVO 4T Max',
    description: 'רחפן מקצועי עם יכולות צילום מתקדמות',
    category: 'premium',
    price: '₪24,999',
    priceUSD: '$8,200.00',
    slug: 'autel-evo-4t-max',
    image: '/images/Autel EVO 4T Max.jpg',
    specs: [
      'מצלמה 10K עם חיישן 1 אינץ\'',
      'רזולוציית תמונות: 50MP',
      'זום אופטי x10 (עד x160 היברידי)',
      'צילום וידאו 10K/30fps, 8K/60fps, 4K/120fps',
      'זמן טיסה: עד 42 דקות',
      'טווח שידור: 15 ק"מ עם טכנולוגיית SkyLink 3.0',
      'מהירות מקסימלית: 94 קמ"ש במצב ספורט',
      'חיישני התנגשות כל-כיווניים עם מניעת מכשולים אוטונומית',
      'מעקב אוטומטי מתקדם עם זיהוי אובייקטים',
      'משקל: 1.2 ק"ג',
      'עמידות לרוח: עד 13.8 מ/ש',
      'טמפרטורת הפעלה: -20°C עד 50°C',
      'GPS + GLONASS + Galileo + BeiDou לניווט מדויק',
      'אחסון פנימי: 1TB SSD',
      'תמיכה בכרטיסי זיכרון עד 2TB'
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
    id: '11',
    name: 'Autel EVO 4N',
    description: 'רחפן מקצועי לצילום אווירי',
    category: 'professional',
    price: '₪14,999',
    priceUSD: '$11,200.00',
    slug: 'autel-evo-4n',
    image: '/images/Autel EVO 4N.jpg',
    specs: [
      'מצלמה 8K עם חיישן 1 אינץ\'',
      'רזולוציית תמונות: 48MP',
      'זום אופטי x6 (עד x96 היברידי)',
      'צילום וידאו 8K/30fps, 6K/60fps, 4K/120fps',
      'זמן טיסה: עד 40 דקות',
      'טווח שידור: 15 ק"מ עם טכנולוגיית SkyLink 3.0',
      'מהירות מקסימלית: 90 קמ"ש במצב ספורט',
      'מערכת חישה כל-כיוונית עם 12 חיישנים',
      'מעקב אוטומטי מתקדם עם זיהוי אובייקטים',
      'משקל: 1.1 ק"ג',
      'עמידות לרוח: עד 13.8 מ/ש',
      'טמפרטורת הפעלה: -20°C עד 50°C',
      'GPS + GLONASS + Galileo + BeiDou לניווט מדויק',
      'אחסון פנימי: 512GB SSD',
      'תמיכה בכרטיסי זיכרון עד 2TB'
    ],
    includes: [
      'רחפן EVO 4N',
      'שלט רחוק Autel Smart Controller',
      'סוללה אחת',
      'מטען',
      'תיק נשיאה'
    ]
  },
  {
    id: '12',
    name: 'DJI Avata Battery',
    description: 'סוללה מקורית לרחפן DJI Avata',
    category: 'batteries',
    price: '₪299',
    priceUSD: '$85.00',
    slug: 'dji-avata-battery',
    image: '/images/DJI Avata Battery.jpg',
    specs: [
      'קיבולת: 2420mAh / 35.7Wh',
      'מתח: 14.76V',
      'סוג סוללה: LiPo 4S',
      'זמן טיסה: עד 18 דקות בתנאים אופטימליים',
      'משקל: 162 גרם',
      'טמפרטורת טעינה: 5°C עד 40°C',
      'הספק טעינה מקסימלי: 65W',
      'זמן טעינה: כ-50 דקות עם מטען סטנדרטי',
      'מנגנון הגנה מפני טעינת יתר',
      'מחוון LED למצב הסוללה',
      'תאימות: רחפן DJI Avata בלבד',
      'אורך חיים: כ-300 מחזורי טעינה מלאים'
    ]
  },
  {
    id: '13',
    name: 'DJI Mavic Battery',
    description: 'סוללה מקורית לסדרת Mavic',
    category: 'batteries',
    price: '₪999',
    priceUSD: '$275.00',
    slug: 'dji-mavic-battery',
    image: '/images/DJI Mavic Battery.jpg',
    specs: [
      'קיבולת: 5000mAh / 77Wh',
      'מתח: 15.4V',
      'סוג סוללה: LiPo 4S',
      'זמן טיסה: עד 46 דקות בתנאים אופטימליים',
      'משקל: 335 גרם',
      'טמפרטורת טעינה: 5°C עד 40°C',
      'הספק טעינה מקסימלי: 100W',
      'זמן טעינה: כ-96 דקות עם מטען סטנדרטי, 65 דקות עם מטען מהיר',
      'מנגנון הגנה מפני טעינת יתר וטמפרטורה גבוהה',
      'מחוון LED למצב הסוללה',
      'תאימות: רחפני DJI Mavic 3 ו-Mavic 3 Pro',
      'אורך חיים: כ-400 מחזורי טעינה מלאים',
      'מצב אחסון חכם לשמירה על בריאות הסוללה'
    ]
  },
  {
    id: '14',
    name: 'TB65 Battery',
    description: 'סוללה מקצועית לרחפן Matrice 350',
    category: 'batteries',
    price: '₪2,999',
    priceUSD: '$1,100.00',
    slug: 'tb65-battery',
    image: '/images/TB65 Battery.jpg',
    specs: [
      'קיבולת: 12000mAh / 634Wh',
      'מתח: 52.8V',
      'סוג סוללה: LiPo 12S',
      'זמן טיסה: עד 55 דקות בתנאים אופטימליים',
      'משקל: 1.85 ק"ג',
      'טמפרטורת הפעלה: -20°C עד 50°C',
      'טמפרטורת טעינה: 5°C עד 40°C',
      'הספק טעינה מקסימלי: 470W',
      'תמיכה בטעינה מהירה: 0-50% ב-30 דקות',
      'מנגנון חימום עצמי לטיסה בטמפרטורות נמוכות',
      'מערכת ניהול סוללה חכמה (BMS)',
      'תצוגת LED למצב הסוללה',
      'תאימות: רחפני DJI Matrice 300 RTK ו-Matrice 350 RTK',
      'אורך חיים: כ-400 מחזורי טעינה מלאים',
      'מערכת IP55 לעמידות בפני אבק ומים'
    ]
  },
  {
    id: '15',
    name: 'BS65 Charging Station',
    description: 'תחנת טעינה מקצועית לסוללות TB65',
    category: 'accessories',
    price: '₪4,999',
    priceUSD: '$1,100.00',
    slug: 'bs65-charging-station',
    image: '/images/BS65 Charging Station.jpg',
    specs: [
      'טעינה של עד 4 סוללות TB65 במקביל',
      'הספק טעינה כולל: 1880W (470W לכל סוללה)',
      'זמן טעינה: כ-70 דקות לטעינה מלאה',
      'תצוגת LCD צבעונית למצב טעינה',
      'מערכת קירור אקטיבי למניעת התחממות יתר',
      'חיבור חשמל תלת-פאזי או חד-פאזי',
      'מתח כניסה: 220-240V AC',
      'תדר: 50/60Hz',
      'הגנה מפני קצר, מתח יתר וזרם יתר',
      'משקל: 8.5 ק"ג',
      'מידות: 501 × 403 × 252 מ"מ',
      'טמפרטורת הפעלה: 5°C עד 40°C',
      'תאימות: סוללות TB65 בלבד',
      'יציאת USB לעדכוני קושחה',
      'אפשרות לקביעת סדר עדיפות לטעינת סוללות'
    ]
  },
  {
    id: '16',
    name: 'DJI H20 Camera',
    description: 'מצלמה היברידית לשימוש תעשייתי',
    category: 'cameras',
    price: '₪28,000',
    priceUSD: '$7,800.00',
    slug: 'dji-h20-camera',
    image: '/images/DJI H20 Camera.jpg',
    specs: [
      'מצלמה היברידית עם חיישן 1/1.7 אינץ\'',
      'רזולוציית תמונות: 20MP',
      'צילום וידאו: 4K/30fps',
      'זום אופטי x20 (עד x200 היברידי)',
      'מדידת מרחק בלייזר: טווח 3-1200 מטר',
      'דיוק מדידה: ±1 מטר',
      'שדה ראייה: 73.6° (רחב) עד 4.0° (טלה)',
      'צמצם: f/2.8 (רחב) עד f/4.2 (טלה)',
      'ISO: 100-12800',
      'מהירות תריס: 1/8000-8 שניות',
      'ייצוב תמונה: אלקטרוני + מכני 3 צירים',
      'פורמטים: JPEG, DNG (RAW), MP4, MOV',
      'טמפרטורת הפעלה: -20°C עד 50°C',
      'עמידות: IP44',
      'משקל: 828 גרם',
      'תאימות: רחפני DJI Matrice 300 RTK ו-Matrice 350 RTK'
    ]
  },
  {
    id: '17',
    name: 'DJI H20T Camera',
    description: 'מצלמה היברידית עם יכולות תרמיות מתקדמות',
    category: 'cameras',
    price: '₪36,000',
    priceUSD: '$10,000.00',
    slug: 'dji-h20t-camera',
    image: '/images/DJI H20T Camera.jpg',
    specs: [
      'זום אופטי x20',
      'חיישן תרמי ברזולוציה גבוהה',
      'מדידת טמפרטורה מדויקת',
      'צילום לילה מתקדם'
    ]
  },
  {
    id: '18',
    name: 'FPV Remote Controller',
    description: 'שלט רחוק מקצועי לטיסות FPV',
    category: 'controllers',
    price: '₪1,499',
    priceUSD: '$500.00',
    slug: 'fpv-remote-controller',
    image: '/images/FPV Remote Controller.jpg',
    specs: [
      'מקלות בדיוק גבוה',
      'סוללה נטענת',
      'תאימות למשקפי FPV',
      'חיבור אנטנות חיצוניות'
    ]
  },
  {
    id: '19',
    name: 'DJI Air 2S + Smart RC',
    description: 'רחפן מקצועי עם שלט חכם מובנה',
    category: 'professional',
    price: '₪4,699',
    priceUSD: '$1,300.00',
    slug: 'dji-air-2s-smart-rc',
    image: '/images/Avata 1.jpg',
    specs: [
      'מצלמת 5.4K',
      'חיישן 1-אינץ\'',
      'זמן טיסה: עד 31 דקות',
      'שלט חכם עם מסך מובנה'
    ],
    includes: [
      'רחפן Air 2S',
      'שלט רחוק DJI Smart Controller',
      'סוללה אחת',
      'מטען',
      'כבלים'
    ]
  },
  {
    id: '20',
    name: 'DJI Air 2S Standard RC',
    description: 'רחפן מקצועי עם שלט סטנדרטי',
    category: 'professional',
    price: '₪3,999',
    priceUSD: '$1,100.00',
    slug: 'dji-air-2s-standard-rc',
    image: '/images/DJI Air 2S Standard RC.jpg',
    specs: [
      'מצלמת 5.4K',
      'חיישן 1-אינץ\'',
      'זמן טיסה: עד 31 דקות',
      'שלט סטנדרטי'
    ],
    includes: [
      'רחפן Air 2S',
      'שלט רחוק RC-N1',
      'סוללה אחת',
      'מטען',
      'כבלים'
    ]
  },
  {
    id: '21',
    name: 'Avata 2 Drone Only',
    description: 'רחפן FPV Avata 2 בלבד, ללא שלט או משקפיים',
    category: 'compact',
    price: '₪2,499',
    priceUSD: '$700.00',
    slug: 'avata-2-drone-only',
    image: '/images/Avata 2 Drone Only.jpg',
    specs: [
      'מצלמת 4K/120fps',
      'זמן טיסה: עד 23 דקות',
      'משקל: 380 גרם',
      'מערכת ייצוב תמונה מתקדמת'
    ],
    includes: [
      'רחפן Avata 2 בלבד',
      'סוללה אחת',
      'מטען בסיסי',
      'כבלים'
    ]
  },
  {
    id: '22',
    name: 'RC Motion 2',
    description: 'שלט תנועה מתקדם לרחפני FPV',
    category: 'controllers',
    price: '₪1,200',
    priceUSD: '$350.00',
    slug: 'rc-motion-2',
    image: '/images/RC Motion 2.jpg',
    specs: [
      'שליטה אינטואיטיבית',
      'חיישני תנועה מדויקים',
      'סוללה נטענת',
      'תאימות עם רחפני Avata'
    ]
  },
  {
    id: '23',
    name: 'Avata 1 + 3 Batteries',
    description: 'רחפן FPV Avata עם 3 סוללות',
    category: 'compact',
    price: '₪4,500',
    priceUSD: '$1,250.00',
    slug: 'avata-1-3-batteries',
    image: '/images2/jigly.jpg',
    specs: [
      'מצלמת 4K/60fps',
      '3 סוללות מקוריות',
      'זמן טיסה מורחב',
      'מערכת ייצוב תמונה'
    ],
    includes: [
      'רחפן Avata',
      '3 סוללות',
      'מטען',
      'כבלים'
    ]
  },
  {
    id: '24',
    name: 'Avata 1 Drone Only',
    description: 'רחפן FPV Avata בלבד, ללא שלט או משקפיים',
    category: 'compact',
    price: '₪2,200',
    priceUSD: '$620.00',
    slug: 'avata-1-drone-only',
    image: '/images/Avata 1 Drone Only.jpg',
    specs: [
      'מצלמת 4K/60fps',
      'זמן טיסה: עד 18 דקות',
      'משקל: 410 גרם',
      'מערכת ייצוב תמונה'
    ],
    includes: [
      'רחפן Avata בלבד',
      'סוללה אחת',
      'מטען בסיסי',
      'כבלים'
    ]
  },
  {
    id: '25',
    name: 'Avata 1 Goggle',
    description: 'משקפי FPV לרחפני Avata',
    category: 'accessories',
    price: '₪1,600',
    priceUSD: '$450.00',
    slug: 'avata-1-goggle',
    image: '/images/Avata 1 Goggle.jpg',
    specs: [
      'רזולוציה גבוהה',
      'שידור HD',
      'נוחות מרבית',
      'סוללה מובנית'
    ]
  },
  {
    id: '26',
    name: 'Avata 1 RC',
    description: 'שלט רחוק לרחפני Avata',
    category: 'controllers',
    price: '₪1,600',
    priceUSD: '$450.00',
    slug: 'avata-1-rc',
    image: '/images/Avata 1 RC.jpg',
    specs: [
      'מקלות בדיוק גבוה',
      'סוללה נטענת',
      'תאימות מלאה',
      'עיצוב ארגונומי'
    ]
  },
  {
    id: '27',
    name: 'RC 3 FPV',
    description: 'שלט רחוק מתקדם לטיסות FPV',
    category: 'controllers',
    price: '₪1,950',
    priceUSD: '$550.00',
    slug: 'rc-3-fpv',
    image: '/images/RC 3 FPV.jpg',
    specs: [
      'מקלות בדיוק גבוה',
      'סוללה נטענת',
      'תאימות עם משקפי FPV',
      'חיבור אנטנות חיצוניות'
    ]
  },
  {
    id: '28',
    name: 'Motion Controller',
    description: 'שלט תנועה לרחפני FPV',
    category: 'controllers',
    price: '₪1,100',
    priceUSD: '$300.00',
    slug: 'motion-controller',
    image: '/images/Motion Controller.jpg',
    specs: [
      'שליטה אינטואיטיבית',
      'חיישני תנועה',
      'סוללה נטענת',
      'תאימות עם רחפני FPV'
    ]
  },
  {
    id: '29',
    name: 'Multi Charger EVO',
    description: 'מטען מרובה לסוללות רחפני Autel EVO',
    category: 'accessories',
    price: '₪750',
    priceUSD: '$210.00',
    slug: 'multi-charger-evo',
    image: '/images/Multi Charger EVO.jpg',
    specs: [
      'טעינה של עד 4 סוללות במקביל',
      'תצוגת מצב טעינה',
      'קירור אקטיבי',
      'תאימות עם סוללות EVO'
    ]
  },
  {
    id: '30',
    name: 'EVO Propeller',
    description: 'פרופלורים מקוריים לרחפני Autel EVO',
    category: 'accessories',
    price: '₪55',
    priceUSD: '$15.00',
    slug: 'evo-propeller',
    image: '/images/EVO Propeller.jpg',
    specs: [
      'סט של 2 זוגות',
      'עיצוב מתקדם לטיסה שקטה',
      'עמידות גבוהה',
      'התקנה פשוטה'
    ]
  },
  {
    id: '31',
    name: 'FPV Battery',
    description: 'סוללה לשלטי FPV ומשקפיים',
    category: 'batteries',
    price: '₪180',
    priceUSD: '$50.00',
    slug: 'fpv-battery',
    image: '/images/FPV Battery.jpg',
    specs: [
      'קיבולת גבוהה',
      'זמן שימוש ארוך',
      'תאימות עם מגוון מוצרי FPV',
      'טעינה מהירה'
    ]
  },
  {
    id: '32',
    name: 'Mavic 2 Battery',
    description: 'סוללה מקורית לרחפני Mavic 2',
    category: 'batteries',
    price: '₪850',
    priceUSD: '$240.00',
    slug: 'mavic-2-battery',
    image: '/images/Mavic 2 Battery.jpg',
    specs: [
      'קיבולת: 3850mAh',
      'מתח: 15.4V',
      'זמן טיסה: עד 31 דקות',
      'משקל: 297 גרם'
    ]
  },
  {
    id: '33',
    name: 'Mini 3/4 Battery',
    description: 'סוללה מקורית לרחפני Mini 3 ו-Mini 4',
    category: 'batteries',
    price: '₪410',
    priceUSD: '$115.00',
    slug: 'mini-3-4-battery',
    image: '/images/Mini 3-4 Battery.jpg',
    specs: [
      'קיבולת: 2453mAh',
      'מתח: 7.38V',
      'זמן טיסה: עד 38 דקות',
      'משקל: 80.5 גרם'
    ]
  },
  {
    id: '34',
    name: 'Mini 4 Plus Battery',
    description: 'סוללה מוגדלת לרחפני Mini 4 Pro',
    category: 'batteries',
    price: '₪450',
    priceUSD: '$125.00',
    slug: 'mini-4-plus-battery',
    image: '/images/Mini 4 Plus Battery.jpg',
    specs: [
      'קיבולת: 3050mAh',
      'מתח: 7.38V',
      'זמן טיסה: עד 45 דקות',
      'משקל: 121 גרם'
    ]
  },
  {
    id: '35',
    name: 'Solar Panel',
    description: 'פאנל סולארי נייד לטעינת סוללות בשטח',
    category: 'accessories',
    price: '₪1,250',
    priceUSD: '$350.00',
    slug: 'solar-panel',
    image: '/images/Solar Panel.jpg',
    specs: [
      'הספק: 100W',
      'מתקפל וקל לנשיאה',
      'עמידות בתנאי שטח',
      'תאימות עם מגוון מטענים'
    ]
  },
  {
    id: '36',
    name: 'TB30 Charger',
    description: 'מטען מקצועי לסוללות TB30',
    category: 'accessories',
    price: '₪2,850',
    priceUSD: '$800.00',
    slug: 'tb30-charger',
    image: '/images/TB30 Charger.jpg',
    specs: [
      'טעינה של עד 4 סוללות במקביל',
      'תצוגת מצב טעינה',
      'קירור אקטיבי',
      'טעינה מהירה'
    ]
  },
  {
    id: '37',
    name: 'FPV Charger',
    description: 'מטען לסוללות FPV',
    category: 'accessories',
    price: '₪430',
    priceUSD: '$120.00',
    slug: 'fpv-charger',
    image: '/images/FPV Charger.jpg',
    specs: [
      'טעינה של עד 3 סוללות במקביל',
      'תצוגת מצב טעינה',
      'הגנה מפני טעינת יתר',
      'תאימות עם סוללות FPV'
    ]
  },
  {
    id: '38',
    name: 'Mavic 3 Speaker',
    description: 'רמקול לרחפני Mavic 3',
    category: 'accessories',
    price: '₪1,450',
    priceUSD: '$400.00',
    slug: 'mavic-3-speaker',
    image: '/images/Mavic 3 Speaker.jpg',
    specs: [
      'עוצמת שמע גבוהה',
      'משקל קל',
      'התקנה פשוטה',
      'סוללה נטענת'
    ]
  },
  {
    id: '39',
    name: 'Dongle Mavic 3',
    description: 'דונגל תקשורת לרחפני Mavic 3',
    category: 'accessories',
    price: '₪180',
    priceUSD: '$50.00',
    slug: 'dongle-mavic-3',
    image: '/images/Dongle Mavic 3.jpg',
    specs: [
      'שיפור קליטה',
      'התקנה פשוטה',
      'תאימות מלאה עם Mavic 3',
      'עמידות גבוהה'
    ]
  },
  {
    id: '40',
    name: 'Cellular Mavic 3',
    description: 'מודול סלולרי לרחפני Mavic 3',
    category: 'accessories',
    price: '₪70',
    priceUSD: '$20.00',
    slug: 'cellular-mavic-3',
    image: '/images/Cellular Mavic 3.jpg',
    specs: [
      'תקשורת סלולרית',
      'התקנה פשוטה',
      'תאימות עם כל הרשתות',
      'צריכת חשמל נמוכה'
    ]
  },
  {
    id: '41',
    name: 'One EVO Battery',
    description: 'סוללה מקורית לרחפני Autel EVO',
    category: 'batteries',
    price: '₪1,500',
    priceUSD: '$420.00',
    slug: 'one-evo-battery',
    image: '/images/One EVO Battery.jpg',
    specs: [
      'קיבולת גבוהה',
      'זמן טיסה ארוך',
      'תאימות עם רחפני EVO',
      'טעינה מהירה'
    ]
  },
  {
    id: '42',
    name: 'EVO Battery',
    description: 'סוללה סטנדרטית לרחפני Autel EVO',
    category: 'batteries',
    price: '₪1,200',
    priceUSD: '$340.00',
    slug: 'evo-battery',
    image: '/images/EVO Battery.jpg',
    specs: [
      'קיבולת: 4300mAh',
      'מתח: 11.55V',
      'זמן טיסה: עד 35 דקות',
      'משקל: 365 גרם'
    ]
  },
  {
    id: '43',
    name: 'XT2 Camera',
    description: 'מצלמה תרמית מקצועית',
    category: 'cameras',
    price: '₪24,500',
    priceUSD: '$6,800.00',
    slug: 'xt2-camera',
    image: '/images/XT2 Camera.jpg',
    specs: [
      'רזולוציה תרמית גבוהה',
      'חיישן אופטי 4K',
      'מדידת טמפרטורה מדויקת',
      'תאימות עם רחפנים מקצועיים'
    ]
  },
  {
    id: '44',
    name: 'H30T Camera',
    description: 'מצלמה היברידית מתקדמת',
    category: 'cameras',
    price: '₪45,000',
    priceUSD: '$12,500.00',
    slug: 'h30t-camera',
    image: '/images/H30T Camera.jpg',
    specs: [
      'זום אופטי x30',
      'חיישן תרמי ברזולוציה גבוהה',
      'מדידת טמפרטורה מדויקת',
      'צילום לילה מתקדם'
    ]
  },
  {
    id: '45',
    name: 'Power 1000',
    description: 'תחנת כוח ניידת לשימוש בשטח',
    category: 'accessories',
    price: '₪3,950',
    priceUSD: '$1,100.00',
    slug: 'power-1000',
    image: '/images/Power 1000.jpg',
    specs: [
      'קיבולת: 1000Wh',
      'יציאות מרובות',
      'טעינה סולארית',
      'תצוגה דיגיטלית'
    ]
  },
  {
    id: '46',
    name: 'SIM Cards',
    description: 'כרטיסי SIM לרחפנים עם תקשורת סלולרית',
    category: 'accessories',
    price: '₪55',
    priceUSD: '$15.00',
    slug: 'sim-cards',
    image: '/images/SIM Cards.jpg',
    specs: [
      'תקשורת נתונים מהירה',
      'כיסוי גלובלי',
      'התקנה פשוטה',
      'תאימות עם כל הרחפנים הסלולריים'
    ]
  },
  {
    id: '47',
    name: 'Spare Parts Drone',
    description: 'ערכת חלקי חילוף לרחפנים',
    category: 'accessories',
    price: '₪215',
    priceUSD: '$60.00',
    slug: 'spare-parts-drone',
    image: '/images/Spare Parts Drone.jpg',
    specs: [
      'כולל פרופלורים',
      'רגליים',
      'ברגים',
      'כלי עבודה'
    ]
  },
  {
    id: '48',
    name: 'Spare Parts Wind',
    description: 'חלקי חילוף למגן רוח',
    category: 'accessories',
    price: '₪125',
    priceUSD: '$35.00',
    slug: 'spare-parts-wind',
    image: '/images/Spare Parts Wind.jpg',
    specs: [
      'מגני רוח',
      'התקנה פשוטה',
      'עמידות גבוהה',
      'תאימות עם מגוון רחפנים'
    ]
  },
  {
    id: '49',
    name: 'M30T Propeller',
    description: 'פרופלורים מקוריים לרחפן Matrice 30T',
    category: 'accessories',
    price: '₪125',
    priceUSD: '$35.00',
    slug: 'm30t-propeller',
    image: '/images/M30T Propeller.jpg',
    specs: [
      'סט של 2 זוגות',
      'עיצוב מתקדם לטיסה שקטה',
      'עמידות גבוהה',
      'התקנה פשוטה'
    ]
  },
  {
    id: '50',
    name: 'Drone Case',
    description: 'תיק קשיח לרחפן ואביזרים',
    category: 'accessories',
    price: '₪1,800',
    priceUSD: '$500.00',
    slug: 'drone-case',
    image: '/images/Drone Case.jpg',
    specs: [
      'חומר: פוליפרופילן עמיד במיוחד',
      'עמידות למים ואבק לפי תקן IP67',
      'עמידות בפני מכות וזעזועים',
      'ריפוד פנימי מותאם מקצף בצפיפות גבוהה',
      'ידית נשיאה טלסקופית וגלגלים',
      'רצועת כתף מרופדת ניתנת להסרה',
      'מקום לרחפן, שלט, עד 6 סוללות ואביזרים נוספים',
      'מנגנון נעילה כפול עם אפשרות למנעול',
      'שסתום לאיזון לחץ אוויר',
      'מידות חיצוניות: 55 × 44 × 25 ס"מ',
      'מידות פנימיות: 50 × 39 × 20 ס"מ',
      'משקל: 4.5 ק"ג',
      'טמפרטורת הפעלה: -30°C עד 90°C',
      'צבעים זמינים: שחור, צהוב, כתום'
    ]
  },
  {
    id: '51',
    name: 'DJI Avata Explorer Combo',
    description: 'רחפן FPV מתקדם עם משקפי DJI Goggles 2 ושלט Motion Controller',
    category: 'professional',
    price: '₪4,290',
    priceUSD: '$1,200.00',
    slug: 'dji-avata-explorer-combo',
    image: '/images/DJI Avata Explorer Combo.jpg',
    specs: [
      'מצלמה עם חיישן 1/1.7 אינץ\' ורזולוציית 48MP',
      'צילום וידאו 4K/60fps עם HDR',
      'זווית צילום רחבה של 155°',
      'ייצוב תמונה אלקטרוני RockSteady 2.0',
      'זמן טיסה: עד 18 דקות',
      'משקל: 410 גרם',
      'מהירות מקסימלית: 97 קמ"ש במצב ידני',
      'טווח שידור: עד 10 ק"מ עם טכנולוגיית O3+',
      'מערכת הגנה מפני התנגשות עם חיישנים תחתונים',
      'מצבי טיסה: רגיל, ספורט וידני',
      'כולל משקפי DJI Goggles 2 עם רזולוציית 1080p/100fps',
      'כולל שלט Motion Controller לשליטה אינטואיטיבית',
      'אחסון פנימי: 20GB',
      'תמיכה בכרטיסי microSD עד 256GB',
      'טמפרטורת הפעלה: 0°C עד 40°C'
    ],
    includes: [
      'רחפן DJI Avata',
      'משקפי DJI Goggles 2',
      'שלט Motion Controller',
      'סוללה אחת',
      'מטען',
      'כבלים',
      'פרופלורים נוספים',
      'תיק נשיאה'
    ],
    inStock: true
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