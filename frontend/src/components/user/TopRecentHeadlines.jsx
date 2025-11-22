import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const RecentHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeadlines = async () => {
      try {
        const res = await fetch("https://online-news-platform-backend.onrender.com/api/headlines");
        const data = await res.json();
        setTimeout(() => {
          setHeadlines(data.slice(0, 10));
          setLoading(false);
        }, 4000);
      } catch (err) {
        console.error("Error loading headlines:", err);
        setLoading(false);
      }
    };

    loadHeadlines();
  }, []);

  return (
    <div className="group relative bg-white dark:bg-gray-800 border-2 border-purple-100 dark:border-purple-800/50 rounded-2xl p-6 flex flex-col w-full max-w-md shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      {!loading && (
        <div className="relative mb-5 pb-4 border-b-2 border-purple-200 dark:border-purple-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Icon with gradient border */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-sm opacity-75"></div>
                <div className="relative p-2.5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/40 rounded-lg shadow-lg">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Title */}
              <div>
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 dark:from-purple-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
                  Recent Headlines
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Latest breaking news</p>
              </div>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-full shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
            </div>
          </div>
        </div>
      )}

      {/* Headlines List */}
      <div className="relative flex-1 overflow-y-auto custom-scroll max-h-[530px] pr-2">
        <ul className="space-y-2.5">
          {loading ? (
            Array.from({ length: 16 }).map((_, idx) => (
              <li
                key={idx}
                className="relative overflow-hidden"
              >
                <div className="h-12 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-purple-900/20 rounded-lg animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent animate-shimmer"></div>
                </div>
              </li>
            ))
          ) : headlines.length === 0 ? (
            <li className="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="font-medium">No headlines available</p>
            </li>
          ) : (
            headlines.map((h, index) => (
              <li
                key={index}
                className="group/item relative"
              >
                <Link
                  to={`/user/dashboard/headlineview?id=${h._id}`}
                  className="block p-3.5 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-700/30 dark:to-transparent hover:from-purple-50 hover:to-pink-50/30 dark:hover:from-purple-900/30 dark:hover:to-pink-900/20 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Number Badge */}
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-md group-hover/item:scale-110 transition-transform duration-300">
                      {index + 1}
                    </span>
                    
                    {/* Headline Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors duration-300 line-clamp-2 leading-relaxed">
                        {h.headline}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <svg 
                      className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transform group-hover/item:translate-x-1 transition-all duration-300 opacity-0 group-hover/item:opacity-100" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Accent Border on Hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Footer - View More Link */}
      {!loading && headlines.length > 0 && (
        <div className="relative mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/user/dashboard/all-headlines"
            className="group/btn flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden relative"
          >
            {/* Animated Background Shine */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
            
            <span className="relative z-10">View All Headlines</span>
            <svg 
              className="relative z-10 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentHeadlines;
