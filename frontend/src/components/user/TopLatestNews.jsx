import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  const { darkMode } = useContext(ThemeContext);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  // Track like state for each news item
  const [likedNews, setLikedNews] = useState({});
  const [likeCounts, setLikeCounts] = useState({});

  // Like handler for a news item
  const handleLike = async (newsId) => {
    if (likedNews[newsId]) return;
    try {
      // Use the correct backend endpoint for like
      const res = await fetch(`https://online-news-platform-backend.onrender.com/api/latest-headlines/${newsId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setLikeCounts(prev => ({ ...prev, [newsId]: data.likes }));
      setLikedNews(prev => ({ ...prev, [newsId]: true }));
    } catch (err) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    const loadLatestNewsCards = async () => {
      try {
        const res = await fetch("https://online-news-platform-backend.onrender.com/api/latest-news");
        const data = await res.json();
        setTimeout(() => {
          const sliced = data.slice(0, 4);
          setNewsList(sliced);
          // Initialize like counts and liked state
          const likeMap = {};
          const likedMap = {};
          sliced.forEach(item => {
            likeMap[item._id] = item.likes || 0;
            likedMap[item._id] = false;
          });
          setLikeCounts(likeMap);
          setLikedNews(likedMap);
          setLoading(false);
        }, 4000);
      } catch (err) {
        console.error("Error loading latest news cards:", err);
        setLoading(false);
      }
    };

    loadLatestNewsCards();
  }, []);

  return (
    <div className={`relative w-full max-w-[1000px] mx-auto mt-4 px-3 md:px-4 py-5 border-2 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-purple-800/70' : 'bg-white border-purple-100'}`}>
      {/* Decorative Background Pattern */}
      <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'opacity-10 bg-gray-900' : 'opacity-5 bg-white'}`}> 
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className={`relative mb-5 pb-4 border-b-2 ${darkMode ? 'border-purple-700/50 bg-gray-900' : 'border-purple-200 bg-white'}`}> 
        {loading ? (
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 bg-gradient-to-br rounded-lg animate-pulse ${darkMode ? 'from-purple-900 to-pink-900' : 'from-purple-200 to-pink-200'}`}></div>
            <div className={`h-6 bg-gradient-to-r rounded-lg w-40 animate-pulse ${darkMode ? 'from-purple-900 to-pink-900' : 'from-purple-200 to-pink-200'}`}></div>
          </div>
        ) : (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              {/* Icon with gradient border */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-sm opacity-75"></div>
                <div className={`relative p-2 bg-gradient-to-br rounded-lg shadow-lg ${darkMode ? 'from-purple-900/40 to-pink-900/40' : 'from-purple-50 to-pink-50'}`}> 
                  <svg className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}` } fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                  </svg>
                </div>
              </div>
              
              {/* Title */}
              <div>
                <h2 className={`text-2xl font-extrabold bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 drop-shadow-lg' : 'bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600'}`}> 
                  Latest News
                </h2>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stay updated with breaking stories</p>
              </div>
            </div>

            {/* Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md ${darkMode ? 'bg-gradient-to-r from-purple-700 to-pink-700 border border-purple-700' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}> 
              <svg className="w-3.5 h-3.5 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-bold text-white tracking-wider">UPDATED</span>
            </div>
          </div>
        )}
      </div>

      {/* News Cards or Skeletons */}
      <div className="relative min-h-[200px] flex flex-col gap-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`relative overflow-hidden bg-gradient-to-br p-3 rounded-lg border flex flex-col sm:flex-row items-start gap-3 animate-pulse ${darkMode ? 'from-gray-900/30 to-transparent border-purple-800 bg-gray-900' : 'from-gray-50 to-transparent border-gray-200 bg-white'}`}> 
              <div className={`w-full sm:w-24 h-40 sm:h-24 bg-gradient-to-br rounded-lg relative overflow-hidden ${darkMode ? 'from-purple-900 via-pink-900 to-purple-900' : 'from-purple-200 via-pink-200 to-purple-200'}`}> 
                <div className={`absolute inset-0 bg-gradient-to-r animate-shimmer ${darkMode ? 'from-transparent via-white/10 to-transparent' : 'from-transparent via-white/30 to-transparent'}`}></div>
              </div>
              <div className="flex-1 space-y-2 w-full">
                <div className={`h-5 bg-gradient-to-r rounded-lg w-4/5 ${darkMode ? 'from-gray-800 to-gray-700' : 'from-gray-200 to-gray-300'}`}></div>
                <div className={`h-3 rounded-lg w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                <div className={`h-3 rounded-lg w-11/12 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                <div className={`h-3 rounded-lg w-3/4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          ))
        ) : newsList.length === 0 ? (
          <div className={`text-center py-12 ${darkMode ? 'bg-gray-900' : ''}` }>
            <svg className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}` } fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No news available</p>
          </div>
        ) : (
          newsList.map((news, index) => (
            <div
              key={news._id}
              className={`group relative bg-gradient-to-br p-3 rounded-xl border-2 shadow-md flex flex-col sm:flex-row items-start gap-3 transition-colors duration-300 ${darkMode ? 'from-gray-900/40 to-transparent border-purple-800 bg-gray-900' : 'from-white to-gray-50/50 border-gray-200 bg-white'}`}
            >
              {/* Image */}
              <Link
                to={`/user/dashboard/latestnewsview?id=${news._id}`}
                className={`relative w-full sm:w-28 h-40 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-md ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              >
                <img
                  src={news.image}
                  alt="News Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-black/60' : 'from-black/30'} via-transparent to-transparent`}></div>
                <div className={`absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-bold shadow-md ${darkMode ? 'bg-gray-900 text-purple-400' : 'bg-white text-purple-600'}`}> 
                  View →
                </div>
              </Link>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-2">
                <Link
                  to={`/user/dashboard/latestnewsview?id=${news._id}`}
                  className="block"
                >
                  <h3 className={`text-lg font-bold line-clamp-2 leading-tight ${darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
                    {news.title}
                  </h3>
                </Link>
                <p className={`text-sm line-clamp-2 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {news.description}
                </p>
                {/* Meta Info */}
                <div className={`flex items-center gap-3 mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}> 
                  <div className="flex items-center gap-1">
                    <svg className={`w-3.5 h-3.5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}` } fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Published: {news.published_at ? new Date(news.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className={`w-3.5 h-3.5 ${darkMode ? 'text-pink-400' : 'text-pink-600'}` } fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{news.category}</span>
                  </div>
                </div>
                {/* Like Button Row */}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleLike(news._id)}
                    disabled={likedNews[news._id]}
                    className={`group flex items-center gap-1.5 px-3 py-1.5 font-medium text-xs rounded-full border shadow-sm hover:shadow-md transition-all duration-300 ${likedNews[news._id]
                      ? darkMode
                        ? 'bg-red-900/20 border-red-700 text-red-400 cursor-not-allowed opacity-70'
                        : 'bg-red-50 border-red-300 text-red-600 cursor-not-allowed opacity-70'
                      : darkMode
                        ? 'bg-gray-900 hover:bg-gray-800 text-gray-200 border-purple-800 hover:border-purple-700 hover:scale-105'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400 hover:scale-105'}`}
                  >
                    <svg className="w-3.5 h-3.5 transition-all duration-300" fill={likedNews[news._id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{likedNews[news._id] ? 'Liked' : 'Like'}</span>
                    <span className="font-bold">({likeCounts[news._id] || 0})</span>
                  </button>
                </div>
              </div>
              {/* Accent Border */}
              <div className={`absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b rounded-r-2xl ${darkMode ? 'from-purple-800 to-pink-800' : 'from-purple-500 to-pink-500'}`}></div>
            </div>
          ))
        )}
      </div>

      {/* Footer - See More Link */}
      <div className={`relative mt-5 pt-4 border-t ${darkMode ? 'border-purple-800 bg-gray-900' : 'border-gray-200 bg-white'}`}> 
        {loading ? (
          <div className={`h-10 rounded-full w-56 mx-auto animate-pulse ${darkMode ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-purple-200 to-pink-200'}`}></div>
        ) : (
          <div className="flex justify-end">
            <Link
              to="/user/dashboard/all-latestnews"
              className={`inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm rounded-full shadow-md transition-all duration-300 hover:scale-105 overflow-hidden relative ${darkMode ? 'bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 text-white border border-purple-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'}`}
            >
              <span>See More Latest News</span>
              <svg 
                className="w-5 h-5" 
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
    </div>
  );
};

export default LatestNews;
