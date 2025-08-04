import React, { useEffect, useState } from 'react';

const apiBase = 'http://localhost:3003/api/news';

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
        setFeaturedNews(featured);
      } catch (err) {
        console.error('Error loading news:', err);
      }
    };
    loadNews();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4 w-full max-w-[1000px] bg-white p-3 mx-auto mt-5 rounded-xl shadow-sm items-start">
      <div className="p-4 bg-white border border-gray-200 rounded-md bg-gray-50 flex-1">
        <h2 className="text-lg font-bold text-purple-700 mb-2 flex items-center">
          <i className="fas fa-lightbulb text-purple-500 mr-2"></i> You Might Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {featuredNews.map((news) => (
            <div
              key={news._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 h-[300px] hover:shadow-md transition w-48 text-xs"
            >
              <img src={news.image} className="w-full h-28 object-cover rounded-md mb-2" alt="news" />
              <h2 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{news.title}</h2>
              <p className="text-[10px] text-gray-600 mb-2 line-clamp-3">{news.description}</p>
              <div className="flex justify-between text-gray-500 text-[10px] mb-2">
              <span><i className="fas fa-eye mr-1"></i>{news.views}</span>
                <span><i className="fas fa-heart mr-1"></i>{news.likes}</span>
              </div>
              <div className="flex gap-1">
                <button
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-1 rounded text-[10px]"
                  onClick={() => likeNews(news._id)}
                >
                    <span><i className="fas fa-heart mr-1"></i></span>Like 
                </button>
                <button
                  className="flex-1 text-purple-600 hover:underline text-[10px]"
                  onClick={() => showComments(news._id)}
                >
                  <i className="fas fa-comment-alt mr-1"></i>Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && modalContent && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-4 rounded shadow relative">
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
              <input name="name" required placeholder="Your name" className="border p-1 w-full rounded text-[10px]" />
              <textarea
                name="comment"
                required
                placeholder="Add a comment..."
                className="border p-1 w-full rounded text-[10px]"
              ></textarea>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-[10px]">Post</button>
            </form>
            <ul className="mt-2 space-y-1 text-[10px] text-gray-700">
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
