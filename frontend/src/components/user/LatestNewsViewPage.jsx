import React, { useEffect, useState } from 'react';
import { ThemeContext } from './Context/ThemeContext';
import { useSearchParams } from 'react-router-dom';
import RecentHeadlines from './TopRecentHeadlines';

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-8">
    {/* Title Skeleton with Gradient */}
    <div className="space-y-4">
      <div className="h-10 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg w-4/5 mx-auto"></div>
      <div className="h-10 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg w-3/5 mx-auto"></div>
    </div>
    
    {/* Meta Info Skeleton */}
    <div className="flex items-center justify-center gap-6">
      <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-32"></div>
      <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-24"></div>
    </div>
    
    {/* Image Skeleton */}
    <div className="relative h-96 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent animate-shimmer"></div>
    </div>
    
    {/* Content Skeleton */}
    <div className="space-y-4 pt-4">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-[98%]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-[95%]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-[97%]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-[92%]"></div>
    </div>
  </div>
);


const LatestNewsViewPage = () => {
    const { darkMode } = React.useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const newsId = searchParams.get("id");

  useEffect(() => {
    const fetchLatestNewsDetails = async () => {
      if (!newsId) {
        setError('Invalid News ID');
        return;
      }

      try {
        const res = await fetch(`https://online-news-platform-backend.onrender.com/api/latest-news/${newsId}`);
        if (!res.ok) throw new Error('Failed to fetch news');

        const data = await res.json();
        setNews(data);
        setLikeCount(data.likes || 0);
        // Check if saved
        const saved = JSON.parse(localStorage.getItem('savedLatestNews') || '[]');
        setIsSaved(saved.includes(data._id));
      } catch (err) {
        console.error(err);
        setError('Failed to Load News');
      }
    };

    fetchLatestNewsDetails();
  }, [newsId]);

  // Like handler
  const handleLike = async () => {
    if (isLiked || !news) return;
    try {
      const res = await fetch(`https://online-news-platform-backend.onrender.com/api/latest-headlines/${news._id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setLikeCount(data.likes);
      setIsLiked(true);
    } catch (err) {
      // Optionally handle error
    }
  };

  // Save handler
  const handleSave = () => {
    if (!news) return;
    const saved = JSON.parse(localStorage.getItem('savedLatestNews') || '[]');
    if (saved.includes(news._id)) {
      alert('Already saved!');
      return;
    }
    saved.push(news._id);
    localStorage.setItem('savedLatestNews', JSON.stringify(saved));
    setIsSaved(true);
    alert('Saved!');
  };

  return (
    <div className={`px-4 min-h-screen py-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30'}` }>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Main content */}
        <div className="flex-grow basis-[75%]">
          <div className={`relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${darkMode ? 'border-purple-800/50 bg-gray-900' : 'border-purple-100 bg-white'}`}>
            {/* Decorative Background Pattern */}
            <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'opacity-10' : 'opacity-5'}` }>
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative p-8 md:p-12">
              {!news && !error && <SkeletonLoader />}

              {error && (
                <div className="text-center py-16">
                  <div className="mb-6">
                    <svg className="w-20 h-20 mx-auto text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">{error}</p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return Home
                  </a>
                </div>
              )}

              {news && (
                <>

                  {/* Title */}
                  <h1 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-6 leading-tight bg-clip-text text-transparent drop-shadow-sm ${darkMode ? 'bg-gradient-to-r from-gray-100 via-purple-200 to-pink-200' : 'bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900'}` }>
                    {news.title || "Untitled"}
                  </h1>

                  {/* Meta Info Row: published_at, category, state, country (moved above image) */}
                  <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
                    <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}` }>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}` } fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-medium">Published: {news.published_at ? new Date(news.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}` }>
                        <svg className={`w-4 h-4 ${darkMode ? 'text-pink-400' : 'text-pink-600'}` } fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">{news.category}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}` }>
                        <svg className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}` } fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">{news.state}{news.state && news.country ? ', ' : ''}{news.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative mb-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className={`w-full border-t-2 ${darkMode ? 'border-purple-700' : 'border-purple-300'}`}></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className={`px-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}` }>
                        <svg className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}` } fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`mb-5 rounded-xl overflow-hidden shadow-lg group ${darkMode ? 'bg-gray-900' : ''}` }>
                    <div className="relative overflow-hidden">
                      <img
                        src={news.image || '/placeholder.jpg'}
                        alt={news.title || "Image"}
                        className="w-full max-h-[300px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose prose-base max-w-none">
                    <div className={`relative p-4 md:p-5 rounded-xl border transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-purple-800' : 'bg-gradient-to-br from-gray-50/50 to-transparent border-gray-200'}` }>
                      <div className={`absolute top-3 left-3 opacity-50 ${darkMode ? 'text-purple-800' : 'text-purple-200'}` }>
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                        </svg>
                      </div>
                      <p className={`text-sm md:text-base leading-relaxed relative z-10 first-letter:text-4xl first-letter:font-bold first-letter:mr-1.5 first-letter:float-left ${darkMode ? 'text-gray-200 first-letter:text-purple-400' : 'text-gray-800 first-letter:text-purple-600'}` }>
                        {news.description || "No description available."}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 flex items-center justify-start gap-3 flex-wrap">
                    <button
                      onClick={handleLike}
                      disabled={isLiked}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 font-medium text-xs rounded-full border shadow-sm hover:shadow-md transition-all duration-300 ${darkMode ? 'bg-gray-900 hover:bg-gray-800 text-gray-200 border-purple-800 hover:border-purple-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400'} ${isLiked ? 'cursor-not-allowed opacity-70' : 'hover:scale-105'}`}
                    >
                      <svg className="w-3.5 h-3.5 transition-all duration-300" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{isLiked ? 'Liked' : 'Like'}</span>
                      <span className="font-bold">({likeCount || 0})</span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaved}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 font-medium text-xs rounded-full border shadow-sm hover:shadow-md transition-all duration-300 ${darkMode ? 'bg-gray-900 hover:bg-gray-800 text-gray-200 border-purple-800 hover:border-purple-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400'} ${isSaved ? 'cursor-not-allowed opacity-70' : 'hover:scale-105'}`}
                    >
                      <svg className="w-3.5 h-3.5 transition-all duration-300" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (!news) return;
                        const url = window.location.origin + `/user/dashboard/latestnewsview?id=${news._id}`;
                        if (navigator.share) {
                          navigator.share({
                            title: news.title,
                            text: news.description,
                            url
                          }).catch(() => {});
                        } else {
                          navigator.clipboard.writeText(url);
                          alert('Link copied to clipboard!');
                        }
                      }}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 font-medium text-xs rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-900 hover:bg-gray-800 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`flex-shrink-0 basis-[25%] transition-colors duration-300 ${darkMode ? 'bg-gray-900' : ''}` }>
          <RecentHeadlines />
        </div>

      </div>
    </div>
  );
};

export default LatestNewsViewPage;
