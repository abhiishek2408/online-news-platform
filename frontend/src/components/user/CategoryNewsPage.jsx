import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const NewsPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("state") || searchParams.get("category");

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!keyword) return;

    document.title = `${keyword} News`;

    fetch(`http://localhost:3003/api/newsapi/api-news-search?q=${keyword}`)
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
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-screen">
      
      {/* Main content */}
      <main className="lg:col-span-3 bg-white p-6 rounded-2xl border border-purple-200 shadow">
        <h1 className="text-2xl font-bold text-purple-600 mb-6">{keyword} News</h1>

        {loading ? (
          <p className="text-purple-500">Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-500">No news found for "{keyword}".</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {articles.map((article, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt="news"
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                )}
                <h2 className="font-semibold text-sm text-purple-700 leading-snug line-clamp-2 mb-1">{article.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3 flex-grow">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-center bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-1.5 rounded-md"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Sidebar */}
      <aside className="lg:col-span-1 bg-white p-5 border border-purple-200 rounded-2xl shadow sticky top-10 h-fit">
        <h2 className="text-lg font-bold text-purple-700 mb-4">📰 Top Headlines</h2>
        <ul className="text-sm space-y-2 list-disc list-inside text-gray-700">
          {articles.slice(0, 15).map((article, idx) => (
            <li key={idx} className="leading-tight">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition-colors"
              >
                {article.title.length > 80
                  ? article.title.slice(0, 80) + "..."
                  : article.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default NewsPage;
