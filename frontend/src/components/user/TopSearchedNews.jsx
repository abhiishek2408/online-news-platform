import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from './Context/SearchContext';
import { ThemeContext } from './Context/ThemeContext';

const TopSearchedNews = () => {
  const { keyword, triggerSearch } = useContext(SearchContext);
  const { darkMode } = useContext(ThemeContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchNewsByKeyword = async (searchTerm) => {
    try {
      setLoading(true);
      const res = await fetch(`https://online-news-platform-backend.onrender.com/api/newsapi/api-news-search?q=${searchTerm}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setTimeout(() => setLoading(false), 4000);
    }
  };

  // Run effect after handleSearch() or keyword change
  useEffect(() => {
    if (keyword.trim()) {
      console.log("Searching for:", keyword); // Debug line
      fetchNewsByKeyword(keyword);
      setTimeout(() => {
        document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [triggerSearch, keyword]);


  useEffect(() => {
    fetchNewsByKeyword('Technology');
  }, []);

  return (
    <div className={`w-full max-w-[1200px] mx-auto mt-5 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}` }>
      <div className={`relative p-6 rounded-3xl border-2 shadow-xl overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-purple-800/70' : 'bg-white border-purple-100'}` }>
        {/* Decorative Background Pattern */}
        <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'opacity-10 bg-gray-900' : 'opacity-5 bg-white'}` }>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500 rounded-full blur-3xl"></div>
        </div>

        {/* Header Section */}
        <div className={`relative mb-8 pb-5 border-b-2 transition-colors duration-300 ${darkMode ? 'border-purple-800 bg-gray-900' : 'border-purple-200 bg-white'}` }>
          {loading ? (
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-xl animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-8 w-64 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Icon with gradient border */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-sm opacity-75"></div>
                  <div className={`relative p-3 rounded-xl shadow-lg ${darkMode ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40' : 'bg-gradient-to-br from-purple-50 to-pink-50'}` }>
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {/* Title */}
                <div>
                  <h2 className={`text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 drop-shadow-lg' : 'bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600'}` }>
                    Top Searched News
                  </h2>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}` }>Trending topics & popular stories</p>
                </div>
              </div>

              {/* Badge */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg ${darkMode ? 'bg-gradient-to-r from-purple-700 to-pink-700 border border-purple-800' : 'bg-gradient-to-r from-purple-600 to-pink-600'}` }>
                <svg className="w-4 h-4 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-bold text-white tracking-wider">TRENDING</span>
              </div>
            </div>
          )}
        </div>

        {/* News Cards Grid */}
        <div id="search-results" className={`relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}` }>
          {loading
            ? Array(4).fill().map((_, idx) => (
                <div key={idx} className={`relative overflow-hidden bg-gradient-to-br rounded-2xl border p-4 flex flex-col gap-3 transition-colors duration-300 ${darkMode ? 'from-gray-900/30 to-transparent border-purple-800 bg-gray-900' : 'from-gray-50 to-transparent border-gray-200 bg-white'}` }>
                  <div className={`w-full h-48 bg-gradient-to-br rounded-xl relative overflow-hidden ${darkMode ? 'from-purple-900 via-pink-900 to-purple-900' : 'from-purple-200 via-pink-200 to-purple-200'}` }>
                    <div className={`absolute inset-0 bg-gradient-to-r animate-shimmer ${darkMode ? 'from-transparent via-white/10 to-transparent' : 'from-transparent via-white/30 to-transparent'}` }></div>
                  </div>
                    <div className="space-y-3">
                      <div className={`h-5 bg-gradient-to-r rounded-lg w-5/6 ${darkMode ? 'from-gray-800 to-gray-700' : 'from-gray-200 to-gray-300'}` }></div>
                      <div className={`h-4 rounded w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}` }></div>
                      <div className={`h-4 rounded w-11/12 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}` }></div>
                      <div className={`h-10 bg-gradient-to-r rounded-lg w-full mt-2 ${darkMode ? 'from-purple-900 to-pink-900' : 'from-purple-200 to-pink-200'}` }></div>
                  </div>
                </div>
              ))
            : articles.length > 0
            ? articles.map((article, idx) => (
                <div
                  key={idx}
                  className={`group relative bg-gradient-to-br rounded-2xl shadow-lg border-2 overflow-hidden flex flex-col transition-colors duration-300 ${darkMode ? 'from-gray-900/40 to-transparent border-purple-800 bg-gray-900' : 'from-white to-gray-50/50 border-gray-200 bg-white'}`}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.urlToImage || 'https://placehold.co/300x160?text=News'}
                      alt="news"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Source Badge */}
                    {article.source?.name && (
                      <div className={`absolute top-3 left-3 px-3 py-1 backdrop-blur-sm rounded-full text-xs font-bold shadow-lg ${darkMode ? 'bg-gray-900/90 text-purple-400' : 'bg-white/90 text-purple-600'}` }>
                        {article.source.name}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow gap-3">
                    <h3 className={`font-bold text-base line-clamp-2 leading-tight ${darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900'}` }>
                      {article.title}
                    </h3>
                    <p className={`text-sm line-clamp-3 leading-relaxed flex-grow ${darkMode ? 'text-gray-300' : 'text-gray-600'}` }>
                      {article.description || 'No description available.'}
                    </p>

                    {/* Read More Button */}
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-md mt-auto transition-colors duration-300 hover:scale-105 overflow-hidden relative ${darkMode ? 'from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600' : 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
                    >
                      <span>Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>

                  {/* Accent Border */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b rounded-l-2xl ${darkMode ? 'from-purple-800 to-pink-800' : 'from-purple-500 to-pink-500'}`}></div>
                </div>
              ))
            : (
              <div className={`col-span-full text-center py-16 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}` }>
                <svg className={`w-20 h-20 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}` } fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}` }>No articles found</p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}` }>Try searching for something else</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default TopSearchedNews;
