import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecentHeadlines from './TopRecentHeadlines';

const AllLatestNewsPage = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const loadAllLatestNewsCards = async () => {
      try {
        const res = await fetch("http://localhost:3003/api/latest-news");
        const data = await res.json();
        setNewsList(data);
      } catch (err) {
        console.error("Error loading all latest news cards:", err);
      }
    };

    loadAllLatestNewsCards();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 py-8 font-inter">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 min-h-screen">

        {/* Main content */}
        <div className="w-full md:w-[70%] flex flex-col p-6 bg-white rounded-3xl border border-purple-200">
          <div className="flex-1 overflow-y-auto custom-scroll bg-white rounded-2xl p-6 border border-gray-100">
            {newsList.length === 0 ? (
              <p className="text-gray-500 text-sm">No latest news found.</p>
            ) : (
              newsList.map((news) => (
                <div
                  key={news._id}
                  className="bg-white p-4 rounded-md shadow-sm border border-gray-200 flex items-start gap-4 mb-4"
                >
                  <Link
                    to={`/user/dashboard/latestnewsview?id=${news._id}`}
                    className="w-28 h-28 object-cover rounded-md flex-shrink-0"
                  >
                    <img
                      src={news.image}
                      alt="News Thumbnail"
                      className="w-full h-full rounded-md object-cover"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/user/dashboard/latestnewsview?id=${news._id}`}
                      className="block text-lg font-semibold text-gray-900"
                    >
                      {news.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-2">{news.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 sticky top-0 h-screen overflow-y-auto p-6 bg-purple-50 border border-purple-200 rounded-3xl">
         
            <div className="flex-1 overflow-y-auto custom-scroll">
              <RecentHeadlines />
            </div>
          </div>
     

      </div>
    </div>
  );
};

export default AllLatestNewsPage;
