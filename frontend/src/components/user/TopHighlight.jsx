import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';
import { Link } from 'react-router-dom';

const TopHighlight = () => {
  const { darkMode } = useContext(ThemeContext);
  const [highlight, setHighlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadHighlight = async () => {
      try {
        const res = await fetch('https://online-news-platform-backend.onrender.com/api/highlights');
        const data = await res.json();
        
      setTimeout(() => {
      setHighlight(data[0]);
      setLikeCount(data[0]?.likes || 0);
      
      // Check if already bookmarked
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedHighlights') || '[]');
      setIsBookmarked(bookmarks.includes(data[0]?._id));
      
      setLoading(false);
      }, 2000);
    } catch (err) {
      console.error("Error loading highlight:", err);
      setLoading(false); // Still hide skeleton if error
    }
    };

    loadHighlight();
  }, []);

  const handleLike = async () => {
    if (isLiked) return; // Prevent multiple likes
    
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

  return (
    <div className={`flex flex-col w-full min-h-[590px] gap-4 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <div className={`min-h-[500px] w-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-white'}`}>
        
        {/* Content or Skeleton */}
        <div className="flex flex-col h-full">
          {loading ? (
            <div className={`p-6 space-y-6 animate-pulse ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              {/* Skeleton Header */}
              <div className="space-y-3">
                <div className={`h-8 bg-gradient-to-r from-purple-200 to-pink-200 ${darkMode ? 'from-purple-900 to-pink-900' : ''} rounded-lg w-3/4`}></div>
                <div className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2`}></div>
              </div>
              
              {/* Skeleton Image */}
              <div className={`h-64 bg-gradient-to-br ${darkMode ? 'from-gray-700 via-gray-600 to-gray-700' : 'from-gray-200 via-gray-300 to-gray-200'} rounded-xl`}></div>
              
              {/* Skeleton Text */}
              <div className="space-y-3">
                <div className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-full`}></div>
                <div className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-11/12`}></div>
                <div className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-5/6`}></div>
              </div>
            </div>
          ) : (
            highlight && (
              <>
                {/* Header Section */}
                <div className={`relative p-6 pb-5 border-b-2 ${darkMode ? 'border-purple-800/50 bg-gray-900' : 'border-purple-200 bg-white'} overflow-hidden`}>
                  {/* Subtle Background Pattern */}
                  <div className={`absolute inset-0 opacity-5 ${darkMode ? 'bg-gray-900' : ''}`}>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500 rounded-full blur-3xl"></div>
                  </div>
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon with gradient border */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-sm opacity-75"></div>
                        <div className={`relative p-3 bg-gradient-to-br ${darkMode ? 'from-purple-900/40 to-pink-900/40' : 'from-purple-50 to-pink-50'} rounded-xl shadow-lg`}>
                          <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Title with gradient text */}
                      <div>
                        <h2 className={`text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 dark:from-purple-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent tracking-tight ${darkMode ? 'drop-shadow-lg' : ''}`}>
                          Top Highlight
                        </h2>
                        <p className={`text-sm mt-1 flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}> 
                          <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Featured story curated just for you</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative badge */}
                    <div className={`hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 dark:from-purple-700 dark:via-purple-800 dark:to-pink-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border ${darkMode ? 'border-purple-600' : 'border-purple-700'}`}>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-lg"></span>
                      </span>
                      <svg className="w-3.5 h-3.5 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-bold text-white tracking-wider uppercase">Trending</span>
                      <svg className="w-4 h-4 text-white/80 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`p-6 pt-4 flex-1 flex flex-col space-y-5 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
                  {/* Title */}
                  <Link
                    to={`/user/dashboard/articleviewpage?id=${highlight._id}`}
                    className={`group relative block p-5 pb-3 -mx-2 rounded-2xl transition-all duration-300 ${darkMode ? 'hover:bg-gradient-to-br hover:from-purple-900/20 hover:via-pink-900/10 hover:to-transparent' : 'hover:bg-gradient-to-br hover:from-purple-50/50 hover:via-pink-50/30 hover:to-transparent'}`}
                  >
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl"></div>
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br"></div>
                    
                    {/* Side Accent Bar */}
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-1/2 w-1.5 bg-gradient-to-b from-purple-500 via-purple-600 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:h-3/4"></div>
                    
                    {/* Title with Larger Size */}
                    <h3 className={`text-3xl md:text-4xl font-extrabold leading-tight tracking-tight group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-purple-700 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:via-purple-500 dark:group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 line-clamp-3 drop-shadow-sm ${darkMode ? 'text-white' : 'text-gray-900'} ${darkMode ? 'drop-shadow-lg' : ''}`}>
                      {highlight.title}
                    </h3>
                  </Link>


                      {/* Meta Info Section - matches requested design */}
                      <div className="flex items-center justify-between gap-4 mb-1 mt-6 flex-wrap">
                        <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-medium">Published: {highlight.published_at ? new Date(highlight.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium">{highlight.category}</span>
                          </div>
                          <div className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium">{highlight.state}{highlight.state && highlight.country ? ', ' : ''}{highlight.country}</span>
                          </div>
                        </div>
                      </div>

                      
                 

                  {/* Image with Overlay Effect */}
                  <Link 
                    to={`/user/dashboard/articleviewpage?id=${highlight._id}`}
                    className={`group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={highlight.image}
                        alt="Top Highlight"
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Gradient Overlay on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-black/80' : 'from-black/60'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      
                      {/* Read More Badge on Hover */}
                      <div className={`absolute bottom-4 right-4 px-4 py-2 rounded-full font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg ${darkMode ? 'bg-gray-800 text-purple-400' : 'bg-white text-purple-600'}`}> 
                        Read More →
                      </div>
                    </div>
                  </Link>

                  {/* Description */}
                  <div className="flex-1">
                    <p className={`text-base leading-relaxed line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {highlight.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>

                  {/* Footer with CTA */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Trending Now</span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {/* Bookmark Button */}
                        <button
                          onClick={handleBookmark}
                          disabled={isBookmarked}
                          className={`group flex items-center gap-1.5 px-3 py-1.5 font-medium text-xs rounded-full border shadow-sm hover:shadow-md transition-all duration-300 ${isBookmarked
                            ? darkMode
                              ? 'bg-purple-900/20 border-purple-700 text-purple-400 cursor-not-allowed'
                              : 'bg-purple-50 border-purple-300 text-purple-600 cursor-not-allowed'
                            : darkMode
                              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500 hover:scale-105'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400 hover:scale-105'}`}
                        >
                          <svg 
                            className="w-3.5 h-3.5 transition-all duration-300" 
                            fill={isBookmarked ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                        </button>
                        
                        {/* Share Button */}
                        <button
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: highlight.title,
                                text: highlight.description,
                                url: window.location.origin + `/user/dashboard/articleviewpage?id=${highlight._id}`
                              }).catch(() => {});
                            } else {
                              navigator.clipboard.writeText(window.location.origin + `/user/dashboard/articleviewpage?id=${highlight._id}`);
                              alert('Link copied to clipboard!');
                            }
                          }}
                          className={`group flex items-center gap-1.5 px-3 py-1.5 font-medium text-xs rounded-full border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${darkMode
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400'}`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          <span>Share</span>
                        </button>
                        
                        {/* Like Button */}
                        <button
                          onClick={handleLike}
                          disabled={isLiked}
                          className={`group flex items-center gap-1.5 px-3 py-1.5 font-medium text-xs rounded-full border shadow-sm hover:shadow-md transition-all duration-300 ${isLiked
                            ? darkMode
                              ? 'bg-red-900/20 border-red-700 text-red-400 cursor-not-allowed'
                              : 'bg-red-50 border-red-300 text-red-600 cursor-not-allowed'
                            : darkMode
                              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500 hover:scale-105'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400 hover:scale-105'}`}
                        >
                          <svg 
                            className="w-3.5 h-3.5 transition-all duration-300" 
                            fill={isLiked ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{isLiked ? 'Liked' : 'Like'}</span>
                          {likeCount > 0 && <span className="font-bold">({likeCount})</span>}
                        </button>
                      </div>
                    </div>
                    
                    <Link
                      to="/user/dashboard/allhighlightnews"
                      className={`group relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden ${darkMode ? 'border border-purple-700' : ''}`}
                    >
                      {/* Animated Background Shine */}
                      <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700"></div>
                      
                      <span className="relative z-10">View All Highlights</span>
                      <svg 
                        className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHighlight;
