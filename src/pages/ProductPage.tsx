import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { allDeals as regularFallbackDeals, hotDeals as hotFallbackDeals } from '../data/dealsData';
import { ExternalLink, Star, Medal, Cpu, Battery, Camera, Maximize, Award, CheckCircle } from 'lucide-react';

const fallbackDeals = [...hotFallbackDeals, ...regularFallbackDeals];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeal = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'deals', id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          // Fallback to static data
          const staticDeal = fallbackDeals.find(p => p.id === id);
          if (staticDeal) setProduct(staticDeal);
        }
      } catch (err) {
        const staticDeal = fallbackDeals.find(p => p.id === id);
        if (staticDeal) setProduct(staticDeal);
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

  const discountPercentage = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8">
      <Helmet>
        <title>{product.title} - Price & Specs | Deals of the Day</title>
        <meta name="description" content={`Get the best deal on ${product.title}. Check specs, features, and expert rating.`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.title,
            "image": product.imageUrl,
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
          })}
        </script>
      </Helmet>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {product.releaseDate && (
                <div className="flex items-center space-x-3 text-sm">
                  <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">New</span>
                  <span className="text-gray-500 dark:text-gray-400">Release Date: <strong className="text-gray-700 dark:text-gray-300">{product.releaseDate}</strong></span>
                </div>
              )}
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
            <div className="bg-white rounded-xl p-4 w-full aspect-square flex items-center justify-center border border-gray-100 dark:border-slate-700">
              <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
            {/* Thumbnail placeholders */}
            <div className="flex gap-2 mt-4">
               <div className="w-12 h-12 rounded border border-brand bg-brand/5 flex items-center justify-center text-brand cursor-pointer">
                 <img src={product.imageUrl} alt="thumb" className="w-8 h-8 object-contain mix-blend-multiply" />
               </div>
               <div className="w-12 h-12 rounded border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 cursor-pointer hover:border-gray-300">
                 <span className="text-xs font-bold">+5</span>
               </div>
            </div>
          </div>

          {/* Middle Column - Specs & Features */}
          <div className="lg:col-span-5 flex flex-col">
            {(product.specs || product.features) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                {Object.entries({...(product.specs || {}), ...(product.features || {})}).map(([key, val]) => (
                  <div key={key} className="flex flex-col p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700">
                    <span className="uppercase text-[10px] font-black text-brand mb-1 tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{String(val)}</span>
                  </div>
                ))}
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
                   <span key={i} className="inline-flex items-center text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded">
                     <Award size={12} className="mr-1" /> {award}
                   </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Price & CTA */}
          <div className="lg:col-span-3 flex flex-col justify-between border-l lg:border-gray-100 dark:lg:border-slate-700 lg:pl-6">
            
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

            <div className="bg-gray-50 dark:bg-slate-900/50 p-5 rounded-xl border border-gray-100 dark:border-slate-700">
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
          </div>

        </div>
      </div>
    </div>
  );
}
