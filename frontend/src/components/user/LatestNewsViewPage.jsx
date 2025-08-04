import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecentHeadlines from './TopRecentHeadlines';

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
    <div className="h-64 bg-gray-300 rounded"></div>
    <div className="space-y-3">
      <div className="h-5 bg-gray-300 rounded w-full"></div>
      <div className="h-5 bg-gray-300 rounded w-11/12"></div>
      <div className="h-5 bg-gray-300 rounded w-10/12"></div>
    </div>
  </div>
);

const LatestNewsViewPage = () => {
  const [searchParams] = useSearchParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState('');
  const newsId = searchParams.get("id");

  useEffect(() => {
    const fetchLatestNewsDetails = async () => {
      if (!newsId) {
        setError('Invalid News ID');
        return;
      }

      try {
        const res = await fetch(`https://online-news-platform-backend.onrender.com/api/latest-news/${newsId}`);
        if (!res.ok) throw new Error('Failed to fetch news');

        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
        setError('Failed to Load News');
      }
    };

    fetchLatestNewsDetails();
  }, [newsId]);

  return (
    <div className="px-4 bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 rounded-3xl overflow-hidden border border-purple-200 bg-white dark:bg-gray-800">

        {/* Main content */}
        <div className="flex-grow basis-[75%] p-6">
          <div className="rounded-2xl overflow-hidden mb-6 border border-gray-200 p-6 bg-white dark:bg-gray-900">
            {!news && !error && <SkeletonLoader />}

            {error && (
              <div className="text-center text-red-600">
                <p className="text-2xl font-semibold">{error}</p>
                <a
                  href="/"
                  className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                >
                  Return Home
                </a>
              </div>
            )}

            {news && (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 leading-tight font-serif">
                  {news.title || "Untitled"}
                </h1>
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={news.image || '/placeholder.jpg'}
                    alt={news.title || "Image"}
                    className="w-full max-h-[400px] object-cover rounded-md"
                  />
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-200 mb-8 font-roboto">
                  {news.description || "No description available."}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex-shrink-0 basis-[25%] p-4 bg-purple-50 dark:bg-gray-800 border-l border-purple-200">
          <RecentHeadlines />
        </div>

      </div>
    </div>
  );
};

export default LatestNewsViewPage;
