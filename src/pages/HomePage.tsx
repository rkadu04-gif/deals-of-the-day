import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MessageCircle, ExternalLink, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';
import { allDeals as fallbackDeals } from '../data/dealsData';

const calculateDiscount = (original: number, discounted: number) => {
  if (!original || !discounted || original <= discounted) return 0;
  return Math.round(((original - discounted) / original) * 100);
};

const LinkifyText = ({ text }: { text: string }) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return (
    <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-300 font-medium">
      {parts.map((part, i) => {
        if (part.match(urlRegex)) {
          return (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-bold break-all">
              {part}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
};

export default function HomePage() {
  const [topDeals, setTopDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDeals = async () => {
      try {
        const q = query(collection(db, 'deals'), limit(8));
        const snap = await getDocs(q);
        if (snap.empty) {
          setTopDeals(fallbackDeals.slice(0, 8));
        } else {
          setTopDeals(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (err) {
        setTopDeals(fallbackDeals.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };
    fetchTopDeals();
  }, []);

  return (
    <>
      <Helmet>
        <title>Deals of the Day | Lowest Prices on Mobiles, Tech & Powerbanks</title>
        <meta name="description" content="Find the best trending deals, coupons, and discounts from Amazon and Flipkart. Join our Telegram channel for instant loot deal alerts!" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-black text-white py-16 lg:py-24 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded w-max mb-6 uppercase tracking-wider inline-block">Amazon Prime Exclusive</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight mb-6 max-w-3xl leading-tight">
            Never Miss a Price Drop <span className="text-brand">Again.</span>
          </h1>
          <p className="text-lg md:text-xl font-medium mb-10 max-w-2xl text-gray-300">
            Get instant alerts for the best loot deals, price glitches, and massive discounts across Amazon & Flipkart.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/join" className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center space-x-2 shadow-xl hover:bg-gray-100 transition-colors">
              <MessageCircle className="text-blue-500" />
              <span>Join Telegram Channel</span>
            </Link>
            <Link to="/deals" className="border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
              Browse Top Deals
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">Over 50,000+ shoppers saving daily!</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
             {['Smartphones', 'Laptops', 'Earbuds', 'Smartwatches', 'Powerbanks', 'Home Appliances', 'Gaming', 'Cameras'].map(cat => (
               <Link to={`/deals?category=${cat.toLowerCase()}`} key={cat} className="whitespace-nowrap px-6 py-3 border border-gray-200 dark:border-slate-700 rounded-lg font-medium bg-white dark:bg-slate-800 hover:border-brand hover:text-brand dark:hover:border-brand transition-colors shadow-sm">
                 {cat}
               </Link>
             ))}
           </div>
        </div>
      </section>

      {/* Top Deals Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
             <div>
               <h2 className="text-3xl font-heading font-bold flex items-center">
                 <span className="text-brand mr-2">🔥</span> Trending Deals
               </h2>
               <p className="text-slate-500 mt-2">Grab them before they are gone!</p>
             </div>
             <Link to="/deals" className="hidden sm:block text-brand font-semibold hover:underline">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topDeals.map(deal => {
              const discountPercentage = calculateDiscount(deal.originalPrice, deal.discountedPrice);
              const isPowerboxCollection = (deal.categoryId === 'powerbanks' || deal.category === 'powerbanks') && deal.description;

              if (isPowerboxCollection) {
                return (
                  <div key={deal.id} className="col-span-2 md:col-span-3 lg:col-span-4 bg-white dark:bg-slate-900 border border-brand/20 dark:border-brand/40 shadow-sm rounded-xl p-4 md:p-6 mb-2">
                    <div className="flex items-center mb-4">
                      {deal.imageUrl && (
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 flex-shrink-0 mr-4">
                          <img src={deal.imageUrl} alt={deal.store} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                          {deal.title}
                        </h3>
                        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-brand">
                          {deal.store || 'Powerbanks Collection'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 md:p-5 border border-gray-100 dark:border-slate-700">
                      <LinkifyText text={deal.description} />
                    </div>
                  </div>
                );
              }

              return (
              <div key={deal.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-3 flex flex-col shadow-sm hover:shadow-md transition-shadow group">
                <Link to={`/product/${deal.id}`} className="block h-40 bg-white dark:bg-white rounded-lg mb-3 flex items-center justify-center relative p-2 overflow-hidden border border-gray-100 dark:border-gray-200">
                  {discountPercentage > 0 && (
                    <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded z-10 text-nowrap">
                      {discountPercentage}% OFF
                    </span>
                  )}
                  <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-contain rounded-md mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                </Link>
                
                <div className="flex flex-col flex-grow">
                  <Link to={`/product/${deal.id}`} className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug mb-1 hover:text-brand dark:hover:text-brand transition-colors">
                    {deal.title}
                  </Link>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">
                    {deal.store}
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-baseline space-x-2 mb-3">
                      <span className="text-lg font-black text-red-600">₹{deal.discountedPrice.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-gray-400 line-through">₹{deal.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <a href={deal.affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="w-full bg-brand/10 text-brand-dark dark:text-brand py-2 rounded-md text-xs font-bold flex items-center justify-center hover:bg-brand hover:text-white transition-colors">
                      <span>Get Deal</span>
                    </a>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>
      
      {/* Telegram CTA */}
       <section className="py-12 bg-bg-light dark:bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 md:p-10 shadow-inner shrink-0 flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-xl text-blue-600">
                  <MessageCircle size={24} fill="currentColor" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Join Community</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black heading font-heading tracking-tight mb-2 text-white">Join Deals of the Day Telegram</h2>
              <p className="text-blue-100 text-sm md:text-base font-medium max-w-lg mt-2">Get instant lowest price alerts for trending products before they go out of stock. It's 100% free!</p>
            </div>
            <div className="w-full md:w-auto shrink-0 md:ml-8">
               <a href="https://t.me/deals_of_the_day" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 w-full md:w-auto inline-block text-center px-8 py-4 rounded-xl font-bold text-sm shadow hover:bg-gray-100 transition-colors">
                 Join Channel Now
               </a>
            </div>
          </div>
        </div>
       </section>

       {/* SEO Content Section */}
       <section className="py-16 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 dark:text-gray-400">
          <div className="prose dark:prose-invert prose-orange max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">India's Ultimate Deals Platform</h2>
            <p className="mb-4 text-sm leading-relaxed">
              Welcome to <strong>Deals of the Day</strong>, your premier destination for the latest drops, mega sale discounts, and hand-picked product recommendations across tech, lifestyle, and electronics. Whether you are looking for the <em>best mobiles under 15000</em>, top-rated ANC earbuds, or exclusive Amazon Great Indian Festival sale picks, our dedicated team constantly tracks price drops to ensure you never overpay again.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
                <Zap className="text-brand mb-2" size={24} />
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Real-time Price Tracking</h3>
                <p className="text-xs">We monitor thousands of products on e-commerce giants like Amazon, Flipkart, and Myntra to spot historical low prices.</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
                <ShieldCheck className="text-brand mb-2" size={24} />
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Verified Products</h3>
                <p className="text-xs">Say goodbye to sketchy sellers. Our community moderators verify every product before it goes live.</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
                <TrendingUp className="text-brand mb-2" size={24} />
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Unbiased Buying Guides</h3>
                <p className="text-xs">Not sure which tech to buy? Read our curated comparisons of the latest smartphones, laptops, and smartwatches.</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Trending Categories & Sales</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Looking to upgrade your gear? From flagship killer <strong>smartphones</strong> to budget-friendly student <strong>laptops</strong>, we categorize thousands of affiliate offers daily. During blockbuster sale events like the Flipkart Big Billion Days and Amazon Prime Day, our website and Telegram channel serve as your live hub for "Loot Deals" and flash sale links.
            </p>
            <p className="text-xs italic">
              <strong>Disclaimer:</strong> Prices and availability are subject to change rapidly. As an Amazon Associate, Deals of the Day earns from qualifying purchases.
            </p>
          </div>
        </div>
       </section>

       <div className="h-16 md:hidden"></div> {/* Spacer for Mobile Nav */}
    </>
  );
}
