import React, { useEffect, useState } from 'react';

const LiveNewsStreaming = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

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

  // 📡 Fetch breaking news
  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const res = await fetch('http://localhost:3003/api/live-updates');
        const updates = await res.json();
        setBreakingNews(updates);
      } catch (error) {
        console.error('Error fetching live updates:', error);
        setBreakingNews([]);
      }
    };

    fetchBreakingNews();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 w-full max-w-[1000px] bg-white p-3  mx-auto mt-1 rounded-xl shadow-sm items-stretch">
      
      {/* 📺 Live News Section */}
      <div className="w-full lg:w-3/4 bg-white p-1 rounded-xl border border-gray-200 bg-gray-50 relative">
        <h2 className="text-lg font-bold text-purple-700 mb-2 flex items-center">
          <i className="fas fa-tv text-purple-500 mr-2"></i> Live News
        </h2>
        <p className="absolute top-4 right-4 font-sans text-sm text-gray-600 bg-white px-3 py-1 rounded-lg shadow-sm">
          {currentTime}
        </p>
        <div className="relative pt-[56.25%] top-5">
          <iframe
            src="https://www.youtube.com/embed/MzEFeIRJ0eQ?autoplay=1"
            frameBorder="0"
            allowFullScreen
            title="Live News Stream"
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-sm"
          ></iframe>
        </div>
      </div>

      {/* 📰 Breaking News Section */}
      <div className="w-full lg:w-3/4 bg-white p-4 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto custom-scrollbar max-h-[400px]">
        <h2 className="text-lg font-bold text-purple-700 mb-2 flex items-center">
          <i className="fas fa-scroll text-purple-500 mr-2"></i> Breaking News
        </h2>
        <ul className="space-y-2 text-sm">
          {breakingNews.length > 0 ? (
            breakingNews.map((update, idx) => (
              <li
                key={idx}
                className="bg-gradient-to-r from-white to-[#f4f7fa] text-[#222] px-4 py-2.5 rounded shadow border-l-[4px] border-[#4f46e5] font-normal hover:bg-gradient-to-r hover:from-[#edf0fd] hover:to-[#f9faff] hover:text-[#111] hover:shadow-md transition-all duration-300 cursor-pointer text-[14px] font-[Lato]"
              >
                {update.message}
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 italic">No live updates available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LiveNewsStreaming;
