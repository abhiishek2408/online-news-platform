import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatestNewsCards = async () => {
      try {
        const res = await fetch("http://localhost:3003/api/latest-news");
        const data = await res.json();
        setNewsList(data.slice(0, 4));
      } catch (err) {
        console.error("Error loading latest news cards:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLatestNewsCards();
  }, []);

  return (
    <div className="w-[681px] ml-0 mt-3 p-4 bg-white border border-gray-200 rounded-md bg-gray-50 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-purple-600 mb-2 ml-3 flex items-center"><i className="fas fa-newspaper text-purple-500 mr-2"></i> Latest News</h2>
      <div className="p-1 min-h-[200px] flex flex-col gap-3">
        {loading ? (<p className="text-sm text-gray-500">Loading latest news...</p>) : 
        newsList.length === 0 ? (<p className="text-sm text-gray-500">No news available.</p>) : (newsList.map((news) => (<div key={news._id} className="bg-white p-3 rounded-md shadow-sm border border-gray-200 flex items-start gap-3">
          <Link to={`/user/dashboard/latestnewsview?id=${news._id}`} className="w-24 h-24 object-cover rounded-md flex-shrink-0">
          <img src={news.image} alt="News Thumbnail" className="w-full h-full rounded-md object-cover" />
          </Link>
    <div>
    <Link to={`/user/dashboard/latestnewsview?id=${news._id}`} className="block text-base font-semibold text-gray-900">{news.title}</Link>
    <p className="text-sm text-gray-600 mt-1">{news.description}</p>
    </div>
    </div>
  )))}
    </div>
    <div className="mt-1 text-right"><Link to="alllatestnews" className="text-purple-600 hover:underline text-sm font-semibold transition duration-300 ease-in-out">See more Latest News &rarr;</Link>
    </div>
    </div>
  );
};

export default LatestNews;
