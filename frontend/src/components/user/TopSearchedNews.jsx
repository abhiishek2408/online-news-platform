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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword.trim()) {
      fetchNewsByKeyword(keyword);
      setTimeout(() => {
        document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [triggerSearch,keyword]);


  useEffect(() => {
    fetchNewsByKeyword('Technology');
  }, []);


  
 

  return (
    <div className="w-full max-w-[1000px] bg-white mt-5 mx-auto py-10">
      <div className="w-full max-w-[1100px] mx-auto px-5">
        {/* Heading + Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <h2 className="text-lg font-bold text-purple-700 flex items-center">
            <i className="fas fa-fire text-purple-500 mr-2"></i> Top Searched News
          </h2>
        </div>

        {/* News Cards */}
        <div id="search-results" className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : articles.length > 0 ? (
            articles.map((article, idx) => (
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
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
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
          ) : (
            <p className="text-gray-500">No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSearchedNews;
