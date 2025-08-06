import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LatestNews from './TopLatestNews';
import RecentHeadlines from './TopRecentHeadlines';

const HighlightViewPage = () => {
  const [searchParams] = useSearchParams();
  const [highlight, setHighlight] = useState(null);
  const [latestNews, setLatestNews] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const id = searchParams.get("id");
  const type = searchParams.get("type"); // 'highlight' or 'latest-news'

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('Invalid ID');
        setLoading(false);
        return;
      }

      try {
        let res, data;
        if (type === 'latest-news') {
          res = await fetch(`https://online-news-platform-backend.onrender.com/api/latest-news/${id}`);
        } else {
          res = await fetch(`https://online-news-platform-backend.onrender.com/api/highlight/${id}`);
        }

        if (!res.ok) throw new Error('Failed to fetch data');
        data = await res.json();

        if (type === 'latest-news') {
          setLatestNews(data);
        } else {
          setHighlight(data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 sm:px-6 md:px-14 py-6 md:py-8">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-6 min-h-screen md:min-h-[80vh]">

        {/* Main Content */}
        <div className="w-full md:w-[84%] flex flex-col p-4 sm:p-6 bg-white rounded-3xl border border-purple-200 overflow-auto">
          <div className="bg-white rounded-2xl overflow-hidden p-6 sm:p-8 mb-6 border border-gray-100">
            {loading && <p className="text-center">Loading...</p>}

            {error && (
              <div className="text-center text-red-600">
                <p className="text-2xl font-semibold">{error}</p>
                <a
                  href="/"
                  className="mt-6 inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
                >
                  Return Home
                </a>
              </div>
            )}

            {highlight && (
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 leading-tight font-serif">
                  {highlight.title}
                </h1>
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={highlight.image || '/placeholder.jpg'}
                    alt={highlight.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 mb-8 font-roboto">
                  {highlight.description}
                </p>
              </>
            )}

            {latestNews && (
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 leading-tight font-serif">
                  {latestNews.title}
                </h1>
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={latestNews.image || '/placeholder.jpg'}
                    alt={latestNews.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 mb-8 font-roboto">
                  {latestNews.description}
                </p>
              </>
            )}
          </div>

          <div className="flex-1 overflow-y-auto bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
            <LatestNews />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 md:sticky md:top-0 md:h-screen p-4 sm:p-6 bg-purple-50 border border-purple-200 rounded-3xl">
          <RecentHeadlines />
        </div>
      </div>
    </div>
  );
};

export default HighlightViewPage;

