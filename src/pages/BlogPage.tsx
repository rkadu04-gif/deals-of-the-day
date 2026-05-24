import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogData';

export default function BlogPage() {
  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen py-10">
      <Helmet>
        <title>Blog & Tech Guides | Deals of the Day</title>
        <meta name="description" content="Read expert reviews, buying guides, and tricks to save money on smartphones, laptops, electronics, and fashion." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-heading font-black mb-4 dark:text-white">
            Shopping Guides & Reviews
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            In-depth guides, product reviews, and money-saving hacks so you never overpay again. Read our detailed expert pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-slate-800 flex flex-col hover:shadow-md transition-shadow">
              <div className="h-48 md:h-56 relative overflow-hidden group">
                <Link to={`/blog/${post.slug}`}>
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute top-4 left-4 bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                    {post.category}
                  </span>
                </Link>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                  <div className="flex items-center space-x-1.5">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-3 dark:text-white leading-tight">
                  <Link to={`/blog/${post.slug}`} className="hover:text-brand transition-colors line-clamp-2">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-bold text-brand hover:text-brand-dark transition-colors">
                    <span>Read Full Article</span>
                    <ArrowRight size={16} className="ml-1.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
