import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogData';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark text-gray-800 dark:text-gray-200 px-4 text-center">
        <h1 className="text-4xl font-black mb-4">Article Not Found</h1>
        <p className="mb-8 text-gray-500">The article you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="px-6 py-3 bg-brand text-white rounded-lg font-bold hover:bg-brand-dark transition-colors">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen pb-16">
      <Helmet>
        <title>{post.title} | Deals of the Day</title>
        <meta name="description" content={post.metaDescription} />
        {/* Canonical URL indicates this is a genuine article post to search engines */}
        <link rel="canonical" href={`https://dealsofday.test/blog/${post.slug}`} />
      </Helmet>

      {/* Hero Header */}
      <div className="w-full h-[40vh] md:h-[50vh] min-h-[300px] relative">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent flex flex-col justify-end p-6 md:p-12 lg:px-20">
          <div className="max-w-4xl mx-auto w-full">
            <span className="bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block shadow-md">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl shadow-sm">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Meta Details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-6 mb-10">
          <Link to="/blog" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-brand transition-colors mb-4 md:mb-0 bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
            <ArrowLeft size={16} className="mr-1.5" />
            Back to Articles
          </Link>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-brand" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User size={16} className="text-brand" />
              <span>{post.author}</span>
            </div>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-brand transition-colors">
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Markdown Render Wrapper */}
        <article className="prose prose-lg md:prose-xl dark:prose-invert prose-brand max-w-none text-gray-800 dark:text-gray-200">
          {post.content}
        </article>

        {/* Call to Action Footer */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700 rounded-3xl p-8 md:p-12 text-center shadow-sm">
          <h3 className="text-2xl md:text-3xl font-black mb-3 text-gray-900 dark:text-white">Save More on Your Next Purchase!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto text-base md:text-lg">
            Join our Telegram community of 50,000+ members to get instant alerts for flash sales, hidden discounts, and loot deals on items mentioned in this article.
          </p>
          <a href="https://t.me/deals_of_the_day" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
            Join Telegram Channel completely Free
          </a>
        </div>
      </div>
    </div>
  );
}
