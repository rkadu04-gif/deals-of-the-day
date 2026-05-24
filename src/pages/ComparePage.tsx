import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Watch, Headphones, ArrowRight } from 'lucide-react';

export default function ComparePage() {
  const comparisonCategories = [
    {
      title: 'Smartphones',
      desc: 'Compare cameras, battery life, and gaming performance.',
      icon: <Smartphone size={32} className="text-pink-500" />,
      examples: ['iPhone 15 vs Samsung S24', 'POCO X6 Pro vs Redmi Note 13 Pro'],
    },
    {
      title: 'Laptops',
      desc: 'Gaming vs Productivity. Find the right machine for you.',
      icon: <Laptop size={32} className="text-blue-500" />,
      examples: ['MacBook Air M3 vs Dell XPS 13', 'HP Victus vs Lenovo Legion'],
    },
    {
      title: 'Smartwatches',
      desc: 'Fitness tracking, battery life, and AMOLED displays.',
      icon: <Watch size={32} className="text-orange-500" />,
      examples: ['Apple Watch SE vs Garmin Forerunner', 'Noise ColorFit vs Fire-Boltt'],
    },
    {
      title: 'Earbuds',
      desc: 'ANC, sound quality, and battery life showdowns.',
      icon: <Headphones size={32} className="text-purple-500" />,
      examples: ['AirPods Pro vs Galaxy Buds2 Pro', 'Realme Buds vs boAt Nirvana'],
    }
  ];

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen py-10">
      <Helmet>
        <title>Compare Products | Deals of the Day</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-brand/10 text-brand font-bold text-sm mb-4 tracking-wide uppercase">
            Coming Soon
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-slate-900 dark:text-white">
            The Ultimate Product Comparison Tool
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We are building a powerful tool to let you compare specs, historic prices, and real-world performance side-by-side. Check out the categories we plan to support below!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {comparisonCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                {category.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {category.desc}
              </p>
              
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Popular Comparisons coming up</h4>
                <ul className="space-y-2">
                  {category.examples.map((example, idx) => (
                    <li key={idx} className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand mr-2"></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Are you looking for a specific comparison? Let us know!</p>
          <Link to="/contact" className="inline-flex items-center justify-center space-x-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-brand hover:text-white transition-colors">
            <span>Suggest a Comparison</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
}
