import { ReactNode } from 'react';

export interface ProductSpec {
  processor?: string;
  ramStorage?: string;
  rearCamera?: string;
  frontCamera?: string;
  battery?: string;
  display?: string;
  antutuScore?: string;
  [key: string]: string | undefined;
}

export interface Deal {
  id: string;
  category: string;
  title: string;
  store: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
  affiliateLink: string;
  releaseDate?: string;
  specScore?: number;
  specs?: ProductSpec;
  userRating?: number;
  ratingCount?: number;
  expertRating?: string;
  gallery?: string[];
  awards?: string[];
}

export const allDeals: Deal[] = [
  // --- SMARTPHONES ---
  {
  id: 's1',
  category: 'smartphones',
  title: 'iQOO 15 (Legend, 12GB RAM, 256GB Storage)',
  store: 'Amazon',
  originalPrice: 76999,
  discountedPrice: 72999,
  imageUrl: 'https://m.media-amazon.com/images/I/61OB0B7FA-L._SL1200_.jpg',
  affiliateLink: 'https://amzn.to/3Q1a270',
  releaseDate: '2026',
  specScore: 97,
  userRating: 4.7,
  ratingCount: 1284,
  expertRating: '9.4/10',
  awards: ['Fastest Android Phone', 'Best Gaming Smartphone'],
  specs: {
    processor: 'Snapdragon 8 Elite Gen 5 Processor',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 50 MP + 64 MP Rear Camera',
    frontCamera: '32 MP Front Camera',
    battery: '6000 mAh | 120W Fast Charging',
    display: 'Samsung 2K M14 LTPO OLED Display',
    os: 'Origin OS 6 - Out of the Box',
    antutuScore: '2,150,000'
  }
}
  ,
 {
  id: 's2',
  category: 'smartphones',
  title: 'Samsung Galaxy S25 Ultra 5G AI Smartphone (Titanium Silverblue, 12GB RAM, 256GB Storage)',
  store: 'Amazon',
  originalPrice: 129999,
  discountedPrice: 99999,
  imageUrl: 'https://m.media-amazon.com/images/I/71tz3adVWaL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/49fAFvx',
  releaseDate: '2025',
  specScore: 99,
  userRating: 4.9,
  ratingCount: 2145,
  expertRating: '9.8/10',
  awards: ['Best Flagship Smartphone', 'Best Camera Phone'],
  specs: {
    processor: 'Snapdragon 8 Elite for Galaxy',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '200 MP + 50 MP + 50 MP + 10 MP Rear Camera',
    frontCamera: '12 MP Front Camera',
    battery: '5000 mAh | 45W Fast Charging',
    display: '6.9 inches Dynamic AMOLED 2X Display',
    os: 'Android 15 | One UI 7',
    features: 'S Pen Included | Galaxy AI Features',
    durability: 'Titanium Frame | IP68 Water Resistant',
    antutuScore: '2,300,000'
  }
},
  {
  id: 's3',
  category: 'smartphones',
  title: 'OnePlus 13R | Smarter with OnePlus AI (12GB RAM, 256GB Storage, Nebula Noir)',
  store: 'Amazon',
  originalPrice: 44999,
  discountedPrice: 41999,
  imageUrl: 'https://m.media-amazon.com/images/I/614obdQ0iYL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/4dJ6HS7',
  releaseDate: '2025',
  specScore: 96,
  userRating: 4.7,
  ratingCount: 1876,
  expertRating: '9.3/10',
  awards: ['Best Performance Phone', 'Best Value Flagship'],
  specs: {
    processor: 'Snapdragon 8 Gen 3 Processor',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 8 MP + 2 MP Rear Camera',
    frontCamera: '16 MP Front Camera',
    battery: '6000 mAh | 100W SUPERVOOC Fast Charging',
    display: '6.78 inches 1.5K AMOLED Display | 120Hz Refresh Rate',
    os: 'OxygenOS 15 based on Android 15',
    features: 'OnePlus AI Features | AI Photo Enhancement',
    durability: 'IP65 Water & Dust Resistance',
    antutuScore: '2,050,000'
  }
},
{
  id: 's4',
  category: 'smartphones',
  title: 'Google Pixel 10 (Lemongrass, 256 GB) (12 GB RAM)',
  store: 'Flipkart',
  originalPrice: 79999,
  discountedPrice: 74999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/i/8/y/-original-imahfjsfdmpbbhhb.jpeg?q=90',
  affiliateLink: 'https://fktr.in/FZdJIcc',
  releaseDate: '2025',
  specScore: 97,
  userRating: 4.8,
  ratingCount: 1432,
  expertRating: '9.4/10',
  awards: ['Best AI Smartphone', 'Best Camera Experience'],
  specs: {
    processor: 'Google Tensor G5 Processor',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 48 MP Dual Rear Camera',
    frontCamera: '12 MP Front Camera',
    battery: '5100 mAh | Fast Charging',
    display: '6.3 inches OLED Display | 120Hz Refresh Rate',
    os: 'Android 15',
    features: 'Google AI Features | Magic Eraser | Circle to Search',
    durability: 'IP68 Water & Dust Resistant',
    antutuScore: '1,850,000'
  }
},
 {
  id: 's5',
  category: 'smartphones',
  title: 'iQOO 15R (Triumph Silver, 8GB RAM, 256GB Storage)',
  store: 'Amazon',
  originalPrice: 49999,
  discountedPrice: 46999,
  imageUrl: 'https://m.media-amazon.com/images/I/61D48zQmROL._SL1200_.jpg',
  affiliateLink: 'https://amzn.to/3RniMF3',
  releaseDate: '24 Feb, 2026',
  specScore: 93,
  userRating: 4.4,
  ratingCount: 723,
  expertRating: '8.6/10',
  awards: ['Best Phones Under Rs. 50,000', 'Great Camera Phones'],
  specs: {
    processor: 'Qualcomm Snapdragon 8 Gen 5 SM8845',
    ramStorage: '8 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 8 MP Dual Rear Camera',
    frontCamera: '32 MP Front Camera',
    battery: '7600 mAh | 100W Super Flash Charging',
    display: '6.59 inches AMOLED | 144Hz Refresh Rate',
    os: 'Android 16 | Origin OS',
    features: '144FPS Stable Gaming | IP68 + IP69 Rating',
    antutuScore: '3,078,708'
  }
},



{
  id: 's6',
  category: 'smartphones',
  title: 'Motorola Edge 70 Fusion (Pantone SILHOUETTE, 128 GB)',
  store: 'Flipkart',
  originalPrice: 29999,
  discountedPrice: 24999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/k/8/b/-original-imahha4yffqynu9x.jpeg?q=90',
  affiliateLink: 'https://fktr.in/ED68L8K',
  releaseDate: '06 Mar, 2026',
  specScore: 86,
  userRating: 4.4,
  ratingCount: 7132,
  expertRating: '8.5/10',
  awards: ['Best Battery Smartphone', 'Best Display Under 30K'],
  specs: {
    processor: 'Qualcomm Snapdragon 7s Gen 4',
    ramStorage: '8 GB RAM | 128 GB Storage',
    rearCamera: '50 MP + 13 MP Rear Camera',
    frontCamera: '32 MP Front Camera',
    battery: '7000 mAh | 68W TurboPower Charging',
    display: '6.8 inches Extreme AMOLED | 144Hz',
    os: 'Android 16 | Hello UI',
    features: 'Pantone Validated Design | Gorilla Glass Protection',
    antutuScore: '1,149,292'
  }
},




{
  id: 's7',
  category: 'smartphones',
  title: 'Samsung Galaxy S26 5G (Cobalt Violet, 12GB RAM, 256GB Storage)',
  store: 'Amazon',
  originalPrice: 94999,
  discountedPrice: 89999,
  imageUrl: 'https://m.media-amazon.com/images/I/71N8YkTS0TL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/4vcSa8p',
  releaseDate: '2026',
  specScore: 98,
  userRating: 4.8,
  ratingCount: 1652,
  expertRating: '9.5/10',
  awards: ['Best AI Smartphone', 'Best Compact Flagship'],
  specs: {
    processor: 'Customized Galaxy AI Processor',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 12 MP + 10 MP Triple Rear Camera',
    frontCamera: '12 MP Front Camera',
    battery: '4300 mAh | Fast Charging',
    display: '6.4 inches Dynamic AMOLED 2X | 120Hz',
    os: 'Android 16 | One UI 8',
    features: 'Galaxy AI | Photo Assist | Creative Studio | ProVisual Engine',
    durability: 'IP68 Water & Dust Resistance',
    antutuScore: '2,120,000'
  }
},





{
  id: 's8',
  category: 'smartphones',
  title: 'Nothing Phone (4a) (White, 128 GB) (8 GB RAM)',
  store: 'Flipkart',
  originalPrice: 40999,
  discountedPrice: 34999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/7/u/h/-original-imahm57ug4fsagjw.jpeg?q=90',
  affiliateLink: 'https://fktr.in/WjH0mrk',
  releaseDate: '05 Mar, 2026',
  specScore: 89,
  userRating: 4.5,
  ratingCount: 982,
  expertRating: '8.8/10',
  awards: ['Best Unique Design', 'Best Mid-Range Smartphone'],
  specs: {
    processor: 'Snapdragon 7s Gen 4',
    ramStorage: '8 GB RAM | 128 GB Storage',
    rearCamera: '50 MP + 8 MP + 50 MP Rear Camera',
    frontCamera: '32 MP Front Camera',
    battery: '5400 mAh | 50W Fast Charging',
    display: '6.78 inches AMOLED | 120Hz Refresh Rate',
    os: 'Nothing OS 4.1 based on Android 16',
    features: 'Glyph Interface | AI Smart Features | Transparent Design',
    durability: 'IP64 Splash Resistance',
    antutuScore: '1,250,000'
  }
},
  {
  id: 's9',
  category: 'smartphones',
  title: 'MOTOROLA Edge 50 Pro 5G with 68W Charger (Vanilla Cream, 256 GB) (8 GB RAM)',
  store: 'Flipkart',
  originalPrice: 36999,
  discountedPrice: 29990,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/8/q/r/-original-imah2hnztmkzfyjk.jpeg?q=90',
  affiliateLink: 'https://fktr.in/Hwhyvi7',
  releaseDate: '03 Apr, 2024',
  specScore: 89,
  userRating: 4.5,
  ratingCount: 10432,
  expertRating: '8.9/10',
  awards: ['Best Camera Phone Under 40K', 'Best Curved Display'],
  specs: {
    processor: 'Qualcomm Snapdragon 7 Gen 3',
    ramStorage: '8 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 13 MP + 10 MP Triple Rear Camera',
    frontCamera: '50 MP Front Camera',
    battery: '4500 mAh | 68W TurboPower Charging',
    display: '6.7 inches P-OLED Curved Display | 144Hz',
    os: 'Android 14',
    features: 'Pantone Validated Camera & Display | Dolby Atmos',
    durability: 'IP68 Water Resistance',
    antutuScore: '820,000'
  }
},

{
  id: 's10',
  category: 'smartphones',
  title: 'OPPO Reno14 5G (Pearl White, 256 GB) (8 GB RAM)',
  store: 'Flipkart',
  originalPrice: 42999,
  discountedPrice: 36999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/a/u/k/-original-imahdzg7pc55yuzy.jpeg?q=90',
  affiliateLink: 'https://fktr.in/cBIL7Or/',
  releaseDate: '2025',
  specScore: 87,
  userRating: 4.4,
  ratingCount: 2841,
  expertRating: '8.7/10',
  awards: ['Best Selfie Camera Phone', 'Best Stylish Smartphone'],
  specs: {
    processor: 'MediaTek Dimensity 8350',
    ramStorage: '8 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 8 MP + 2 MP Triple Rear Camera',
    frontCamera: '50 MP Front Camera',
    battery: '5000 mAh | 80W SUPERVOOC Charging',
    display: '6.7 inches AMOLED Display | 120Hz',
    os: 'ColorOS 15 based on Android 15',
    features: 'AI Portrait Camera | AI Eraser',
    durability: 'IP65 Water Resistance',
    antutuScore: '1,320,000'
  }
},

{
  id: 's11',
  category: 'smartphones',
  title: 'vivo X300 FE 5G (Urban Olive, 12GB RAM, 256GB Storage)',
  store: 'Amazon',
  originalPrice: 54999,
  discountedPrice: 51999,
  imageUrl: 'https://m.media-amazon.com/images/I/71dONrOR2hL._SL1500_.jpg',
  affiliateLink: 'https://m.media-amazon.com/images/I/71dONrOR2hL._SL1500_.jpg',
  releaseDate: '2026',
  specScore: 92,
  userRating: 4.6,
  ratingCount: 1985,
  expertRating: '9.0/10',
  awards: ['Best Camera Smartphone', 'Best Battery Backup'],
  specs: {
    processor: 'MediaTek Dimensity 9400e',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 50 MP + 8 MP Triple Rear Camera',
    frontCamera: '50 MP Front Camera',
    battery: '6500 mAh | 90W FlashCharge',
    display: '6.67 inches AMOLED Display | 120Hz',
    os: 'Funtouch OS 16 based on Android 16',
    features: 'ZEISS Camera System | AI Imaging',
    durability: 'IP68 + IP69 Water Resistance',
    antutuScore: '2,050,000'
  }
},
  {
  id: 's12',
  category: 'smartphones',
  title: 'vivo T4 5G (Emerald Blaze, 256 GB) (8 GB RAM)',
  store: 'Flipkart',
  originalPrice: 28999,
  discountedPrice: 26439,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/4/c/b/-original-imahfkvezr4fcets.jpeg?q=90',
  affiliateLink: 'https://fktr.in/7VxVJfN',
  releaseDate: '29 Apr, 2025',
  specScore: 86,
  userRating: 4.4,
  ratingCount: 79332,
  expertRating: '8.4/10',
  awards: ['Best Battery Smartphone', 'Best AMOLED Display'],
  specs: {
    processor: 'Qualcomm Snapdragon 7s Gen 3',
    ramStorage: '8 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 2 MP Dual Rear Camera',
    frontCamera: '32 MP Front Camera',
    battery: '7300 mAh | 90W Flash Charging',
    display: '6.77 inches AMOLED Curved Display | 120Hz',
    os: 'Android 15 | Funtouch OS',
    features: 'IP65 Water Resistance | 4K Video Recording',
    antutuScore: '797,572'
  }
},
{
  id: 's13',
  category: 'smartphones',
  title: 'vivo T4 Pro 5G (Blaze Gold, 256 GB) (12 GB RAM)',
  store: 'Flipkart',
  originalPrice: 36999,
  discountedPrice: 34999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/j/f/0/-original-imahbgqyz5sqhwq9.jpeg?q=90',
  affiliateLink: 'https://fktr.in/Xyv05s5',
  releaseDate: '26 Aug, 2025',
  specScore: 91,
  userRating: 4.5,
  ratingCount: 18119,
  expertRating: '8.2/10',
  awards: ['Best Camera Phone Under 35K', 'Best Curved AMOLED Display'],
  specs: {
    processor: 'Qualcomm Snapdragon 7 Gen 4',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 50 MP + 2 MP Triple Rear Camera',
    frontCamera: '32 MP Front Camera',
    battery: '6500 mAh | 90W Flash Charging',
    display: '6.77 inches AMOLED Curved Display | 120Hz',
    os: 'Android 15 | Funtouch OS',
    features: '50MP Periscope Lens | 100x Zoom | IP68 + IP69',
    antutuScore: '1,010,472'
  }
},
  {
  id: 's14',
  category: 'smartphones',
  title: 'OnePlus Nord 6 (Pitch Black, 12GB RAM, 256GB Storage)',
  store: 'Amazon',
  originalPrice: 56999,
  discountedPrice: 46999	,
  imageUrl: 'https://m.media-amazon.com/images/I/614tE-mOJeL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/4wMiibt',
  releaseDate: '2026',
  specScore: 94,
  userRating: 4.6,
  ratingCount: 4821,
  expertRating: '9.0/10',
  awards: ['Best Gaming Smartphone', 'Best Battery Smartphone'],
  specs: {
    processor: 'Qualcomm Snapdragon 8s Gen 4',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 8 MP + 2 MP Triple Rear Camera',
    frontCamera: '32 MP Front Camera',
    battery: '9000 mAh | 120W SUPERVOOC Charging',
    display: '6.83 inches AMOLED Display | 165Hz Refresh Rate',
    os: 'OxygenOS 16 based on Android 16',
    features: '165FPS Stable Gaming | Personalized AI | IP69 Rating',
    antutuScore: '2,180,000'
  }
},

{
  id: 's15',
  category: 'smartphones',
  title: 'Samsung Galaxy A57 5G',
  store: 'Amazon',
  originalPrice: 75999,
  discountedPrice: 55499,
  imageUrl: 'https://m.media-amazon.com/images/I/61YMgRVX9eL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/4tSefI0',
  releaseDate: '2026',
  specScore: 88,
  userRating: 4.5,
  ratingCount: 2534,
  expertRating: '8.7/10',
  awards: ['Best Samsung Midrange Phone', 'Best AMOLED Display'],
  specs: {
    processor: 'Exynos 1680 Processor',
    ramStorage: '8 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 12 MP + 5 MP Triple Rear Camera',
    frontCamera: '32 MP Front Camera',
    battery: '5000 mAh | 45W Fast Charging',
    display: '6.7 inches Super AMOLED+ | 120Hz',
    os: 'Android 16 | One UI 8',
    features: 'Galaxy AI Features | Knox Security',
    durability: 'IP67 Water Resistance',
    antutuScore: '1,420,000'
  }
},
{
  id: 's16',
  category: 'smartphones',
  title: 'vivo V70 FE',
  store: 'Flipkart',
  originalPrice: 47999,
  discountedPrice: 44999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/h/h/7/-original-imahm32hdjsy7wmg.jpeg?q=90',
  affiliateLink: 'https://fktr.in/Mcsoonw',
  releaseDate: '2026',
  specScore: 90,
  userRating: 4.5,
  ratingCount: 1842,
  expertRating: '8.8/10',
  awards: ['Best Selfie Camera Phone', 'Best Slim Design'],
  specs: {
    processor: 'MediaTek Dimensity 8400',
    ramStorage: '8 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 8 MP Dual Rear Camera',
    frontCamera: '50 MP Front Camera',
    battery: '6500 mAh | 90W FlashCharge',
    display: '6.78 inches AMOLED Curved Display | 120Hz',
    os: 'Android 16 | Funtouch OS',
    features: 'Aura Light Portrait | AI Imaging',
    durability: 'IP68 Water Resistance',
    antutuScore: '1,560,000'
  }
},
{
  id: 's17',
  category: 'smartphones',
  title: 'vivo V70',
  store: 'Flipkart',
  originalPrice: 50999,
  discountedPrice: 49999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/t/b/d/-original-imahktczgyj5yhva.jpeg?q=90',
  affiliateLink: 'https://fktr.in/r0x85S1',
  releaseDate: '2026',
  specScore: 92,
  userRating: 4.6,
  ratingCount: 2311,
  expertRating: '9.0/10',
  awards: ['Best Portrait Camera', 'Best Premium Midrange Phone'],
  specs: {
    processor: 'MediaTek Dimensity 9300',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 50 MP + 8 MP Triple Rear Camera',
    frontCamera: '50 MP Front Camera',
    battery: '6000 mAh | 100W FlashCharge',
    display: '6.82 inches AMOLED Curved Display | 144Hz',
    os: 'Android 16 | Funtouch OS',
    features: 'ZEISS Camera System | AI Portrait Studio',
    durability: 'IP68 + IP69 Water Resistance',
    antutuScore: '2,020,000'
  }
},

{
  id: 's18',
  category: 'smartphones',
  title: 'realme 16 Pro',
  store: 'Flipkart',
  originalPrice: 44999,
  discountedPrice: 36999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/k/w/q/-original-imahmbuvj9y32hdd.jpeg?q=90',
  affiliateLink: 'https://fktr.in/SgYO0cj',
  releaseDate: '2026',
  specScore: 89,
  userRating: 4.4,
  ratingCount: 2938,
  expertRating: '8.7/10',
  awards: ['Best Gaming Phone Under 35K', 'Best Fast Charging Phone'],
  specs: {
    processor: 'Qualcomm Snapdragon 8s Gen 3',
    ramStorage: '12 GB RAM | 256 GB Storage',
    rearCamera: '50 MP + 8 MP + 2 MP Triple Rear Camera',
    frontCamera: '32 MP Front Camera',
    battery: '7000 mAh | 120W SUPERVOOC Charging',
    display: '6.78 inches AMOLED Display | 144Hz',
    os: 'realme UI 7 based on Android 16',
    features: 'GT Gaming Mode | AI Smart Loop',
    durability: 'IP65 Water Resistance',
    antutuScore: '1,950,000'
  }
},
  
  // --- LAPTOPS ---
  {
  id: 'l1',
  category: 'laptops',
  title: 'Apple 2026 MacBook Neo 13″ Laptop with A18 Pro Chip, 8GB/256GB, Indigo',
  store: 'Amazon',
  originalPrice: 69900,
  discountedPrice: 65000,
  imageUrl: 'https://m.media-amazon.com/images/I/61vTx-Qa1QL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/49fTvmf',
  specs: {
    processor: 'Apple A18 Pro Chip',
    ramStorage: '8GB Unified Memory | 256GB SSD Storage',
    display: '13-inch Liquid Retina Display',
    camera: '1080p FaceTime HD Camera',
    battery: 'Up to 18 Hours Battery Life',
    os: 'macOS with Apple Intelligence',
    features: 'AI Powered Performance | Touch ID | Backlit Keyboard',
    connectivity: 'Wi-Fi 7 | Bluetooth 5.4 | USB-C',
    audio: 'Spatial Audio Support | Dolby Atmos',
    color: 'Indigo',
    weight: '1.24 kg'
  }
},
{
  id: 'l2',
  category: 'laptops',
  title: 'HP 15 Ryzen 7 Laptop 16GB/512GB Silver',
  store: 'Amazon',
  originalPrice: 60248,
  discountedPrice: 58499,
  imageUrl: 'https://m.media-amazon.com/images/I/713CLhU8hQL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/3RuhUhN',
  specs: {
    processor: 'AMD Ryzen 7 5825U',
    ramStorage: '16GB DDR4 RAM | 512GB SSD',
    graphics: 'AMD Radeon Graphics',
    display: '15.6-inch FHD Micro-Edge Anti-Glare Display',
    os: 'Windows 11 Home',
    office: 'Microsoft Office Home 2024 + M365 Basic (1 Year)',
    camera: 'FHD Camera',
    keyboard: 'Backlit Keyboard',
    battery: 'Fast Charging Support',
    connectivity: 'Wi-Fi 6 | Bluetooth 5.3',
    weight: '1.59 kg',
    color: 'Silver'
  }
},
 {
  id: 'l4',
  category: 'laptops',
  title: 'HP 15 Intel Core i3 13th Gen 1315U 16GB/512GB SSD 15-fd0668TU',
  store: 'Flipkart',
  originalPrice: 65990,
  discountedPrice: 54499,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/i/m/q/-original-imahg53xegyhbrjh.jpeg?q=90',
  affiliateLink: 'https://fktr.in/MDjeXfa',
  specs: {
    processor: 'Intel Core i3 13th Gen 1315U',
    ramStorage: '16GB DDR4 RAM | 512GB SSD',
    graphics: 'Intel UHD Graphics',
    display: '15.6-inch Full HD Micro-Edge Anti-Glare Display',
    refreshRate: '60Hz',
    os: 'Windows 11 Home',
    office: 'MS Office Home 2024',
    camera: '1080p FHD Camera',
    keyboard: 'Full Size Keyboard with Numeric Pad',
    battery: '3-Cell Battery with Fast Charging',
    connectivity: 'Wi-Fi 6 | Bluetooth 5.3 | USB-C',
    weight: '1.59 kg',
    color: 'Natural Silver',
    features: 'Thin & Light Design | Dual Speakers | Anti-Glare Panel'
  }
},
{
  id: 'l5',
  category: 'laptops',
  title: 'HP OmniBook 5 16-ag1045AU Next Gen AI PC',
  store: 'HP Store',
  originalPrice: 93876,
  discountedPrice: 80849,
  imageUrl: 'https://in-media.apjonlinecdn.com/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/h/p/hp-omnibook-5-14-inch-laptop-next-gen-ai-pc-canopyr-glacier-silver-front_4_13.png',
  affiliateLink: 'https://bitli.in/Tx3GLMr',
  specs: {
    processor: 'AMD Ryzen AI 7 Processor',
    ramStorage: '16GB LPDDR5X RAM | 1TB SSD',
    graphics: 'AMD Radeon Graphics',
    display: '16-inch WUXGA IPS Display',
    refreshRate: '120Hz',
    os: 'Windows 11 Home',
    aiFeatures: 'Next Gen AI PC | Microsoft Copilot Support',
    camera: '5MP IR AI Camera with Noise Reduction',
    audio: 'Dual Speakers with DTS:X Ultra',
    battery: 'Long Battery Life with Fast Charge',
    connectivity: 'Wi-Fi 7 | Bluetooth 5.4 | USB-C',
    keyboard: 'Backlit Keyboard',
    weight: '1.79 kg',
    color: 'Silver',
    features: 'AI Productivity Tools | Premium Metal Design | Fingerprint Reader'
  }
},

{
  id: 'l6',
  category: 'laptops',
  title: 'Lenovo IdeaPad Slim 3 12th Gen Core i5',
  store: 'Flipkart',
  originalPrice: 69990,
  discountedPrice: 59990,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/o/t/j/-original-imahg5fxwuwbrzff.jpeg?q=90',
  affiliateLink: 'https://fktr.in/OMhdl1b',
  specs: {
    processor: 'Intel Core i5 12th Gen 1235U',
    ramStorage: '16GB DDR4 RAM | 512GB SSD',
    graphics: 'Intel Integrated UHD Graphics',
    display: '15.6-inch Full HD Anti-Glare Display',
    refreshRate: '60Hz',
    os: 'Windows 11 Home',
    office: 'MS Office Home & Student 2021',
    battery: 'Rapid Charge Support',
    keyboard: 'Backlit Keyboard',
    audio: 'Dolby Audio Speakers',
    connectivity: 'Wi-Fi 6 | Bluetooth 5.1',
    weight: '1.63 kg',
    features: 'Privacy Shutter Camera | TÜV Certified Display'
  }
},
{
  id: 'l7',
  category: 'laptops',
  title: 'ASUS Vivobook S14 (2025) Intel Core i7 13th Gen 13620H',
  store: 'Flipkart',
  originalPrice: 98990,
  discountedPrice: 64990,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/r/g/n/-original-imahg4utfhsycghz.jpeg?q=90',
  affiliateLink: 'https://fktr.in/4dl4Rhh',
  specs: {
    processor: 'Intel Core i7 13th Gen 13620H',
    ramStorage: '16GB DDR5 RAM | 512GB PCIe 4.0 SSD',
    graphics: 'Intel UHD Graphics',
    display: '14-inch WUXGA IPS Anti-Glare Display',
    resolution: '1920 x 1200 Pixels | 16:10 Aspect Ratio',
    refreshRate: '60Hz',
    brightness: '300 nits',
    os: 'Windows 11 Home',
    office: 'Office Home 2024 + Microsoft 365 Basic (1 Year)',
    keyboard: 'Backlit Chiclet Keyboard with Copilot Key',
    camera: 'FHD IR Camera with Privacy Shutter',
    battery: '70Wh 4-Cell Battery | Up to 18 Hours',
    connectivity: 'Wi-Fi 6 | Bluetooth 5.3 | USB-C',
    audio: 'Built-in Speakers with Smart Amplifier',
    durability: 'MIL-STD-810H Military Grade Durability',
    weight: '1.39 Kg',
    color: 'Matte Gray',
    features: 'AI Productivity Features | Face Login | Thin & Light Design'
  }
},
{
  id: 'l8',
  category: 'laptops',
  title: 'MSI Bravo 15 Gaming Ryzen 7',
  store: 'Flipkart',
  originalPrice: 75990,
  discountedPrice: 54990,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/r/2/e/-original-imahg5fxhycx8kqx.jpeg?q=90',
  affiliateLink: 'https://fktr.in/frfY41G',
  specs: {
    processor: 'AMD Ryzen 7 5800H',
    ramStorage: '16GB DDR4 RAM | 512GB SSD',
    graphics: 'AMD Radeon RX 6550M 4GB',
    display: '15.6-inch Full HD IPS Display',
    refreshRate: '144Hz',
    os: 'Windows 11 Home',
    keyboard: 'Red Backlit Gaming Keyboard',
    cooling: 'Cooler Boost 5',
    battery: 'Gaming Optimized Battery',
    connectivity: 'Wi-Fi 6 | Bluetooth 5.2',
    weight: '2.35 kg',
    features: 'Hi-Res Audio | Gaming Mode'
  }
},

{
  id: 'l9',
  category: 'laptops',
  title: 'HP Victus Gaming Intel Core i5 12th Gen',
  store: 'Flipkart',
  originalPrice: 85000,
  discountedPrice: 71000,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/z/q/j/-original-imahg4ut6andh2vr.jpeg?q=90',
  affiliateLink: 'https://fktr.in/k7z4j10',
  specs: {
    processor: 'Intel Core i5 12th Gen 12450H',
    ramStorage: '16GB DDR4 RAM | 512GB SSD',
    graphics: 'NVIDIA RTX 3050 4GB',
    display: '15.6-inch Full HD IPS Display',
    refreshRate: '144Hz',
    os: 'Windows 11 Home',
    cooling: 'Enhanced Thermal Cooling',
    keyboard: 'Backlit Gaming Keyboard',
    audio: 'B&O Audio',
    connectivity: 'Wi-Fi 6 | Bluetooth 5.3',
    weight: '2.29 kg',
    features: 'OMEN Gaming Hub | Fast Charge'
  }
},
{
  id: 'l10',
  category: 'laptops',
  title: 'Acer Predator Helios Neo 16 Core i7',
  store: 'Flipkart',
  originalPrice: 198999,
  discountedPrice: 165900,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/t/x/e/-original-imahg4usgrgaqysd.jpeg?q=90',
  affiliateLink: 'https://fktr.in/7bfW2Ob',
  specs: {
    processor: 'Intel Core i7 14th Gen HX Series',
    ramStorage: '16GB DDR5 RAM | 1TB SSD',
    graphics: 'NVIDIA RTX 4060 8GB',
    display: '16-inch WQXGA IPS Display',
    refreshRate: '240Hz',
    os: 'Windows 11 Home',
    keyboard: '4-Zone RGB Keyboard',
    cooling: 'AeroBlade 3D Cooling',
    audio: 'DTS:X Ultra Audio',
    connectivity: 'Wi-Fi 6E | Thunderbolt 4',
    weight: '2.7 kg',
    features: 'Advanced Optimus | PredatorSense'
  }
},



  // --- EARBUDS / AUDIO ---
{
  id: 'e1',
  category: 'earbuds',
  title: 'OnePlus Buds 3 TWS ANC Earbuds',
  store: 'Flipkart',
  originalPrice: 6499,
  discountedPrice: 4099,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/headphone/8/u/r/buds-3-e509a-oneplus-original-imahe6hbjufxjt3z.jpeg?q=90',
  affiliateLink: 'https://fktr.in/XZdIENq',
  specs: {
    driver: '10.4mm + 6mm Dual Dynamic Drivers',
    anc: '49dB Active Noise Cancellation',
    battery: 'Up to 44 Hours Playback',
    charging: 'Fast Charging Support',
    connectivity: 'Bluetooth 5.3',
    latency: '94ms Low Latency',
    controls: 'Sliding Volume Control',
    audio: 'LHDC 5.0 | Spatial Audio',
    resistance: 'IP55 Water & Dust Resistance',
    features: 'Dual Device Connection | Google Fast Pair',
    color: 'Splendid Blue',
    type: 'True Wireless In-Ear Earbuds'
  }
},
{
  id: 'e2',
  category: 'earbuds',
  title: 'Samsung Galaxy Buds Core SM-R410N',
  store: 'Flipkart',
  originalPrice: 9999,
  discountedPrice: 4989,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/headphone/m/9/r/sm-r410n-galaxy-buds-core-white-samsung-original-imahfrhadds8qe3q.jpeg?q=90',
  affiliateLink: 'https://fktr.in/UtizbaO',
  specs: {
    driver: 'Dynamic Audio Drivers',
    anc: 'ENC Noise Reduction',
    battery: 'Up to 35 Hours Playback',
    charging: 'USB Type-C Fast Charging',
    connectivity: 'Bluetooth 5.3',
    controls: 'Touch Controls',
    audio: 'Samsung Scalable Codec',
    resistance: 'IP54 Water Resistance',
    features: 'Auto Pairing | Voice Assistant Support',
    color: 'White',
    type: 'True Wireless In-Ear Earbuds'
  }
},
{
  id: 'e3',
  category: 'earbuds',
  title: 'Noise Master Buds Sound by BOSE',
  store: 'Amazon',
  originalPrice: 7999,
  discountedPrice: 4999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/headphone/u/g/5/-original-imahfbhyv7yfwhev.jpeg?q=90',
  affiliateLink: 'https://fktr.in/Rupn2MQ',
  specs: {
    driver: 'Premium Dynamic Drivers',
    anc: '49dB Active Noise Cancellation',
    battery: 'Up to 44 Hours Playback',
    charging: 'Instacharge Fast Charging',
    connectivity: 'Bluetooth 5.3',
    mics: '6 Mic ENC Setup',
    audio: 'BOSE Tuned Audio | Spatial Audio',
    latency: 'Low Latency Gaming Mode',
    resistance: 'IPX5 Water Resistance',
    features: 'Dual Pairing | Touch Controls',
    color: 'Onyx',
    type: 'True Wireless In-Ear Earbuds'
  }
},
{
  id: 'e4',
  category: 'earbuds',
  title: 'GOBOULT Mustang Torq Wireless Earbuds',
  store: 'Amazon',
  originalPrice: 5999,
  discountedPrice: 1799,
  imageUrl: 'https://m.media-amazon.com/images/I/71JsGjmlKKL._SL1500_.jpg',
  affiliateLink: 'https://m.media-amazon.com/images/I/71JsGjmlKKL._SL1500_.jpg',
  specs: {
    driver: '13mm Dynamic Drivers',
    battery: 'Up to 60 Hours Playback',
    connectivity: 'Bluetooth 5.4',
    mics: 'Quad Mic ENC',
    latency: '45ms Low Latency',
    controls: 'Touch Controls with App Support',
    lighting: 'Breathing LED Lights',
    resistance: 'IPX5 Water Resistance',
    features: 'Gaming Mode | Made in India',
    color: 'Silver',
    type: 'True Wireless In-Ear Earbuds'
  }
},
{
  id: 'e5',
  category: 'earbuds',
  title: 'OnePlus Nord Buds 4 Pro',
  store: 'Amazon',
  originalPrice: 3999,
  discountedPrice: 3999,
  imageUrl: 'https://m.media-amazon.com/images/I/51LRQwB1VhL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/4dH60Zr',
  specs: {
    driver: '12mm Titanium-Coated Dynamic Drivers',
    anc: 'Up to 55dB Real-Time ANC',
    battery: 'Up to 54 Hours Playback',
    connectivity: 'Bluetooth 5.4',
    latency: '47ms Ultra Low Latency',
    audio: 'Spatial Audio Support',
    charging: 'Fast Charging Support',
    controls: 'Touch Controls',
    features: 'Dual Device Connectivity | Adaptive ANC',
    resistance: 'IP55 Water Resistance',
    color: 'Raven Black',
    type: 'True Wireless In-Ear Earbuds'
  }
},
  {
  id: 'e6',
  category: 'earbuds',
  title: 'GOBOULT Earl TWS ',
  store: 'Amazon',
  originalPrice:6999,
  discountedPrice: 2299,
  imageUrl: 'https://m.media-amazon.com/images/I/71ut+5l0kyL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/4dKP4Tc',
  specs: {
    driver: '12mm Titanium-Coated Dynamic Drivers',
    anc: 'Up to 55dB Real-Time ANC',
    battery: 'Up to 54 Hours Playback',
    connectivity: 'Bluetooth 5.4',
    latency: '47ms Ultra Low Latency',
    audio: 'Spatial Audio Support',
    charging: 'Fast Charging Support',
    controls: 'Touch Controls',
    features: 'Dual Device Connectivity | Adaptive ANC',
    resistance: 'IP55 Water Resistance',
    color: 'Raven Black',
    type: 'True Wireless In-Ear Earbuds'
  }
  },
{
  id: 'e7',
  category: 'earbuds',
  title: 'realme Buds Air 8',
  store: 'Amazon',
  originalPrice: 5299,
  discountedPrice: 3799,
  imageUrl: 'https://m.media-amazon.com/images/I/51oUkepEvzL._SL1000_.jpg',
  affiliateLink: 'https://m.media-amazon.com/images/I/51oUkepEvzL._SL1000_.jpg',
  specs: {
    driver: '11mm + 6mm Dual Dynamic Bass Drivers',
    anc: '55dB Active Noise Cancellation',
    battery: 'Up to 58 Hours Playback',
    connectivity: 'Bluetooth 5.4',
    latency: '45ms Low Latency',
    mics: '6 Mic ENC',
    audio: '360° Spatial Audio | Hi-Res LHDC',
    charging: 'Fast Charging Support',
    resistance: 'IP55 Dust & Water Resistance',
    features: 'Dual Device Pairing | Gaming Mode',
    color: 'Master Grey',
    type: 'True Wireless In-Ear Earbuds'
  }
},

  // --- SMARTWATCHES ---
  {
  id: 'w1',
  category: 'smartwatches',
  title: 'Fastrack Revoltt FS2Pro 1.96" Super AMOLED Curved Smartwatch',
  store: 'Flipkart',
  originalPrice: 5999,
  discountedPrice: 4399,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/smartwatch/3/9/i/-original-imah4nbw8kxky93h.jpeg?q=90',
  affiliateLink: 'https://fktr.in/gIjsvhi',
  specs: {
    display: '1.96-inch Super AMOLED Curved Display',
    brightness: '1000 Nits Brightness',
    bluetoothCalling: 'Advanced Bluetooth Calling',
    battery: 'Up to 7 Days Battery Life',
    connectivity: 'Bluetooth 5.3',
    health: 'Heart Rate | SpO2 | Sleep Tracking',
    resistance: 'IP68 Water Resistance',
    design: 'Premium Glossy Metal Design',
    controls: 'Functional Crown Support',
    features: '100+ Sports Modes | AI Voice Assistant',
    strap: 'Silver Strap',
    type: 'Fashion Smartwatch'
  }
},
{
  id: 'w2',
  category: 'smartwatches',
  title: 'Noise Icon 2 Women’s Edition Smartwatch',
  store: 'Flipkart',
  originalPrice: 5999,
  discountedPrice: 1499,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/smartwatch/n/o/z/-original-imah76jstup5zdww.jpeg?q=90',
  affiliateLink: 'https://fktr.in/zKSZd9b',
  specs: {
    display: '1.8-inch TFT Display',
    bluetoothCalling: 'Bluetooth Calling Support',
    battery: 'Up to 10 Days Battery Life',
    connectivity: 'Bluetooth 5.1',
    health: 'Heart Rate | SpO2 | Stress Monitor',
    voiceAssistant: 'AI Voice Assistant',
    resistance: 'IP67 Water Resistance',
    sportsModes: '100+ Sports Modes',
    features: 'Female Health Tracking | Smart Notifications',
    strap: 'Rose Pink Strap',
    type: 'Women’s Smartwatch'
  }
},
{
  id: 'w3',
  category: 'smartwatches',
  title: 'TITAN Crest AMOLED Smartwatch',
  store: 'Flipkart',
  originalPrice: 11995,
  discountedPrice: 5495,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/smartwatch/g/3/r/36-32-90197am01-android-ios-titan-yes-original-imaguzz6b9ehehvu.jpeg?q=90',
  affiliateLink: 'https://fktr.in/hXT8fHj',
  specs: {
    display: '1.43-inch AMOLED Display',
    displayFeatures: 'Always-On Display Support',
    bluetoothCalling: 'BT Calling',
    battery: 'Fast Charging Support',
    connectivity: 'Bluetooth 5.3',
    health: 'Heart Rate | SpO2 | Sleep Monitor',
    controls: 'Working Crown',
    resistance: 'IP68 Water Resistance',
    design: 'Premium Metal Design',
    features: 'Multiple Sports Modes | Smart Notifications',
    strap: 'Black Strap',
    type: 'Premium Smartwatch'
  }
},
{
  id: 'w4',
  category: 'smartwatches',
  title: 'CMF by Nothing Watch Pro',
  store: 'Flipkart',
  originalPrice: 5999,
  discountedPrice: 3999,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/smartwatch/v/j/z/-original-imagwzk3ze2upgzg.jpeg?q=90',
  affiliateLink: 'https://fktr.in/B78vy41',
  specs: {
    display: '1.96-inch AMOLED Display',
    bluetoothCalling: 'BT Calling with AI Noise Reduction',
    gps: 'Built-in Multi-System GPS',
    battery: 'Up to 13 Days Battery Life',
    connectivity: 'Bluetooth 5.3',
    health: 'Heart Rate | SpO2 | Sleep Tracking',
    resistance: 'IP68 Water Resistance',
    design: 'Metallic Grey Finish',
    features: '120+ Sports Modes | AI Assistant',
    strap: 'Silver Strap',
    type: 'Smartwatch'
  }
},
{
  id: 'w5',
  category: 'smartwatches',
  title: 'GOBOULT Crown Smartwatch',
  store: 'Flipkart',
  originalPrice: 4499,
  discountedPrice: 1499,
  imageUrl: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/smartwatch/p/m/5/-original-imahhh29nh9fwsww.jpeg?q=90',
  affiliateLink: 'https://fktr.in/0aZOqNm',
  specs: {
    display: '1.95-inch HD Display',
    brightness: '900 Nits Brightness',
    bluetoothCalling: 'Bluetooth Calling',
    battery: 'Up to 7 Days Battery Life',
    connectivity: 'Bluetooth 5.2',
    health: 'Heart Rate | SpO2 | Sleep Tracking',
    controls: 'Working Crown',
    resistance: 'IP67 Water Resistance',
    sportsModes: '120+ Sports Modes',
    features: 'Smart Notifications | Voice Assistant',
    strap: 'Black Strap',
    type: 'Smartwatch'
  }
},
  // --- powerbanks ---
  
{
  id: 'p1',
  category: 'powerbanks',
  title: 'Portronics 10000 mAh 12W Slim Power Bank',
  store: 'Flipkart',
  originalPrice: 1499,
  discountedPrice: 679,
  imageUrl: 'https://rukminim1.flixcart.com/image/1536/1536/xif0q/power-bank/b/m/v/luxcell-b12-10000-por-2252-portronics-original-imagy9hbkxahntzm.jpeg?q=90',
  affiliateLink: 'https://fktr.in/Vk0k4pJ',
  specs: {
    capacity: '10000 mAh',
    output: '12W Fast Charging',
    battery: 'Lithium Polymer',
    ports: 'Dual USB Output',
    input: 'Micro USB & Type-C Input',
    compatibility: 'Mobile, Tablet & Accessories',
    design: 'Slim & Lightweight',
    color: 'Dark Blue',
    safety: 'Multi-layer Protection',
    type: 'Power Bank'
  }
},

{
  id: 'p2',
  category: 'powerbanks',
  title: 'Portronics Luxcell B 10K 10000mAh 22.5W Fast Charging Power Bank',
  store: 'Flipkart',
  originalPrice: 2499,
  discountedPrice: 999,
  imageUrl: 'https://m.media-amazon.com/images/I/61PcUSX7dWL._SX679_.jpg',
  affiliateLink: 'https://amzn.to/43AufDR',
  specs: {
    capacity: '10000 mAh',
    output: '22.5W Fast Charging',
    battery: 'Lithium Polymer',
    ports: 'USB-A Output, Type-C PD Output',
    input: 'Type-C Input',
    features: 'Wake Up Button',
    design: 'Ultra Slim',
    color: 'Green',
    compatibility: 'Mobile, Tablet & Accessories',
    type: 'Power Bank'
  }
},

{
  id: 'p3',
  category: 'powerbanks',
  title: 'Ambrane Force 10K 10000mAh 22.5W Fast Charging Power Bank',
  store: 'Flipkart',
  originalPrice: 1999,
  discountedPrice: 899,
  imageUrl: 'https://m.media-amazon.com/images/I/71i+ZBcuMmL._SL1500_.jpg',
  affiliateLink: 'https://amzn.to/49tZkws',
  specs: {
    capacity: '10000 mAh',
    output: '22.5W Fast Charging',
    battery: 'Lithium Polymer',
    inputOutput: 'USB Type-C Input & Output',
    chargingTech: 'PD & QC Fast Charging',
    design: 'Rugged, Slim & Compact',
    travelFriendly: 'Yes',
    compatibility: 'iPhone, Samsung, OnePlus & All Android Devices',
    color: 'Dark Green',
    type: 'Power Bank'
  }
},
  // --- LAPTOPS (15 items) ---
  

  // --- EARBUDS / AUDIO (15 items) ---

];


