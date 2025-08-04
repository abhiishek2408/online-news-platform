import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecentHeadlines from './TopRecentHeadlines';
import LatestNews from './TopLatestNews';

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
        const res = await fetch(`http://localhost:3003/api/latest-news/${newsId}`);
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
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row min-h-screen gap-6">
        {/* Main content */}
        <div className="w-full md:w-[70%] flex flex-col p-6 bg-white rounded-3xl border border-purple-200">
          <div className="bg-white rounded-2xl overflow-hidden p-8 mb-6 border border-gray-100">
            {!news && !error && <p className="text-center">Loading...</p>}

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
                    className="w-full max-h-[350px] object-cover rounded-md"
                  />
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8 font-roboto">
                  {news.description || "No description available."}
                </p>
              </>
            )}
          </div>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row rounded-3xl overflow-hidden border border-purple-200">
            <LatestNews />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 sticky top-0 h-screen overflow-y-auto p-6 bg-purple-50 border border-purple-200 rounded-3xl">
          <RecentHeadlines />
        </div>
      </div>
   </div>
  );
};

export default LatestNewsViewPage;
