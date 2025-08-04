import React, { useEffect, useState } from 'react';
import RecentHeadlines from './TopRecentHeadlines';

const AllHighlightsPage = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const loadAllHighlights = async () => {
      try {
        const res = await fetch("https://online-news-platform-backend.onrender.com/api/all-highlights");
        const data = await res.json();
        setHighlights(data);
      } catch (err) {
        console.error("Error loading all highlights:", err);
      }
    };

    loadAllHighlights();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 py-8 font-inter">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 min-h-screen">

        {/* Main content */}
        <div className="w-full md:w-[70%] flex flex-col p-6 bg-white rounded-3xl border border-purple-200">
          <h2 className="text-lg font-bold text-red-700 mb-4">📰 All Highlight News</h2>
          <div className="flex-1 overflow-y-auto custom-scroll bg-white rounded-2xl p-6 border border-gray-100">
            {highlights.length === 0 ? (
              <p className="text-gray-500 text-sm">No highlights found.</p>
            ) : (
              highlights.map((highlight) => (
                <div
                  key={highlight._id}
                  className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4"
                >
                  <a
                    href={`/user/highlight-page.html?id=${highlight._id}`}
                    className="text-xl font-semibold text-gray-900 block mb-2"
                  >
                    {highlight.title}
                  </a>
                  <div className="h-52 overflow-hidden rounded-lg mb-3">
                    <a href={`/user/highlight-page.html?id=${highlight._id}`}>
                      <img
                        src={highlight.image}
                        alt={highlight.title}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                  <p className="text-gray-700 text-sm">{highlight.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fixed Sidebar */}
        <div className="w-full md:w-80 h-280 sticky top-0 h-screen overflow-y-auto p-6 bg-purple-50 border border-purple-200 rounded-3xl">
          
            <div className="flex-1 overflow-y-auto custom-scroll">
              <RecentHeadlines />
            </div>
      
        </div>

      </div>
    </div>
  );
};

export default AllHighlightsPage;
