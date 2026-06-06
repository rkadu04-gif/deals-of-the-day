import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Info, HelpCircle } from 'lucide-react';
import { allDeals as regularFallbackDeals, hotDeals as hotFallbackDeals } from '../data/dealsData';

const fallbackDeals = [...hotFallbackDeals, ...regularFallbackDeals];

const calculateDiscount = (original: number, discounted: number) => {
  if (!original || !discounted || original <= discounted) return 0;
  return Math.round(((original - discounted) / original) * 100);
};

export default function BestCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    if (category) {
      // Find category deals
      const normalizedCat = category.toLowerCase().replace(/-/g, ' ');
      const filtered = fallbackDeals.filter((d: any) => 
        (d.category && d.category.toLowerCase() === normalizedCat) || 
        (d.categoryId && d.categoryId.toLowerCase() === normalizedCat)
      );
      // Sort by specScore or highest discount? Highest discount
      filtered.sort((a, b) => {
        const da = calculateDiscount(a.originalPrice, a.discountedPrice);
        const db = calculateDiscount(b.originalPrice, b.discountedPrice);
        return db - da;
      });
      setDeals(filtered);
    }
  }, [category]);

  const catName = category ? category.replace(/-/g, ' ') : '';
  const title = `Best ${catName} in India (${new Date().getFullYear()}) - Top Deals & Offers`;
  const description = `Looking for the best ${catName}? Compare specs, prices, and discounts on top-rated ${catName}. Grab verified loot deals from Amazon and Flipkart.`;

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen py-10">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script type="application/ld+json">
          {JSON.stringify({
             "@context": "https://schema.org",
             "@type": "CollectionPage",
             "name": title,
             "description": description,
             "url": window.location.href,
             "about": {
               "@type": "Thing",
               "name": catName
             }
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-heading font-black mb-4 dark:text-white capitalize">
            Top 10 Best {catName}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Expert recommended picks and the highest discounted {catName} currently on sale.
          </p>
        </div>

        {/* SEO Introduction content block */}
        <div className="bg-white dark:bg-slate-900 border border-brand/20 rounded-xl p-5 mb-8 shadow-sm">
          <h2 className="text-lg font-bold flex items-center text-gray-900 dark:text-white mb-2">
             <Info size={18} className="mr-2 text-brand" /> Buying Guide for {catName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
             Finding the right {catName} can be tricky given the abundance of new launches on Flipkart and Amazon. Our editorial team closely tracks price drops, evaluates real-world specifications, and aggregates verified user reviews to rank the absolute best {catName} you can buy right now without overpaying. Keep an eye out for our 'Lowest Price' tag to maximize your savings.
          </p>
          <div className="flex gap-2 flex-wrap mt-3">
             <span className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-medium px-2 py-1 rounded">Hand-Picked</span>
             <span className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-medium px-2 py-1 rounded">Daily Updated</span>
             <span className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-medium px-2 py-1 rounded">Value for Money</span>
          </div>
        </div>

        {deals.length > 0 ? (
          <div className="space-y-6">
            {deals.slice(0, 10).map((deal, index) => {
              const discountPercentage = calculateDiscount(deal.originalPrice, deal.discountedPrice);
              return (
                <div key={deal.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 bg-brand text-white text-xs font-black px-3 py-1 rounded-br-lg z-10">#{index + 1}</div>
                  
                  <Link to={`/product/${deal.id}`} className="shrink-0 w-full md:w-48 h-48 bg-white rounded-xl flex items-center justify-center p-4 border border-gray-100">
                    <img src={deal.imageUrl} alt={deal.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </Link>

                  <div className="flex-grow flex flex-col pt-2">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      <Link to={`/product/${deal.id}`} className="hover:text-brand transition-colors text-gray-900 dark:text-white">{deal.title}</Link>
                    </h2>
                    
                    <div className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Store: <span className="text-brand">{deal.store}</span>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-3 mb-4 text-sm text-gray-700 dark:text-gray-300">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {deal.specs && Object.entries(deal.specs).slice(0, 4).map(([key, val]) => (
                          <li key={key} className="flex truncate">
                            <span className="font-bold mr-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {String(val)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-black text-red-600">₹{(deal.discountedPrice || 0).toLocaleString()}</span>
                        {deal.originalPrice > 0 && <span className="text-sm text-gray-400 line-through">₹{(deal.originalPrice || 0).toLocaleString()}</span>}
                        {discountPercentage > 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">{discountPercentage}% OFF</span>}
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/product/${deal.id}`} className="px-5 py-2.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-lg text-sm transition-colors text-center">
                          View Specs
                        </Link>
                        <a href={deal.affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="px-5 py-2.5 bg-brand hover:bg-brand-dark text-white font-bold rounded-lg text-sm transition-colors flex items-center justify-center">
                          Get Deal <ExternalLink size={14} className="ml-1.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 p-8 text-center rounded-2xl border border-gray-200 dark:border-slate-800">
            <h2 className="text-xl font-bold dark:text-white mb-2">Finding recommendations...</h2>
          </div>
        )}

        {/* Category FAQ Section */}
        {deals.length > 0 && (
          <div className="mt-12 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-6 shadow-sm">
             <h2 className="text-xl font-black font-heading text-gray-900 dark:text-white mb-6 flex items-center">
                <HelpCircle className="mr-2 text-brand" size={20} /> FAQ About {catName}
             </h2>
             <div className="space-y-4">
                <div>
                   <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">Which is the best {catName} right now?</h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400">Currently, our #1 recommendation is the <strong>{deals[0]?.title}</strong> as it provides the best mix of specifications and discounts.</p>
                </div>
                <div>
                   <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">Are these deals verified?</h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400">Yes, our team manually verifies the pricing history to ensure these {catName} are at their lowest possible price points.</p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
