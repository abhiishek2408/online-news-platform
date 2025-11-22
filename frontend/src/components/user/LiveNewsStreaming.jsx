import React, { useEffect, useState, useRef } from 'react';

const LiveNewsStreaming = () => {
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
    <div className="w-full mx-auto max-w-[1200px] mt-4 px-3 md:px-4">
      <div className="relative rounded-3xl overflow-hidden border-2 border-purple-100 dark:border-purple-800/40 bg-white dark:bg-gray-900 shadow-xl">
        {/* Decorative gradient backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-pink-500 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-6 border-b border-purple-200 dark:border-purple-700/40">
          {loading ? (
            <>
              {/* Header skeleton */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-xl animate-pulse" />
                <div className="space-y-2">
                  <div className="h-8 w-56 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg animate-pulse" />
                  <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-20 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-full animate-pulse" />
                <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-sm opacity-80" />
                  <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/40 shadow-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 4a2 2 0 012-2h9a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
                      <path d="M16 8l4 2-4 2V8z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 dark:from-purple-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent tracking-tight">Live News Streaming</h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Real-time updates & broadcast</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-full shadow-md">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                  </span>
                  <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-700 dark:text-gray-300 shadow-sm">
                  {currentTime}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content area */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-8">
          {loading ? (
            <>
              {/* Video skeleton */}
              <div className="lg:col-span-2 space-y-4">
                <div className="h-10 w-2/3 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 rounded-lg" />
                <div className="relative h-72 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent animate-shimmer" />
                </div>
              </div>
              {/* Breaking news skeleton */}
              <div className="space-y-3 max-h-[420px] overflow-hidden">
                <div className="h-8 w-1/2 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-lg" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Video Section */}
              <div className="lg:col-span-2 relative">
                <div className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-gray-50 dark:bg-gray-800">
                  <div className="p-4 pb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 4a2 2 0 012-2h9a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
                      <path d="M16 8l4 2-4 2V8z" />
                    </svg>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Live Broadcast</h2>
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
              <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800 max-h-[560px] overflow-hidden flex flex-col">
                <div className="p-4 pb-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
                  <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3h12a1 1 0 011 1v2H3V4a1 1 0 011-1z" />
                    <path d="M3 7h14v6a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
                    <path d="M8 9h4v2H8V9z" />
                  </svg>
                  <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wide uppercase">Breaking News</h2>
                </div>
                <ul ref={breakingNewsRef} className="flex-1 overflow-y-auto custom-scroll space-y-2 p-4">
                  {breakingNews.length > 0 ? (
                    breakingNews.map((update, idx) => (
                      <li
                        key={idx}
                        className="relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-700/40 dark:to-gray-800/20 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200 shadow-sm"
                      >
                        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-lg" />
                        {update.message}
                      </li>
                    ))
                  ) : (
                    <li className="text-center text-gray-500 dark:text-gray-400 italic py-6">No live updates available.</li>
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
