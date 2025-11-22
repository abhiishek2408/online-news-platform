import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecentHeadlines from './TopRecentHeadlines';

const HighlightViewPage = () => {
  const [searchParams] = useSearchParams();
  const [highlight, setHighlight] = useState(null);
  const [latestNews, setLatestNews] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const id = searchParams.get("id");
  const type = searchParams.get("type"); // 'highlight' or 'latest-news'

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('Invalid ID');
        setLoading(false);
        return;
      }

      try {
        let res, data;
        if (type === 'latest-news') {
          res = await fetch(`https://online-news-platform-backend.onrender.com/api/latest-news/${id}`);
        } else {
          res = await fetch(`https://online-news-platform-backend.onrender.com/api/highlight/${id}`);
        }

        if (!res.ok) throw new Error('Failed to fetch data');
        data = await res.json();

        if (type === 'latest-news') {
          setLatestNews(data);
        } else {
          setHighlight(data);
          setLikeCount(data?.likes || 0);
          
          // Check if already bookmarked
          const bookmarks = JSON.parse(localStorage.getItem('bookmarkedHighlights') || '[]');
          setIsBookmarked(bookmarks.includes(data?._id));
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  const handleLike = async () => {
    if (isLiked || !highlight) return; // Prevent multiple likes
    
    try {
      const res = await fetch(`https://online-news-platform-backend.onrender.com/api/managehighlights/${highlight._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setLikeCount(data.likes);
      setIsLiked(true);
    } catch (err) {
      console.error("Error liking highlight:", err);
    }
  };

  const handleBookmark = () => {
    if (!highlight) return;

    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedHighlights') || '[]');
    
    if (bookmarks.includes(highlight._id)) {
      alert('This highlight is already bookmarked!');
      return;
    }

    // Add to bookmarks
    bookmarks.push(highlight._id);
    localStorage.setItem('bookmarkedHighlights', JSON.stringify(bookmarks));
    setIsBookmarked(true);
    alert('Added to bookmarks!');
  };

  const handleShare = () => {
    const currentItem = highlight || latestNews;
    if (!currentItem) return;

    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: currentItem.title,
        text: currentItem.description,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center justify-center mb-3">
        <div className="h-7 w-24 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-7 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg w-4/5 mx-auto"></div>
        <div className="h-7 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg w-3/5 mx-auto"></div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
      </div>
      <div className="relative h-64 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent animate-shimmer"></div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-[98%]"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-[95%]"></div>
      </div>
    </div>
  );

  return (
    <div className="px-4 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-950/20 dark:to-pink-950/20 min-h-screen py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">

        {/* Main content */}
        <div className="flex-grow basis-[75%]">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-purple-100 dark:border-purple-800/50 bg-white dark:bg-gray-800">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative p-4 md:p-6">
              {loading && <SkeletonLoader />}

              {error && (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <svg className="w-12 h-12 mx-auto text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">{error}</p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return Home
                  </a>
                </div>
              )}

              {highlight && (
                <>
                  {/* Header Badge */}
                  <div className="flex items-start mb-3">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-full shadow-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-4 leading-tight bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 dark:from-gray-100 dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent drop-shadow-sm">
                    {highlight.title}
                  </h1>

                  <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-medium">Published: {new Date(highlight.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">{highlight.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">{highlight.state}, {highlight.country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-5">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white dark:bg-gray-800">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 rounded-xl overflow-hidden shadow-lg group">
                    <div className="relative overflow-hidden">
                      <img
                        src={highlight.image || '/placeholder.jpg'}
                        alt={highlight.title}
                        className="w-full max-h-[350px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>
                  </div>

                  <div className="prose prose-base max-w-none">
                    <div className="relative p-4 md:p-5 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-700/20 dark:to-transparent rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="absolute top-3 left-3 text-purple-200 dark:text-purple-800 opacity-50">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                        </svg>
                      </div>
                      <p className="text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200 relative z-10 first-letter:text-4xl first-letter:font-bold first-letter:text-purple-600 dark:first-letter:text-purple-400 first-letter:mr-1.5 first-letter:float-left">
                        {highlight.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-start gap-3 flex-wrap">
                    <button
                      onClick={handleLike}
                      disabled={isLiked}
                      className={`flex items-center gap-1.5 px-4 py-2 text-sm ${
                        isLiked 
                          ? 'bg-red-50 border border-red-300 text-red-600 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white'
                      } font-semibold rounded-full shadow-md transition-all`}
                    >
                      <svg className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{isLiked ? 'Liked' : 'Like'}</span>
                      {likeCount > 0 && <span className="font-bold">({likeCount})</span>}
                    </button>
                    
                    <button
                      onClick={handleBookmark}
                      disabled={isBookmarked}
                      className={`flex items-center gap-1.5 px-4 py-2 text-sm ${
                        isBookmarked
                          ? 'bg-purple-50 border border-purple-300 text-purple-600 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-400 cursor-not-allowed'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                      } font-semibold rounded-full shadow-md transition-all`}
                    >
                      <svg className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      {isBookmarked ? 'Saved' : 'Save'}
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-full shadow-md transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </>
              )}

              {latestNews && (
                <>
                  <div className="flex items-start mb-3">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-full shadow-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-4 leading-tight bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 dark:from-gray-100 dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent drop-shadow-sm">
                    {latestNews.title}
                  </h1>

                  <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-medium">Published: {new Date(latestNews.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">{latestNews.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">{latestNews.state}, {latestNews.country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-5">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white dark:bg-gray-800">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 rounded-xl overflow-hidden shadow-lg group">
                    <div className="relative overflow-hidden">
                      <img
                        src={latestNews.image || '/placeholder.jpg'}
                        alt={latestNews.title}
                        className="w-full max-h-[350px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>
                  </div>

                  <div className="prose prose-base max-w-none">
                    <div className="relative p-4 md:p-5 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-700/20 dark:to-transparent rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="absolute top-3 left-3 text-purple-200 dark:text-purple-800 opacity-50">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                        </svg>
                      </div>
                      <p className="text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200 relative z-10 first-letter:text-4xl first-letter:font-bold first-letter:text-purple-600 dark:first-letter:text-purple-400 first-letter:mr-1.5 first-letter:float-left">
                        {latestNews.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-start gap-3 flex-wrap">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-semibold rounded-full shadow-md transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Like
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-full shadow-md transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      Save
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-full shadow-md transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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
        <div className="flex-shrink-0 basis-[25%]">
          <RecentHeadlines />
        </div>

      </div>
    </div>
  );
};

export default HighlightViewPage;

