import React, { useEffect, useState } from 'react';
import { ThemeContext } from './Context/ThemeContext';
import RecentHeadlines from './TopRecentHeadlines';

const AllRecentHeadlinesPage = () => {
  const [headlines, setHeadlines] = useState([]);
  const { darkMode } = React.useContext(ThemeContext);

  useEffect(() => {
    const loadAllHeadlines = async () => {
      try {
        const res = await fetch("https://online-news-platform-backend.onrender.com/api/headlines");
        const data = await res.json();
        setHeadlines(data);
      } catch (err) {
        console.error("Error loading all headlines:", err);
      }
    };
    loadAllHeadlines();
  }, []);

  return (
    <div className={`min-h-screen px-4 py-8 font-inter transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'}` }>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 min-h-screen">
        {/* Main content */}
        <div className={`w-full md:w-[72%] flex flex-col p-8 rounded-3xl border shadow-xl transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-purple-800' : 'bg-white border-purple-100'}` }>
          <h2 className={`text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 mb-6 flex items-center gap-2 tracking-tight drop-shadow-lg ${darkMode ? 'drop-shadow-xl' : ''}` }>
            <i className="fas fa-newspaper text-purple-500"></i> All Recent Headlines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {headlines.length === 0 ? (
              <p className={`text-sm col-span-full ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No headlines found.</p>
            ) : (
              headlines.map((headline) => (
                <a
                  key={headline._id}
                  href={`/user/dashboard/headlineview?id=${headline._id}`}
                  className={`group rounded-2xl shadow-md border transition-all duration-200 flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-purple-800' : 'bg-white border-gray-100'}`}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={headline.image}
                      alt={headline.headline}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ animation: 'fadeIn 1s forwards' }}
                    />
                    <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">Recent</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className={`text-lg font-bold mb-1 group-hover:text-purple-700 transition-colors line-clamp-2 ${darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>{headline.headline}</h3>
                    <p className={`text-sm mb-2 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{headline.description}</p>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
        {/* Sidebar */}
        <div className={`w-full md:w-80 sticky top-0 h-screen p-6 rounded-3xl shadow-lg flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-purple-800' : 'bg-purple-50 border-purple-100'}` }>
          <div className="mb-4">
            <h2 className={`text-xl font-extrabold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 bg-clip-text text-transparent ${darkMode ? 'drop-shadow-lg' : ''}`}>Recent Headlines</h2>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Latest breaking news</p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll">
            <RecentHeadlines hideTitle={true} hideViewAll={true} />
          </div>
          {/* View All Headlines Button (fixed below the scroll area) */}
          <div className="mt-5">
            <a
              href="/user/dashboard/all-headlines"
              className={`group/btn flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden relative ${darkMode ? 'from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600' : 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
              <span className="relative z-10">View All Headlines</span>
              <svg 
                className="relative z-10 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRecentHeadlinesPage;
