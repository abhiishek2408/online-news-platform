import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./Context/ThemeContext";
import { useSearchParams } from "react-router-dom";

const NewsPage = () => {
  const [searchParams] = useSearchParams();
  const { darkMode } = useContext(ThemeContext);
  const keyword = searchParams.get("state") || searchParams.get("category");

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) return;

    document.title = `${keyword} News`;

    fetch(`https://online-news-platform-backend.onrender.com/api/newsapi/api-news-search?q=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load news:", err);
        setLoading(false);
      });
  }, [keyword]);

  if (!keyword) {
    return <p className="text-center text-red-500 py-6">Please provide a <code>state</code> or <code>category</code> in the URL.</p>;
  }

  return (
    <div className={`min-h-screen py-10 px-2 sm:px-6 flex justify-center items-start transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-white via-purple-50 to-pink-100'}` }>
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <main className={`lg:col-span-3 backdrop-blur-xl p-8 rounded-3xl border ring-1 shadow-none transition-colors duration-300 ${darkMode ? 'bg-gray-900/80 border-purple-800/60 ring-pink-900/40' : 'bg-white/80 border-purple-200/60 ring-pink-100/40'}` }>
          <h1 className={`text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400 bg-clip-text text-transparent mb-8 text-center sm:text-left tracking-tight ${darkMode ? 'drop-shadow-lg' : ''}` }>
            {keyword} News
          </h1>

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <span className={`animate-spin rounded-full h-10 w-10 border-t-4 border-solid ${darkMode ? 'border-purple-700' : 'border-purple-400'}`}></span>
              <span className={`ml-4 text-lg font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-500'}`}>Loading...</span>
            </div>
          ) : articles.length === 0 ? (
            <p className={`text-center text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No news found for "{keyword}".</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {articles.map((article, idx) => (
                <div
                  key={idx}
                  className={`group bg-gradient-to-br border rounded-2xl p-5 flex flex-col shadow-none hover:scale-[1.03] hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden ${darkMode ? 'from-gray-900 via-purple-900 to-pink-900 border-purple-800/60' : 'from-white via-purple-50 to-pink-50 border-purple-100/60'}`}
                >
                  {/* Card Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-200/30 via-pink-200/20 to-yellow-100/10 blur-2xl opacity-60 group-hover:opacity-90 transition-all duration-300 z-0"></div>
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt="news"
                      className="w-full h-40 object-cover rounded-xl mb-4 border border-purple-100/40 z-10 relative"
                    />
                  )}
                  <h2 className={`font-bold text-base leading-snug line-clamp-2 mb-2 z-10 relative ${darkMode ? 'text-purple-200 drop-shadow-lg' : 'text-purple-800'}` }>
                    {article.title}
                  </h2>
                  <p className={`text-sm line-clamp-3 flex-grow z-10 relative ${darkMode ? 'text-gray-300' : 'text-gray-700'}` }>
                    {article.description}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 inline-block text-center bg-gradient-to-r text-white text-sm font-bold px-5 py-2 rounded-full shadow-md z-10 relative transition-all duration-200 ${darkMode ? 'from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600' : 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
                  >
                    Read More
                  </a>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1 sticky top-4 transition-all duration-300 h-fit">
          <div className={`rounded-3xl m-0 p-0 overflow-hidden border-0 shadow-xl backdrop-blur-xl transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900/90 via-purple-900/80 to-pink-900/80' : 'bg-gradient-to-br from-white/90 via-purple-50/80 to-pink-100/80'}` }>
            <div className={`p-6 flex flex-col items-center justify-center border-b bg-white/60 dark:bg-gray-900/60 transition-colors duration-300 ${darkMode ? 'border-gray-800 bg-gray-900/60' : 'border-gray-100 bg-white/60'}` }>
              {/* Icon removed as per request */}
              <h2 className={`text-xl font-extrabold bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400 bg-clip-text text-transparent mb-0 text-center tracking-wide drop-shadow-sm ${darkMode ? 'drop-shadow-lg' : ''}` }>
                Top Headlines
              </h2>
            </div>
            <ul className={`text-sm space-y-3 list-none px-6 py-5 max-h-[600px] overflow-y-auto custom-scroll transition-colors duration-300 ${darkMode ? 'text-gray-200 bg-gray-900/80' : 'text-gray-700 bg-white/80'}` }>
              {articles.slice(0, 15).map((article, idx) => (
                <li key={idx} className="leading-tight group">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-start gap-2 font-medium transition-all duration-200 rounded-lg px-2 py-1 hover:shadow-md ${darkMode ? 'hover:bg-gradient-to-r hover:from-purple-900/40 hover:to-pink-900/40' : 'hover:bg-gradient-to-r hover:from-purple-100/70 hover:to-pink-100/70'}`}
                  >
                    <span className={`inline-block w-6 h-6 flex-shrink-0 rounded-full text-xs font-bold flex items-center justify-center group-hover:bg-purple-200 group-hover:text-purple-800 transition-all duration-200 shadow-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}` }>
                      {idx + 1}
                    </span>
                    <span className="line-clamp-2">
                      {article.title.length > 60
                        ? article.title.slice(0, 60) + "..."
                        : article.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsPage;
