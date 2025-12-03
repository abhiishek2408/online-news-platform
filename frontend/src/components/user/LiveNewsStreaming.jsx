import React, { useEffect, useState, useRef, useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';

const LiveNewsStreaming = () => {
  const { darkMode } = useContext(ThemeContext);
  const [breakingNews, setBreakingNews] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [loading, setLoading] = useState(true);

  // ⏰ Clock logic
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // 📡 Fetch breaking news with 4 sec delay
  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const res = await fetch('https://online-news-platform-backend.onrender.com/api/live-updates');
        const updates = await res.json();
        setTimeout(() => {
          setBreakingNews(updates);
          setLoading(false);
        }, 4000); // 4 seconds skeleton
      } catch (error) {
        console.error('Error fetching live updates:', error);
        setBreakingNews([]);
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, []);

  // 🔁 Auto-scroll breaking news
  const breakingNewsRef = useRef(null);
  useEffect(() => {
    if (!loading && breakingNews.length > 0 && breakingNewsRef.current) {
      const el = breakingNewsRef.current;
      const step = 1; // pixels per tick
      const interval = setInterval(() => {
        if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
          el.scrollTop = 0; // loop back to top
        } else {
          el.scrollTop += step;
        }
      }, 50); // adjust speed by changing delay or step
      return () => clearInterval(interval);
    }
  }, [loading, breakingNews]);

  return (
    <div className={`w-full mx-auto max-w-[1200px] mt-4 px-3 md:px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`relative rounded-3xl overflow-hidden border-2 shadow-xl transition-colors duration-300 ${darkMode ? 'border-purple-800/70 bg-gray-900' : 'border-purple-100 bg-white'}`}> 
        {/* Decorative gradient backdrop */}
        <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'opacity-10 bg-gray-900' : 'opacity-5 bg-white'}`}> 
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-pink-500 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className={`relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-6 border-b transition-colors duration-300 ${darkMode ? 'border-purple-700/70 bg-gray-900' : 'border-purple-200 bg-white'}`}> 
          {loading ? (
            <>
              {/* Header skeleton */}
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 bg-gradient-to-br rounded-xl animate-pulse ${darkMode ? 'from-purple-900 to-pink-900' : 'from-purple-200 to-pink-200'}`} />
                <div className="space-y-2">
                  <div className={`h-8 w-56 bg-gradient-to-r rounded-lg animate-pulse ${darkMode ? 'from-purple-900 via-pink-900 to-purple-900' : 'from-purple-200 via-pink-200 to-purple-200'}`} />
                  <div className={`h-4 w-40 rounded animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`h-9 w-20 bg-gradient-to-r rounded-full animate-pulse ${darkMode ? 'from-purple-900 to-pink-900' : 'from-purple-200 to-pink-200'}`} />
                <div className={`h-9 w-24 rounded-lg animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-sm opacity-80" />
                  <div className={`relative p-3 rounded-xl bg-gradient-to-br shadow-lg ${darkMode ? 'from-purple-900/40 to-pink-900/40' : 'from-purple-50 to-pink-50'}`}> 
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 4a2 2 0 012-2h9a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
                      <path d="M16 8l4 2-4 2V8z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h1 className={`text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 dark:from-purple-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent tracking-tight ${darkMode ? 'drop-shadow-lg' : ''}`}>Live News Streaming</h1>
                  <p className={`text-xs md:text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Real-time updates & broadcast</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md ${darkMode ? 'bg-gradient-to-r from-purple-700 to-pink-700 border border-purple-700' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}> 
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                  </span>
                  <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
                </div>
                <div className={`px-4 py-2 rounded-lg border text-sm font-mono shadow-sm ${darkMode ? 'bg-gray-900 border-purple-800 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}> 
                  {currentTime}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content area */}
        <div className={`relative grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}> 
          {loading ? (
            <>
              {/* Video skeleton */}
              <div className="lg:col-span-2 space-y-4">
                <div className={`h-10 w-2/3 bg-gradient-to-r rounded-lg ${darkMode ? 'from-purple-900 via-pink-900 to-purple-900' : 'from-purple-200 via-pink-200 to-purple-200'}`} />
                <div className={`relative h-72 bg-gradient-to-br rounded-2xl overflow-hidden ${darkMode ? 'from-gray-700 via-gray-600 to-gray-700' : 'from-gray-200 via-gray-300 to-gray-200'}`}> 
                  <div className={`absolute inset-0 bg-gradient-to-r animate-shimmer ${darkMode ? 'from-transparent via-white/10 to-transparent' : 'from-transparent via-white/30 to-transparent'}`} />
                </div>
              </div>
              {/* Breaking news skeleton */}
              <div className="space-y-3 max-h-[420px] overflow-hidden">
                <div className={`h-8 w-1/2 bg-gradient-to-r rounded-lg ${darkMode ? 'from-purple-900 to-pink-900' : 'from-purple-200 to-pink-200'}`} />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`h-5 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Video Section */}
              <div className="lg:col-span-2 relative">
                <div className={`group rounded-2xl overflow-hidden border shadow-lg transition-colors duration-300 ${darkMode ? 'border-purple-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}> 
                  <div className="p-4 pb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 4a2 2 0 012-2h9a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
                      <path d="M16 8l4 2-4 2V8z" />
                    </svg>
                    <h2 className={`text-lg font-bold ${darkMode ? 'text-gray-200 drop-shadow-lg' : 'text-gray-800'}`}>Live Broadcast</h2>
                  </div>
                  <div className="relative pt-[56.25%]">
                    <iframe
                      src="https://www.youtube.com/embed/MzEFeIRJ0eQ?autoplay=1"
                      frameBorder="0"
                      allowFullScreen
                      title="Live News Stream"
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Breaking News Section */}
                <div className={`relative rounded-2xl border shadow-lg max-h-[560px] overflow-hidden flex flex-col transition-colors duration-300 ${darkMode ? 'border-purple-800 bg-gray-900' : 'border-gray-200 bg-white'}`}> 
                <div className={`p-4 pb-2 flex items-center gap-2 border-b transition-colors duration-300 ${darkMode ? 'border-purple-800 bg-gray-900' : 'border-gray-200 bg-white'}`}> 
                  <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3h12a1 1 0 011 1v2H3V4a1 1 0 011-1z" />
                    <path d="M3 7h14v6a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
                    <path d="M8 9h4v2H8V9z" />
                  </svg>
                  <h2 className={`text-sm font-bold tracking-wide uppercase ${darkMode ? 'text-gray-200 drop-shadow-lg' : 'text-gray-700'}`}>Breaking News</h2>
                </div>
                <ul ref={breakingNewsRef} className={`flex-1 overflow-y-auto custom-scroll space-y-2 p-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}> 
                  {breakingNews.length > 0 ? (
                    breakingNews.map((update, idx) => (
                      <li
                        key={idx}
                        className={`relative bg-gradient-to-r px-4 py-2.5 rounded-lg border text-sm shadow-sm transition-colors duration-300 ${darkMode ? 'from-gray-900/40 to-gray-900/20 border-purple-800 text-gray-200' : 'from-white to-gray-50 border-gray-200 text-gray-800'}`}
                      >
                        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-lg" />
                        {update.message}
                      </li>
                    ))
                  ) : (
                    <li className={`text-center italic py-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No live updates available.</li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveNewsStreaming;
