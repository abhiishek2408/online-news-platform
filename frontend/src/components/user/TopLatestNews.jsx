import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LatestNews = () => {
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
    <div className="relative w-full max-w-[1000px] mx-auto mt-4 px-3 md:px-4 py-5 bg-white dark:bg-gray-800 border-2 border-purple-100 dark:border-purple-800/50 rounded-2xl shadow-lg overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="relative mb-5 pb-4 border-b-2 border-purple-200 dark:border-purple-700/50">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-lg animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-lg w-40 animate-pulse"></div>
          </div>
        ) : (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              {/* Icon with gradient border */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-sm opacity-75"></div>
                <div className="relative p-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/40 rounded-lg shadow-lg">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                  </svg>
                </div>
              </div>
              
              {/* Title */}
              <div>
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 dark:from-purple-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
                  Latest News
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Stay updated with breaking stories</p>
              </div>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-full shadow-md">
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
            <div key={i} className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-700/30 dark:to-transparent p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start gap-3 animate-pulse">
              <div className="w-full sm:w-24 h-40 sm:h-24 bg-gradient-to-br from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent animate-shimmer"></div>
              </div>
              <div className="flex-1 space-y-2 w-full">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-4/5"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-11/12"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
              </div>
            </div>
          ))
        ) : newsList.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No news available</p>
          </div>
        ) : (
          newsList.map((news, index) => (
            <div
              key={news._id}
              className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-700/40 dark:to-transparent p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md flex flex-col sm:flex-row items-start gap-3"
            >
              {/* Image */}
              <Link
                to={`/user/dashboard/latestnewsview?id=${news._id}`}
                className="relative w-full sm:w-28 h-40 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-md"
              >
                <img
                  src={news.image}
                  alt="News Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full text-xs font-bold shadow-md">
                  View →
                </div>
              </Link>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-2">
                <Link
                  to={`/user/dashboard/latestnewsview?id=${news._id}`}
                  className="block"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                    {news.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {news.description}
                </p>
                {/* Meta Info */}
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Published: {news.published_at ? new Date(news.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
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
                    className={`group flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-xs rounded-full border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 shadow-sm hover:shadow-md transition-all duration-300 ${likedNews[news._id] ? 'cursor-not-allowed opacity-70' : 'hover:scale-105'}`}
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
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-2xl"></div>
            </div>
          ))
        )}
      </div>

      {/* Footer - See More Link */}
      <div className="relative mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
        {loading ? (
          <div className="h-10 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-full w-56 mx-auto animate-pulse"></div>
        ) : (
          <div className="flex justify-end">
            <Link
              to="/user/dashboard/all-latestnews"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm rounded-full shadow-md"
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
