import { Outlet, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Menu, MessageCircle, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export default function Layout() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/deals?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-800 dark:text-slate-100 transition-colors">
      <header className="bg-black text-white h-16 flex items-center px-6 justify-between shrink-0 z-50 sticky top-0">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex flex-col sm:flex-row items-center transform hover:scale-[1.02] transition-transform">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link to="/deals" className="text-brand hover:text-brand-dark transition-colors">Hot Deals</Link>
            <Link to="/compare" className="hover:text-white transition-colors">Comparisons</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white text-xs px-4 py-2 rounded-full w-48 border border-gray-700 focus:outline-none focus:border-brand" 
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              <Search size={14} />
            </button>
          </form>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/join" className="hidden md:flex bg-brand hover:bg-brand-dark text-white text-xs font-bold px-4 py-2 rounded-full items-center gap-2 transition-colors">
            <span>Join Telegram</span>
          </Link>
          <button className="md:hidden p-2 text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Top Promo Ticker */}
      <div className="bg-brand text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-1.5 px-6 flex justify-between shrink-0">
        <span>⚡ Flash Sale Live</span>
        <span className="opacity-80 hidden sm:inline">Amazon Great Indian Festival</span>
        <span>🔥 500+ Deals Added</span>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden bg-bg-light dark:bg-bg-dark">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-4 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1 border-r border-slate-200 dark:border-slate-800 pr-4">
              <Logo />
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                Your ultimate destination for the best Amazon and Flipkart deals, trending offers, and verified shopping guides.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Important Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-slate-500 hover:text-brand">About Us</Link></li>
                <li><Link to="/contact" className="text-sm text-slate-500 hover:text-brand">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-sm text-slate-500 hover:text-brand">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-slate-500 hover:text-brand">Terms of Use</Link></li>
                <li><Link to="/refund-cancellation" className="text-sm text-slate-500 hover:text-brand">Refund Policy</Link></li>
                <li><Link to="/affiliate-disclosure" className="text-sm text-slate-500 hover:text-brand">Affiliate Disclosure</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Connect</h3>
               <Link to="/join" className="inline-flex items-center space-x-2 bg-[#0088cc] text-white px-4 py-2 rounded font-medium w-full justify-center hover:bg-[#0077b3] transition-colors rounded-lg shadow-sm">
                <MessageCircle size={18} />
                <span>Join Telegram</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Affiliate Disclosure line */}
        <div className="bg-gray-100 dark:bg-slate-950 py-2 px-6 mt-4 border-t border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-500 uppercase tracking-tight">
             <p className="text-center md:text-left mb-2 md:mb-0">&copy; {new Date().getFullYear()} Deals of the Day. All rights reserved.</p>
             <p className="text-center md:text-right">
                Affiliate Disclosure: We may earn commission from qualifying purchases through affiliate links at no extra cost to users. 
                <span className="font-bold ml-1">Amazon Associate & EarnKaro Partner.</span>
             </p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 h-16 flex items-center px-4 shrink-0 shadow-2xl z-50">
        <div className="flex justify-between w-full max-w-2xl mx-auto items-center">
          <Link to="/" className="flex flex-col items-center text-brand">
            <span className="text-lg mb-0.5">🏠</span>
            <span className="text-[9px] font-bold">HOME</span>
          </Link>
          <Link to="/deals" className="flex flex-col items-center text-gray-500 hover:text-brand dark:text-gray-400">
            <span className="text-lg mb-0.5">🔥</span>
            <span className="text-[9px] font-bold">DEALS</span>
          </Link>
          <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
            <Link to="/join" className="bg-black dark:bg-slate-800 p-3 rounded-full -mt-8 border-4 border-gray-50 dark:border-slate-900 shadow-xl flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </Link>
          </div>
          <Link to="/blog" className="flex flex-col items-center text-gray-500 hover:text-brand dark:text-gray-400">
            <span className="text-lg mb-0.5">📝</span>
            <span className="text-[9px] font-bold">BLOG</span>
          </Link>
          <Link to="/compare" className="flex flex-col items-center text-gray-500 hover:text-brand dark:text-gray-400">
            <span className="text-lg mb-0.5">⚖️</span>
            <span className="text-[9px] font-bold">COMPARE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
