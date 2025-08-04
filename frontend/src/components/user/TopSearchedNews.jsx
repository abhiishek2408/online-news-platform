import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

const TopSearchedNews = () => {
  const { keyword, triggerSearch } = useContext(SearchContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNewsByKeyword = async (searchTerm) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3003/api/newsapi/api-news-search?q=${searchTerm}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setTimeout(() => setLoading(false), 4000); // simulate delay for skeleton visibility
    }
  };

  useEffect(() => {
    if (keyword.trim()) {
      fetchNewsByKeyword(keyword);
      setTimeout(() => {
        document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [triggerSearch, keyword]);

  useEffect(() => {
    fetchNewsByKeyword('Technology');
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-5 px-4">
      <div className={`bg-white p-4 rounded-lg border ${loading ? 'animate-pulse' : ''}`}>
        {/* Heading */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <h2 className="text-lg font-bold text-grey-700 flex items-center">
            <i className="fas fa-fire text-purple-500 mr-2"></i> Top Searched News
          </h2>
        </div>

        {/* News Cards or Skeletons */}
        <div id="search-results" className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {loading
            ? Array(4).fill().map((_, idx) => (
                <div key={idx} className="border rounded-xl p-3 bg-gray-100">
                  <div className="w-full h-40 bg-gray-300 rounded-md mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-full mt-auto"></div>
                </div>
              ))
            : articles.length > 0
            ? articles.map((article, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 flex flex-col"
                >
                  <img
                    src={article.urlToImage || 'https://placehold.co/300x160?text=News'}
                    alt="news"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h3 className="font-semibold text-base text-gray-800 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {article.description}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md text-center transition-all duration-200 mt-auto"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))
            : (
              <p className="text-gray-500 col-span-full text-center">
                No articles found.
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default TopSearchedNews;
