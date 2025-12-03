import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';

const apiBase = 'https://online-news-platform-backend.onrender.com/api/news';

const hasViewed = (newsId) => {
  const viewed = JSON.parse(sessionStorage.getItem('viewedNews') || '[]');
  return viewed.includes(newsId);
};

const markAsViewed = (newsId) => {
  const viewed = JSON.parse(sessionStorage.getItem('viewedNews') || '[]');
  viewed.push(newsId);
  sessionStorage.setItem('viewedNews', JSON.stringify(viewed));
};

const incrementViewCount = async (newsId) => {
  if (hasViewed(newsId)) return;
  await fetch(`${apiBase}/${newsId}/view`, { method: 'PATCH' });
  markAsViewed(newsId);
};

const NewsSection = () => {
  const { darkMode } = useContext(ThemeContext);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const likeNews = async (id) => {
    const likedNews = JSON.parse(sessionStorage.getItem('likedNews') || '[]');
    if (likedNews.includes(id)) {
      alert("You’ve already liked this news item in this session.");
      return;
    }
    const res = await fetch(`${apiBase}/${id}/like`, { method: 'PATCH' });
    const data = await res.json();
    setFeaturedNews((prev) =>
      prev.map((n) => (n._id === id ? { ...n, likes: data.likes } : n))
    );
    likedNews.push(id);
    sessionStorage.setItem('likedNews', JSON.stringify(likedNews));
  };

  const showComments = async (id) => {
    const res = await fetch(`${apiBase}/${id}/comments`);
    const comments = await res.json();
    setModalContent({ id, comments });
    setShowModal(true);
  };

  const submitComment = async (e, id) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const comment = e.target.comment.value.trim();
    if (!name || !comment) return;

    await fetch(`${apiBase}/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, comment })
    });
    e.target.reset();
    showComments(id);
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch(apiBase);
        const newsList = await res.json();
        const featured = newsList.filter((news) => news.isFeatured);
        for (let news of featured) await incrementViewCount(news._id);
        setTimeout(() => {
          setFeaturedNews(featured);
          setLoading(false);
        }, 4000); // Simulate 4s loading
      } catch (err) {
        console.error('Error loading news:', err);
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  return (
    <div className={`flex flex-col gap-4 w-full max-w-[1200px] px-3 sm:px-4 md:px-6 py-8 mx-auto mt-8 rounded-3xl items-start min-h-[80vh] shadow-xl transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-gray-900'}`}>
      {loading ? (
        <div className={`p-6 border rounded-2xl flex-1 space-y-6 w-full animate-pulse ${darkMode ? 'bg-gray-900 border-purple-800' : 'bg-white/70 border-gray-200'}`}> 
          <div className={`h-6 w-1/3 bg-gradient-to-r rounded ${darkMode ? 'from-purple-900 to-pink-900' : 'from-purple-200 to-pink-200'}`}></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className={`h-[320px] rounded-xl p-2 ${darkMode ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900' : 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100'}`}></div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`p-6 w-full shadow-lg rounded-2xl border ${darkMode ? 'bg-gray-900 border-purple-800' : 'bg-white/80 border-purple-100'}`}> 
          <h2 className={`text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 mb-4 flex items-center gap-2 tracking-tight drop-shadow-lg ${darkMode ? 'drop-shadow-xl' : ''}`}> 
            <i className="fas fa-magic text-purple-500 animate-pulse"></i> You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {featuredNews.map((news) => (
              <div
                key={news._id}
                className={`border rounded-2xl shadow-md p-4 flex flex-col h-full group transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] relative overflow-hidden ${darkMode ? 'bg-gray-900 border-purple-800' : 'bg-white/90 border-purple-100'}`}
              >
                <div className="absolute top-3 right-3 z-10">
                  {news.isFeatured && (
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">FEATURED</span>
                  )}
                </div>
                <img
                  src={news.image}
                  className={`w-full h-32 object-cover rounded-xl mb-3 shadow-sm transition-opacity duration-700 ${darkMode ? 'bg-gray-900' : ''}`}
                  alt="news"
                  style={{ animation: 'fadeIn 1s forwards' }}
                />
                <h2 className={`text-base font-bold mb-1 line-clamp-2 group-hover:text-purple-700 transition-colors ${darkMode ? 'text-white drop-shadow-lg' : 'text-gray-800'}`}>{news.title}</h2>
                <p className={`text-xs mb-2 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{news.description}</p>
                <div className={`flex justify-between text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}> 
                  <span><i className="fas fa-eye mr-1"></i>{news.views}</span>
                  <span className="flex items-center gap-1">
                    <i className={`fas fa-heart ${news.likes > 0 ? 'text-pink-500 animate-bounce' : darkMode ? 'text-gray-600' : 'text-gray-400'}`}></i>
                    {news.likes}
                  </span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold shadow transition-all duration-200 group-hover:scale-105 flex items-center justify-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white ${darkMode ? 'border border-purple-800' : ''}`}
                    onClick={() => likeNews(news._id)}
                  >
                    <i className="fas fa-heart"></i> Like
                  </button>
                  <button
                    className={`flex-1 text-xs font-semibold group-hover:text-pink-600 transition-colors ${darkMode ? 'text-purple-300 hover:underline' : 'text-purple-600 hover:underline'}`}
                    onClick={() => showComments(news._id)}
                  >
                    <i className="fas fa-comment-alt mr-1"></i>Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 💬 Comment Modal */}
      {showModal && modalContent && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 px-4 ${darkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-40'}`}> 
          <div className={`w-[90%] sm:w-[80%] md:max-w-sm p-6 rounded-2xl shadow-2xl relative border ${darkMode ? 'bg-gray-900 border-purple-800' : 'bg-gradient-to-br from-white via-purple-50 to-pink-50 border-purple-100'}`}> 
            <button
              onClick={() => setShowModal(false)}
              className={`absolute top-2 right-3 text-2xl transition-colors ${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-500 hover:text-pink-500'}`}
            >
              &times;
            </button>
            <form
              onSubmit={(e) => submitComment(e, modalContent.id)}
              className="space-y-2 mt-2"
            >
              <input name="name" required placeholder="Your name" className={`border p-2 w-full rounded text-xs focus:ring-2 ${darkMode ? 'bg-gray-900 border-purple-800 text-white focus:ring-purple-800' : 'border-purple-200 focus:ring-purple-200'}`} />
              <textarea
                name="comment"
                required
                placeholder="Add a comment..."
                className={`border p-2 w-full rounded text-xs focus:ring-2 ${darkMode ? 'bg-gray-900 border-pink-800 text-white focus:ring-pink-800' : 'border-purple-200 focus:ring-pink-200'}`}
              ></textarea>
              <button className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-1.5 rounded text-xs font-semibold shadow ${darkMode ? 'border border-purple-800' : ''}`}>Post</button>
            </form>
            <ul className={`mt-3 space-y-1 text-xs max-h-40 overflow-y-auto pr-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {modalContent.comments.map((c, i) => (
                <li key={i} className={`rounded px-2 py-1 ${darkMode ? 'bg-purple-900/60' : 'bg-purple-50'}`}><strong>{c.name}:</strong> {c.comment}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
