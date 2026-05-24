import { Helmet } from 'react-helmet-async';
import { MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function TelegramJoinPage() {
  useEffect(() => {
    // Optionally auto-redirect
    // window.location.href = "https://t.me/deals_of_the_day";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <Helmet>
        <title>Join Deals of the Day Telegram Channel</title>
      </Helmet>
      
      <MessageCircle size={80} className="mx-auto text-[#0088cc] mb-8" />
      <h1 className="text-4xl md:text-5xl font-heading font-black mb-6">
        Join Deals of the Day
      </h1>
      <p className="text-xl text-slate-600 dark:text-slate-300 mb-10">
        Over 50,000+ shoppers are getting instant loot alerts and saving money daily.
      </p>
      
      <a 
        href="https://t.me/dealsoftheday004" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 bg-[#0088cc] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#0077b3] transition-colors shadow-lg"
      >
        <MessageCircle size={24} />
        <span>Open Telegram</span>
      </a>
      
      <p className="mt-8 text-sm text-slate-500">
        You will be redirected to the Telegram app.
      </p>
    </div>
  );
}
