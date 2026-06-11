import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { allDeals as regularFallbackDeals, hotDeals as hotFallbackDeals } from '../data/dealsData';
import { ExternalLink, Star, Medal, Cpu, Battery, Camera, Maximize, Award, CheckCircle, TrendingDown, Clock, HelpCircle, ChevronRight } from 'lucide-react';

const fallbackDeals = [...hotFallbackDeals, ...regularFallbackDeals];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (product?.imageUrl) {
      const urls = product.imageUrl.split(',').map((u: string) => u.trim()).filter(Boolean);
      if (urls.length > 0) setActiveImage(urls[0]);
    }
  }, [product?.imageUrl]);

  useEffect(() => {
    const fetchDeal = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'deals', id);
        const snap = await getDoc(docRef);
        let foundProduct = null;
        if (snap.exists()) {
          foundProduct = { id: snap.id, ...snap.data() };
        } else {
          // Fallback to static data
          foundProduct = fallbackDeals.find(p => p.id === id);
        }
        
        if (foundProduct) {
          setProduct(foundProduct);
          // Update recently viewed
          let recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
          const otherRecents = recent.filter((rId: string) => rId !== id);
          setRecentlyViewed(otherRecents.map((rId: string) => fallbackDeals.find(d => d.id === rId)).filter(Boolean));
          
          recent = [id, ...otherRecents].slice(0, 5);
          localStorage.setItem('recentlyViewed', JSON.stringify(recent));
        }
      } catch (err) {
        const staticDeal = fallbackDeals.find(p => p.id === id);
        if (staticDeal) {
          setProduct(staticDeal);
          let recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
          const otherRecents = recent.filter((rId: string) => rId !== id);
          setRecentlyViewed(otherRecents.map((rId: string) => fallbackDeals.find(d => d.id === rId)).filter(Boolean));
          
          recent = [id, ...otherRecents].slice(0, 5);
          localStorage.setItem('recentlyViewed', JSON.stringify(recent));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark text-gray-800 dark:text-gray-200 px-4 text-center">
        <h1 className="text-4xl font-black mb-4">Product Not Found</h1>
        <p className="mb-8 text-gray-500">The product you are looking for does not exist or has been removed.</p>
        <Link to="/deals" className="px-6 py-3 bg-brand text-white rounded-lg font-bold hover:bg-brand-dark transition-colors">
          Browse All Deals
        </Link>
      </div>
    );
  }

  const originalPrice = product?.originalPrice || 0;
  const discountedPrice = product?.discountedPrice || 0;
  const discountPercentage = originalPrice > 0 ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8">
      <Helmet>
        <title>{product.title} - Best Price & Offers | Deals of the Day</title>
        <meta name="description" content={`Get the best deal on ${product.title} at ${product.store}. Check specs, features, and expert reviews.`} />
        <meta property="og:title" content={`${product.title} - Lowest Price Alert`} />
        <meta property="og:description" content={`Save ${discountPercentage}% on ${product.title}. Current price: ₹${discountedPrice}.`} />
        <meta property="og:image" content={product.imageUrl?.split(',')[0].trim()} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Buy ${product.title} at Huge Discount`} />
        <meta name="twitter:description" content={`Current best deal for ${product.title} only ₹${discountedPrice}.`} />
        <meta name="twitter:image" content={product.imageUrl?.split(',')[0].trim()} />
        
        <script type="application/ld+json">
          {JSON.stringify({
             "@context": "https://schema.org",
             "@graph": [
               {
                 "@type": "Product",
                 "name": product.title,
                 "image": product.imageUrl?.split(',')[0].trim(),
                 "description": `Get the best deal on ${product.title}. Check specs, features, and expert rating.`,
                 "brand": {
                   "@type": "Brand",
                   "name": product.title.split(' ')[0]
                 },
                 "offers": {
                   "@type": "Offer",
                   "url": product.affiliateLink,
                   "priceCurrency": "INR",
                   "price": product.discountedPrice,
                   "availability": "https://schema.org/InStock",
                   "seller": {
                     "@type": "Organization",
                     "name": product.store
                   }
                 }
               },
               {
                 "@type": "BreadcrumbList",
                 "itemListElement": [
                   {
                     "@type": "ListItem",
                     "position": 1,
                     "name": "Home",
                     "item": "https://dealsofday.in"
                   },
                   {
                     "@type": "ListItem",
                     "position": 2,
                     "name": product.category,
                     "item": `https://dealsofday.in/deals?category=${product.category}`
                   },
                   {
                     "@type": "ListItem",
                     "position": 3,
                     "name": product.title
                   }
                 ]
               },
               {
                 "@type": "FAQPage",
                 "mainEntity": [
                   {
                     "@type": "Question",
                     "name": `Is ${product.title} worth buying at ₹${discountedPrice}?`,
                     "acceptedAnswer": {
                       "@type": "Answer",
                       "text": `Yes, at the current price of ₹${discountedPrice} (which is ${discountPercentage}% off the original price of ₹${originalPrice}), this is considered a highly lucrative deal compared to market average.`
                     }
                   },
                   {
                     "@type": "Question",
                     "name": "Does this come with warranty?",
                     "acceptedAnswer": {
                       "@type": "Answer",
                       "text": `Yes, purchasing through the official ${product.store} link provided guarantees standard manufacturer warranty.`
                     }
                   },
                   {
                     "@type": "Question",
                     "name": `Is it safe to buy from this ${product.store} deal link?`,
                     "acceptedAnswer": {
                       "@type": "Answer",
                       "text": `Absolutely. We only curate verified deals from trusted sellers on official platforms like ${product.store}. Always double check the seller rating before checkout.`
                     }
                   }
                 ]
               }
             ]
          })}
        </script>
      </Helmet>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link to="/" className="hover:text-brand">Home</Link>
            <span>/</span>
            <Link to={`/deals?category=${product.category}`} className="hover:text-brand capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-200 font-medium truncate">{product.title}</span>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                {product.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="flex items-center text-[11px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold px-2 py-1 rounded uppercase tracking-wider">
                  <CheckCircle size={14} className="mr-1" /> Deal Verified Today
                </span>
                {discountPercentage > 15 && (
                  <span className="flex items-center text-[11px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold px-2 py-1 rounded uppercase tracking-wider">
                    <TrendingDown size={14} className="mr-1" /> Lowest Price
                  </span>
                )}
                {product.releaseDate && (
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Released: <strong className="text-gray-700 dark:text-gray-300">{product.releaseDate}</strong></span>
                )}
                <span className="text-gray-500 dark:text-gray-400 text-xs flex items-center">
                  <Clock size={12} className="mr-1" /> Last Updated: <strong className="text-gray-700 dark:text-gray-300 ml-1">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                </span>
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="hidden md:flex items-center space-x-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-gray-100 dark:border-slate-700 shrink-0">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2 ml-1">Share</span>
               <a href={`https://wa.me/?text=${encodeURIComponent('Check out this deal: ' + product.title + ' ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
               </a>
               <a href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.title)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center hover:bg-[#0088cc] hover:text-white transition-colors">
                 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>
               </a>
               <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Huge deal on ' + product.title)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                 <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </a>
               <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
               </a>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-slate-700">
          
          {/* Left Column - Image */}
          <div className="lg:col-span-4 relative flex flex-col items-center">
             {product.specScore && (
               <div className="absolute top-0 left-0 bg-[#354f00] text-white p-2 rounded-br-xl rounded-tl-xl text-center z-10 w-16 shadow-md border border-[#486b00]">
                 <div className="text-xl font-black leading-none">{product.specScore}%</div>
                 <div className="text-[10px] uppercase font-bold mt-1">Spec Score</div>
               </div>
             )}
            <div className="bg-white rounded-xl p-4 w-full aspect-square flex items-center justify-center border border-gray-100 dark:border-slate-700 overflow-hidden">
              <img src={activeImage || product?.imageUrl?.split(',')[0]?.trim()} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
            
            {/* Thumbnails */}
            {(() => {
              const urls = product.imageUrl ? product.imageUrl.split(',').map((u: string) => u.trim()).filter(Boolean) : [];
              if (urls.length > 1) {
                return (
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {urls.map((url, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveImage(url)}
                        className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center bg-white overflow-hidden transition-all ${activeImage === url ? 'border-brand shadow-sm' : 'border-gray-200 hover:border-brand/40'}`}
                      >
                        <img src={url} alt={`thumb-${i}`} className="w-10 h-10 object-contain mix-blend-multiply" />
                      </button>
                    ))}
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {/* Middle Column - Specs & Features */}
          <div className="lg:col-span-5 flex flex-col">
            {(product.specs || product.features) ? (
              <div className="flex flex-col space-y-6">
                {(() => {
                   const allSpecs = {...(product.specs || {}), ...(product.features || {})};
                   const featuresText = typeof allSpecs.features === "string" ? allSpecs.features : null;
                   
                   // Remove features from the other specs
                   const otherSpecs = { ...allSpecs };
                   delete otherSpecs.features;
                   
                   const featuresList = featuresText 
                     ? featuresText.split(/,|\n|-/).map((f: string) => f.trim()).filter((f: string) => f.length > 2)
                     : [];
                   
                   return (
                     <>
                       {featuresList.length > 0 && (
                         <div className="bg-brand/5 dark:bg-brand/10 rounded-xl p-5 border border-brand/10 dark:border-brand/20">
                           <h3 className="text-sm font-black uppercase tracking-wider text-brand mb-4 flex items-center">
                              <Star size={16} className="mr-2" /> Top Features
                           </h3>
                           <ul className="space-y-3">
                             {featuresList.map((feat: string, i: number) => (
                               <li key={i} className="flex items-start text-sm text-gray-800 dark:text-gray-200 leading-snug">
                                 <CheckCircle size={16} className="mr-2.5 text-green-500 shrink-0 mt-0.5" />
                                 <span className="font-medium">{feat}</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                       )}
                       
                       {Object.keys(otherSpecs).length > 0 && (
                         <div>
                           <h3 className="text-xs font-black uppercase text-gray-500 dark:text-gray-400 mb-3 tracking-wider flex items-center mt-2">
                             <Cpu size={14} className="mr-1.5" /> Specifications
                           </h3>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                             {Object.entries(otherSpecs).map(([key, val]) => (
                               <div key={key} className="flex flex-col p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
                                 <span className="uppercase text-[10px] font-black text-brand mb-1 tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                 <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">{String(val)}</span>
                               </div>
                             ))}
                           </div>
                         </div>
                       )}
                     </>
                   )
                })()}
              </div>
            ) : (
               <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-slate-800 rounded-xl text-center h-full">
                 <div className="text-gray-500 font-medium">Specs & Features not available.</div>
               </div>
            )}

            {/* Awards */}
            {product.awards && product.awards.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700 flex flex-wrap gap-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white mr-2 flex items-center">Awards:</span>
                {product.awards.map((award, i) => (
                   <span key={i} className="inline-flex items-center text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 px-2 py-1 rounded">
                     <Award size={12} className="mr-1" /> {award}
                   </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Price & CTA */}
          <div className="lg:col-span-3 flex flex-col border-t lg:border-t-0 lg:border-l lg:border-gray-100 dark:lg:border-slate-700 pt-6 lg:pt-0 lg:pl-6">
            
            <div className="space-y-4 mb-6">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500">User Rating</span>
                 <div className="flex items-center font-bold">
                   <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
                   {product.userRating || 'N/A'} <span className="font-normal text-gray-400 ml-1">({product.ratingCount || 0})</span>
                 </div>
               </div>
               {product.expertRating && (
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500">Expert Rating</span>
                   <div className="flex items-center font-bold">
                     <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
                     {product.expertRating}
                   </div>
                 </div>
               )}
            </div>

            <div className="bg-gray-50 dark:bg-slate-900/50 p-5 rounded-xl border border-gray-100 dark:border-slate-700 mb-6">
               <div className="flex items-center justify-between mb-4">
                 <img 
                   src={product.store.toLowerCase() === 'amazon' ? 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' : 
                        product.store.toLowerCase() === 'flipkart' ? 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logo_lite-cbb357.png' : ''
                       } 
                   alt={product.store} 
                   className="h-6 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                 />
                 <div className="text-right">
                    <div className="text-2xl font-black text-gray-900 dark:text-white">₹{(product.discountedPrice || 0).toLocaleString()}</div>
                   <div className="text-sm text-gray-400 line-through">₹{(product.originalPrice || 0).toLocaleString()}</div>
                 </div>
               </div>
               
               <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="w-full bg-brand hover:bg-brand-dark text-white py-3.5 rounded-lg font-bold flex items-center justify-center transition-colors shadow-md hover:shadow-lg shadow-brand/20 hover:-translate-y-0.5 transform">
                  Go To Store
               </a>
               
               {discountPercentage > 0 && (
                  <div className="mt-3 text-center text-xs font-bold text-green-600 dark:text-green-400 flex items-center justify-center">
                    <CheckCircle size={14} className="mr-1" /> You save ₹{((product.originalPrice || 0) - (product.discountedPrice || 0)).toLocaleString()} ({discountPercentage}%)
                  </div>
               )}
            </div>

            {/* Why Buy This Product Card */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
               <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-4 flex items-center">
                  <Medal size={14} className="mr-1.5 text-brand" /> Why buy this deal?
               </h3>
               <ul className="space-y-3">
                 <li className="flex items-start">
                   <div className="bg-green-100 text-green-600 p-1 rounded mr-3 shrink-0"><CheckCircle size={14} /></div>
                   <div className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white block font-medium">Best Price Tracked</strong> Current market low price.</div>
                 </li>
                 <li className="flex items-start">
                   <div className="bg-blue-100 text-blue-600 p-1 rounded mr-3 shrink-0"><CheckCircle size={14} /></div>
                   <div className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white block font-medium">Verified Deal</strong> Hand-checked by our moderators.</div>
                 </li>
                 {discountPercentage > 20 && (
                   <li className="flex items-start">
                     <div className="bg-orange-100 text-orange-600 p-1 rounded mr-3 shrink-0"><CheckCircle size={14} /></div>
                     <div className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white block font-medium">Massive Discount</strong> Price dropped by {discountPercentage}%.</div>
                   </li>
                 )}
               </ul>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="mt-16">
           <h2 className="text-2xl font-black font-heading text-gray-900 dark:text-white mb-6 flex items-center">
              <HelpCircle className="mr-2 text-brand" /> Frequently Asked Questions
           </h2>
           <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 divide-y divide-gray-100 dark:divide-slate-800">
              <div className="p-4 md:p-6">
                 <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Is {product.title} worth buying at ₹{discountedPrice}?</h3>
                 <p className="text-gray-600 dark:text-gray-400 text-sm">Yes, at the current price of ₹{discountedPrice} (which is {discountPercentage}% off the original price of ₹{originalPrice}), this is considered a highly lucrative deal compared to market average.</p>
              </div>
              <div className="p-4 md:p-6">
                 <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Does this come with warranty?</h3>
                 <p className="text-gray-600 dark:text-gray-400 text-sm">Yes, purchasing through the official {product.store} link provided guarantees standard manufacturer warranty.</p>
              </div>
              <div className="p-4 md:p-6">
                 <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Is it safe to buy from this {product.store} deal link?</h3>
                 <p className="text-gray-600 dark:text-gray-400 text-sm">Absolutely. We only curate verified deals from trusted sellers on official platforms like {product.store}. Always double check the seller rating before checkout.</p>
              </div>
           </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <div className="mb-6 flex justify-between items-end">
            <h2 className="text-2xl font-black font-heading text-gray-900 dark:text-white">Related Products</h2>
            <Link to={`/deals?category=${product.category}`} className="text-sm font-bold text-brand hover:underline">View All {product.category}</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fallbackDeals
               .filter(d => d.category === product.category && d.id !== product.id)
               .slice(0, 4)
               .map(deal => {
                  const dealOriginal = deal.originalPrice || 0;
                  const dealDiscounted = deal.discountedPrice || 0;
                  const discPct = dealOriginal > 0 ? Math.round(((dealOriginal - dealDiscounted) / dealOriginal) * 100) : 0;
                  
                  return (
                    <div key={deal.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-3 flex flex-col shadow-sm hover:shadow-md transition-shadow group">
                      <Link to={`/product/${deal.id}`} onClick={() => window.scrollTo(0,0)} className="block h-40 bg-white dark:bg-white rounded-lg mb-3 flex items-center justify-center relative p-2 overflow-hidden border border-gray-100 dark:border-gray-200">
                        {discPct > 0 && (
                          <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded z-10 text-nowrap">
                            {discPct}% OFF
                          </span>
                        )}
                        <img src={deal.imageUrl?.split(',')[0]?.trim() || ''} alt={deal.title} loading="lazy" className="w-full h-full object-contain rounded-md mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                      </Link>
                      
                      <div className="flex flex-col flex-grow">
                        <Link to={`/product/${deal.id}`} onClick={() => window.scrollTo(0,0)} className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug mb-1 hover:text-brand dark:hover:text-brand transition-colors">
                          {deal.title}
                        </Link>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">
                          {deal.store}
                        </div>
                        <div className="mt-auto">
                          <div className="flex items-baseline space-x-2 mb-3">
                            <span className="text-lg font-black text-red-600">₹{dealDiscounted.toLocaleString('en-IN')}</span>
                            {dealOriginal > 0 && <span className="text-[11px] text-gray-400 line-through">₹{dealOriginal.toLocaleString('en-IN')}</span>}
                          </div>
                          <a href={deal.affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="w-full bg-brand/10 text-brand-dark dark:text-brand py-2 rounded-md text-xs font-bold flex items-center justify-center hover:bg-brand hover:text-white transition-colors">
                            <span>Get Deal</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
            })}
          </div>
        </div>

        {/* Recently Viewed Products Section */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16">
            <div className="mb-6">
              <h2 className="text-2xl font-black font-heading text-gray-900 dark:text-white flex items-center">
                 Recently Viewed
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentlyViewed.slice(0, 4).map(deal => {
                    const dealOriginal = deal.originalPrice || 0;
                    const dealDiscounted = deal.discountedPrice || 0;
                    const discPct = dealOriginal > 0 ? Math.round(((dealOriginal - dealDiscounted) / dealOriginal) * 100) : 0;
                    
                    return (
                      <div key={deal.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-3 flex flex-col shadow-sm hover:shadow-md transition-shadow group">
                        <Link to={`/product/${deal.id}`} onClick={() => window.scrollTo(0,0)} className="block h-40 bg-white dark:bg-white rounded-lg mb-3 flex items-center justify-center relative p-2 overflow-hidden border border-gray-100 dark:border-gray-200">
                          {discPct > 0 && (
                            <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded z-10 text-nowrap">
                              {discPct}% OFF
                            </span>
                          )}
                          <img src={deal.imageUrl?.split(',')[0]?.trim() || ''} alt={deal.title} loading="lazy" className="w-full h-full object-contain rounded-md mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                        </Link>
                        
                        <div className="flex flex-col flex-grow">
                          <Link to={`/product/${deal.id}`} onClick={() => window.scrollTo(0,0)} className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug mb-1 hover:text-brand dark:hover:text-brand transition-colors">
                            {deal.title}
                          </Link>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">
                            {deal.store}
                          </div>
                          <div className="mt-auto">
                            <div className="flex items-baseline space-x-2 mb-3">
                              <span className="text-lg font-black text-red-600">₹{dealDiscounted.toLocaleString('en-IN')}</span>
                              {dealOriginal > 0 && <span className="text-[11px] text-gray-400 line-through">₹{dealOriginal.toLocaleString('en-IN')}</span>}
                            </div>
                            <a href={deal.affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="w-full bg-brand/10 text-brand-dark dark:text-brand py-2 rounded-md text-xs font-bold flex items-center justify-center hover:bg-brand hover:text-white transition-colors">
                              <span>Get Deal</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-[64px] left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 p-3 flex justify-between items-center z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-transform border-b">
         <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Best Price</span>
            <span className="text-lg font-black text-gray-900 dark:text-white">₹{(product.discountedPrice || 0).toLocaleString()}</span>
         </div>
         <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="bg-brand text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow hover:bg-brand-dark transition-colors">
           View Deal
         </a>
      </div>

    </div>
  );
}
