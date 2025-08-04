import React, { useState, useEffect } from 'react';

const SpecialNews = () => {
  const API = 'http://localhost:3003/api/special-news';

  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    author: '',
    _id: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setNewsList(data);
  };

  const openModal = () => {
    setFormData({ title: '', description: '', content: '', category: '', author: '', _id: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData._id ? 'PUT' : 'POST';
    const url = formData._id ? `${API}/${formData._id}` : API;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    closeModal();
    loadData();
  };

  const editNews = (news) => {
    setFormData(news);
    setShowModal(true);
  };

  const deleteNews = async (id) => {
    if (window.confirm('Delete this news item?')) {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  return (
    <div className="bg-gray-100 p-6 text-sm font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Special News</h1>
        <button onClick={openModal} className="bg-purple-600 text-white px-4 py-2 rounded">Add News</button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Published</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {newsList.map((item) => (
              <tr key={item._id}>
                <td className="p-3 border">{item.title}</td>
                <td className="p-3 border">{item.category}</td>
                <td className="p-3 border">{item.author}</td>
                <td className="p-3 border">{new Date(item.publishedAt).toLocaleDateString()}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => editNews(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNews(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-lg"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {formData._id ? 'Edit News' : 'Add News'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full border p-2 rounded"
              />
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full border p-2 rounded"
              ></textarea>
              <textarea
                id="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Content"
                required
                className="w-full border p-2 rounded"
              ></textarea>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                id="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialNews;
