import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecentHeadlines from './TopRecentHeadlines';

function HeadlineViewPage() {
  const [searchParams] = useSearchParams();
  const headlineId = searchParams.get('id');

  const [headline, setHeadline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchHeadline = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://online-news-platform-backend.onrender.com/api/headline/${headlineId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch headline');
        }
        const data = await response.json();
        setHeadline(data);
        setLikeCount(data?.likes || 0);
        setError('');
        // Check like state from localStorage
        const likedHeadlines = JSON.parse(localStorage.getItem('likedHeadlines') || '[]');
        setIsLiked(likedHeadlines.includes(data._id));
        // Check save state from localStorage
        const savedHeadlines = JSON.parse(localStorage.getItem('savedHeadlines') || '[]');
        setIsSaved(savedHeadlines.includes(data._id));
      } catch (error) {
        console.error('Error fetching headline:', error);
        setError('Failed to load headline. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (headlineId) {
      fetchHeadline();
    } else {
      setError('No headline ID provided');
      setLoading(false);
    }
  }, [headlineId]);

  // Like handler for LatestHeadlines
  const handleLike = async () => {
    if (isLiked || !headline) return;
    try {
      const res = await fetch(`https://online-news-platform-backend.onrender.com/api/headlines/${headline._id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setLikeCount(data.likes);
      setIsLiked(true);
      // Save liked state in localStorage
      const likedHeadlines = JSON.parse(localStorage.getItem('likedHeadlines') || '[]');
      if (!likedHeadlines.includes(headline._id)) {
        likedHeadlines.push(headline._id);
        localStorage.setItem('likedHeadlines', JSON.stringify(likedHeadlines));
      }
    } catch (err) {
      // Optionally handle error
    }
  };

  // Save/Unsave handler
  const handleSave = () => {
    if (!headline) return;
    let savedHeadlines = JSON.parse(localStorage.getItem('savedHeadlines') || '[]');
    if (isSaved) {
      savedHeadlines = savedHeadlines.filter(id => id !== headline._id);
    } else {
      if (!savedHeadlines.includes(headline._id)) {
        savedHeadlines.push(headline._id);
      }
    }
    localStorage.setItem('savedHeadlines', JSON.stringify(savedHeadlines));
    setIsSaved(!isSaved);
  };

  // Share handler
  const handleShare = async () => {
    if (!headline) return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: headline.title,
          text: headline.title,
          url,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        alert('Failed to copy link.');
      }
    }
  };

  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-8">
      <div className="flex items-center justify-center mb-6">
        <div className="h-10 w-32 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-full"></div>
      </div>
      <div className="space-y-4">
        <div className="h-10 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg w-4/5 mx-auto"></div>
        <div className="h-10 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg w-3/5 mx-auto"></div>
      </div>
      <div className="flex items-center justify-center gap-6">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
      </div>
      <div className="relative h-96 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent animate-shimmer"></div>
      </div>
      <div className="space-y-4 pt-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-[98%]"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-[95%]"></div>
      </div>
    </div>
  );

  return (
    <div className="px-4 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-950/20 dark:to-pink-950/20 min-h-screen py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Main content */}
        <div className="flex-grow basis-[75%]">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-purple-100 dark:border-purple-800/50 bg-white dark:bg-gray-800">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative p-8 md:p-12">
              {loading && <SkeletonLoader />}

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
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return Home
                  </a>
                </div>
              )}

              {headline && (
                <>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-4 leading-tight bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 dark:from-gray-100 dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent drop-shadow-sm">
                    {headline.title}
                  </h1>

                  <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-medium">Published: {headline.published_at ? new Date(headline.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">{headline.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium">{headline.state}{headline.state && headline.country ? ', ' : ''}{headline.country}</span>
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

                  {headline.image && (
                    <div className="mb-5 rounded-xl overflow-hidden shadow-lg group">
                      <div className="relative overflow-hidden">
                        <img
                          src={headline.image || '/placeholder.jpg'}
                          alt={headline.title}
                          className="w-full max-h-[350px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      </div>
                    </div>
                  )}

                  {headline.description && (
                    <div className="prose prose-base max-w-none">
                      <div className="relative p-4 md:p-5 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-700/20 dark:to-transparent rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="absolute top-3 left-3 text-purple-200 dark:text-purple-800 opacity-50">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                          </svg>
                        </div>
                        <p className="text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200 relative z-10 first-letter:text-4xl first-letter:font-bold first-letter:text-purple-600 dark:first-letter:text-purple-400 first-letter:mr-1.5 first-letter:float-left">
                          {headline.description}
                        </p>
                      </div>
                    </div>
                  )}

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
                      <span className="font-bold">({likeCount})</span>
                    </button>
                    
                    <button
                      onClick={handleSave}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 ${isSaved ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'} font-medium text-xs rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      <svg className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button
                      onClick={handleShare}
                      className="group flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-xs rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
        <div className="flex-shrink-0 basis-[25%]">
          <RecentHeadlines />
        </div>

      </div>
    </div>
  );
}

export default HeadlineViewPage;
