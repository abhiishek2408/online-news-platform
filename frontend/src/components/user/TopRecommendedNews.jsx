import React, { useEffect, useState } from 'react';

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
    <div className={`flex flex-col gap-4 w-full max-w-[1200px] px-3 sm:px-4 md:px-6 py-4 mx-auto mt-5 rounded-xl items-start ${loading ? 'animate-pulse bg-gray-100' : 'bg-white'}`}>
      {loading ? (
        <div className="p-4 bg-gray-100 border border-gray-200 rounded-md flex-1 space-y-4 w-full">
          <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-[300px] bg-gray-200 rounded-lg p-2"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-white border border-gray-200 rounded-md bg-gray-50 w-full">
          <h2 className="text-lg font-bold text-gray-700 mb-2 flex items-center">
            <i className="fas fa-lightbulb text-purple-500 mr-2"></i> You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {featuredNews.map((news) => (
              <div
                key={news._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 hover:shadow-md transition text-[13px] flex flex-col h-full"
              >
                <img src={news.image} className="w-full h-28 object-cover rounded-md mb-2" alt="news" />
                <h2 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{news.title}</h2>
                <p className="text-xs text-gray-600 mb-2 line-clamp-3">{news.description}</p>
                <div className="flex justify-between text-gray-500 text-xs mb-2">
                  <span><i className="fas fa-eye mr-1"></i>{news.views}</span>
                  <span><i className="fas fa-heart mr-1"></i>{news.likes}</span>
                </div>
                <div className="flex gap-1 mt-auto">
                  <button
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-1 rounded text-xs"
                    onClick={() => likeNews(news._id)}
                  >
                    <i className="fas fa-heart mr-1"></i>Like
                  </button>
                  <button
                    className="flex-1 text-purple-600 hover:underline text-xs"
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
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-[90%] sm:w-[80%] md:max-w-sm p-4 rounded shadow relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              &times;
            </button>
            <form
              onSubmit={(e) => submitComment(e, modalContent.id)}
              className="space-y-1 mt-1"
            >
              <input name="name" required placeholder="Your name" className="border p-1 w-full rounded text-xs" />
              <textarea
                name="comment"
                required
                placeholder="Add a comment..."
                className="border p-1 w-full rounded text-xs"
              ></textarea>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs">Post</button>
            </form>
            <ul className="mt-2 space-y-1 text-xs text-gray-700 max-h-40 overflow-y-auto pr-1">
              {modalContent.comments.map((c, i) => (
                <li key={i}>
                  <strong>{c.name}:</strong> {c.comment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
