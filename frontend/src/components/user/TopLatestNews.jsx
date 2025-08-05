import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatestNewsCards = async () => {
      try {
        const res = await fetch("https://online-news-platform-backend.onrender.com/api/latest-news");
        const data = await res.json();
        setTimeout(() => {
          setNewsList(data.slice(0, 4));
          setLoading(false);
        }, 4000);
      } catch (err) {
        console.error("Error loading latest news cards:", err);
        setLoading(false);
      }
    };

    loadLatestNewsCards();
  }, []);

  return (
    <div className="w-full max-w-[1000px] mx-auto mt-3 px-2 sm:px-4 md:px-6 py-4 bg-white border border-gray-200 rounded-md bg-gray-50 flex flex-col gap-4">
      
      {/* Heading with skeleton */}
      {loading ? (
        <div className="h-7 bg-gray-300 rounded w-44 ml-2 sm:ml-3 animate-pulse"></div>
      ) : (
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 ml-2 sm:ml-3 flex items-center">
          <i className="fas fa-newspaper text-purple-500 mr-2"></i>
          Latest News
        </h2>
      )}

      {/* News Cards or Skeletons */}
      <div className="min-h-[200px] flex flex-col gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-3 rounded-md border border-gray-200 flex flex-col sm:flex-row items-start gap-4 animate-pulse">
              <div className="w-full sm:w-24 h-48 sm:h-24 bg-gray-300 rounded-md"></div>
              <div className="flex-1 space-y-2 w-full">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))
        ) : newsList.length === 0 ? (
          <p className="text-base text-gray-500">No news available.</p>
        ) : (
          newsList.map((news) => (
            <div
              key={news._id}
              className="bg-white p-3 rounded-md border border-gray-200 flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                to={`/user/dashboard/latestnewsview?id=${news._id}`}
                className="w-full sm:w-24 h-48 sm:h-24 rounded-md overflow-hidden flex-shrink-0"
              >
                <img
                  src={news.image}
                  alt="News Thumbnail"
                  className="w-full h-full object-cover rounded-md"
                />
              </Link>
              <div className="flex-1">
                <Link
                  to={`/user/dashboard/latestnewsview?id=${news._id}`}
                  className="block text-lg font-semibold text-gray-900 hover:text-purple-600"
                >
                  {news.title}
                </Link>
                <p className="text-base text-gray-700 mt-1">{news.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* "See more" link with skeleton */}
      <div className="mt-1 text-right">
        {loading ? (
          <div className="h-5 bg-gray-300 rounded w-40 inline-block animate-pulse"></div>
        ) : (
          <Link
            to="alllatestnews"
            className="text-purple-600 hover:underline text-base font-medium transition duration-300 ease-in-out"
          >
            See more Latest News &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};

export default LatestNews;
