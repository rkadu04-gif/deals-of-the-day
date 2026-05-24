import { useSearchParams, Link } from 'react-router-dom';
import { ExternalLink, Tag, ShieldCheck, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { allDeals } from '../data/dealsData';

const calculateDiscount = (original: number, discounted: number) => {
  if (!original || !discounted || original <= discounted) return 0;
  return Math.round(((original - discounted) / original) * 100);
};

const seoContentData: Record<string, { title: string; metaDescription: string; contentTitle: string; contentHtml: JSX.Element; }> = {
  all: {
    title: "All Deals & Discounts | Deals of the Day",
    metaDescription: "Find the latest online deals, coupons, and offers across multiple categories like smartphones, laptops, fashion, and more. Save big today!",
    contentTitle: "Why Shop With Deals of the Day?",
    contentHtml: (
      <>
        <p className="mb-4">Welcome to our universal deals directory. We update our database every hour with verified discounts from Amazon, Flipkart, Myntra, and other leading e-commerce platforms.</p>
        <h4 className="font-bold mb-2">How We Source Our Deals</h4>
        <p className="mb-4">Our community moderators and automated bots track historic low prices and flash sales so you get the maximum value for your money. We only list verified products from reputable sellers.</p>
      </>
    )
  },
  smartphones: {
    title: "Best Smartphone Deals Under 15000 & More",
    metaDescription: "Grab massive discounts on smartphones from Apple, Samsung, OnePlus, and more. Find the best gaming phones and camera phones at the lowest prices.",
    contentTitle: "Smartphone Buying Guide & Offers",
    contentHtml: (
      <>
        <p className="mb-4">Looking for the <strong>best smartphone under 15000</strong> or the latest flagship? You've come to the right place. We track massive price drops during the Big Billion Days and Great Indian Festival.</p>
        <h4 className="font-bold mb-2">What to Look For in a Phone</h4>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong>Processor:</strong> Snapdragon or MediaTek depending on your gaming needs.</li>
          <li><strong>Refresh Rate:</strong> Look for at least 90Hz, preferably 120Hz for smooth scrolling.</li>
          <li><strong>Battery & Charging:</strong> 5000mAh with fast charging support is the current standard.</li>
        </ul>
        <p>If you're upgrading, make sure to use bank offers and exchange bonuses to maximize your discount.</p>
      </>
    )
  },
  laptops: {
    title: "Top Laptop Deals & Discounts | Gaming & Student Laptops",
    metaDescription: "Score huge deals on MacBooks, gaming laptops, and student notebooks from HP, Dell, Lenovo, and ASUS. Unbeatable prices updated daily.",
    contentTitle: "How to Choose the Right Laptop",
    contentHtml: (
      <>
        <p className="mb-4">Whether you are a student, a creative professional, or a gamer, finding the right laptop deal can save you thousands of rupees.</p>
        <h4 className="font-bold mb-2">Popular Categories</h4>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong>Students:</strong> Look for lightweight laptops with solid battery life and at least 8GB RAM.</li>
          <li><strong>Gamers:</strong> Deals on laptops with dedicated Nvidia RTX GPUs are updated during sale events.</li>
          <li><strong>Professionals:</strong> Check out our MacBook Air and Pro deals for unmatched performance and build quality.</li>
        </ul>
      </>
    )
  },
  fashion: {
    title: "Fashion & Clothing Sale | Latest Trends on Discount",
    metaDescription: "Shop top clothing brands, sneakers, and accessories at up to 80% off. Verified Myntra and Amazon fashion deals.",
    contentTitle: "Elevate Your Style. Not Your Budget.",
    contentHtml: (
      <>
        <p className="mb-4">From everyday casual wear to premium branded sneakers, our team curates the best fashion discounts online.</p>
        <h4 className="font-bold mb-2">Pro Shopping Tips</h4>
        <p>Always pair fashion discounts with flat-rate bank coupons. During Myntra's End of Reason Sale or Amazon Wardrobe Refresh Sale, you can easily find men's and women's clothing at a 50-80% markdown.</p>
      </>
    )
  }
};


export default function DealsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  // Filter deals based on the selected category and search query
  let filteredDeals = currentCategory === 'all' 
    ? allDeals 
    : allDeals.filter(deal => deal.category === currentCategory);

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredDeals = filteredDeals.filter(deal => 
      deal.title.toLowerCase().includes(query) || 
      deal.store.toLowerCase().includes(query)
    );
  }

  const categories = [
    { id: 'all', name: 'All Deals' },
    { id: 'smartphones', name: 'Smartphones' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'earbuds', name: 'Earbuds' },
    { id: 'smartwatches', name: 'Smartwatches' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home appliances', name: 'Home Appliances' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'cameras', name: 'Cameras' }
  ];

  const handleCategoryChange = (catId: string) => {
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const seoData = seoContentData[currentCategory] || seoContentData['all'];

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen py-10">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.metaDescription} />
        {/* Helps SEO by indicating this is a canonical category page */}
        <link rel="canonical" href={`https://dealsofday.example.com/deals${currentCategory !== 'all' ? `?category=${currentCategory}` : ''}`} />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-heading font-black mb-4 dark:text-white capitalize">
            {currentCategory === 'all' ? 'All Live Deals' : `${currentCategory} Deals`}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Handpicked and verified discounts updated daily.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-6 scrollbar-hide mb-6 border-b border-gray-200 dark:border-slate-800">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              onClick={() => handleCategoryChange(cat.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-lg font-bold text-sm transition-colors border ${
                currentCategory === cat.id 
                  ? 'bg-brand border-brand text-white shadow-md' 
                  : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-brand hover:text-brand'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDeals.map(deal => {
              const discountPercentage = calculateDiscount(deal.originalPrice, deal.discountedPrice);
              
              return (
              <div key={deal.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-3 flex flex-col shadow-sm hover:shadow-md transition-shadow group">
                <Link to={`/product/${deal.id}`} className="block h-40 md:h-48 bg-white dark:bg-white rounded-lg mb-3 flex items-center justify-center relative p-2 overflow-hidden border border-gray-100 dark:border-gray-200">
                  {discountPercentage > 0 && (
                    <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded z-10">
                      {discountPercentage}% OFF
                    </span>
                  )}
                  <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-contain rounded-md mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                </Link>
                
                <div className="flex flex-col flex-grow">
                  <Link to={`/product/${deal.id}`} className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug mb-1 hover:text-brand dark:hover:text-brand transition-colors">
                    {deal.title}
                  </Link>
                  <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">
                    {deal.store}
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-baseline space-x-2 mb-3">
                      <span className="text-lg md:text-xl font-black text-red-600">₹{deal.discountedPrice.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-gray-400 line-through">₹{deal.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <a href={deal.affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="w-full bg-brand/10 text-brand-dark dark:text-brand py-2.5 rounded-md text-xs font-bold flex items-center justify-center hover:bg-brand hover:text-white transition-colors">
                      <span>Get Deal</span>
                      <ExternalLink size={14} className="ml-1.5" />
                    </a>
                  </div>
                </div>
              </div>
            )})}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700">
            <h3 className="text-xl font-bold dark:text-white mb-2">No deals found</h3>
            <p className="text-gray-500">We are currently hunting for the best deals in this category. Check back later!</p>
          </div>
        )}

        {/* Dynamic SEO Content Section */}
        <div className="mt-16 bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-800 shadow-sm prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{seoData.contentTitle}</h2>
          <div className="text-gray-600 dark:text-gray-300">
            {seoData.contentHtml}
          </div>
        </div>

      </div>
    </div>
  );
}
