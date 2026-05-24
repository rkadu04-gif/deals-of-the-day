import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon portion */}
      <div className="relative flex-shrink-0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 512 512" 
          className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md"
        >
          <defs>
            <linearGradient id="logo-bag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#f43f5e" floodOpacity="0.4" />
            </filter>
          </defs>
          <path d="M 176 170 C 176 60, 336 60, 336 170" fill="none" stroke="#1e293b" strokeWidth="40" strokeLinecap="round" className="dark:stroke-white transition-colors" />
          <rect x="80" y="160" width="352" height="320" rx="48" fill="url(#logo-bag-grad)" filter="url(#logo-shadow)" />
          <text x="256" y="380" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="160" textAnchor="middle">%</text>
        </svg>
      </div>

      {/* Text portion */}
      {!iconOnly && (
        <div className="flex flex-col justify-center leading-none">
          <span className="font-heading font-black text-xl sm:text-2xl tracking-tighter text-brand">
            DEALS
          </span>
          <span className="font-sans font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-800 dark:text-slate-100">
            of the Day
          </span>
        </div>
      )}
    </div>
  );
};