// Dynamically generate the remaining requested products
// REMOVED: Auto-generated mock data has been removed so you can add your real affiliate links.

/* 
 * ==========================================
 * HOW TO ADD YOUR REAL AFFILIATE LINKS:
 * ==========================================
 * Copy the object format below and paste it inside the `allDeals` array above.
 * Replace the values with your actual product details and your real Amazon/Flipkart affiliate links.
 * 
 * Example Layout:
 * {
 *   id: 'unique-id-123',                 // Give each product a unique ID
 *   category: 'smartphones',             // 'smartphones', 'laptops', 'earbuds', 'smartwatches', 'fashion', 'home appliances', 'gaming', 'cameras'
 *   title: 'Real Product Name',          // Exact product name
 *   store: 'Amazon',                     // 'Amazon', 'Flipkart', 'Croma', 'Myntra', etc.
 *   originalPrice: 50000,                // Original MRP (Number only, no commas)
 *   discountedPrice: 45000,              // Your deal price (Number only, no commas)
 *   imageUrl: 'https://...',             // High quality image URL
 *   affiliateLink: 'https://amzn.to/...',// YOUR REAL AFFILIATE LINK HERE
 *   releaseDate: '01 Jan, 2024',         // (Optional)
 *   specScore: 90,                       // (Optional) Editor score out of 100
 *   userRating: 4.5,                     // (Optional)
 *   ratingCount: 1200,                   // (Optional)
 *   expertRating: '8.5/10',              // (Optional)
 *   awards: ['Bestseller'],              // (Optional)
 *   specs: {                             // (Optional)
 *     processor: '...',
 *     ramStorage: '...',
 *     battery: '...'
 *   }
 * }
 */

