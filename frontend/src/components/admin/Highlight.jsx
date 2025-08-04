import React, { useEffect, useState } from 'react';

const Highlight = () => {
  const API_URL = 'https://online-news-platform-backend.onrender.com/api/managehighlights';
  const [highlights, setHighlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    highlight: '',
    description: '',
    content: '',
    image: '',
    link: '',
    author: '',
    category: '',
    tags: '',
    publishedAt: '',
    country: '',
    state: '',
    _id: ''
  });

  useEffect(() => {
    loadHighlights();
  }, []);

  const loadHighlights = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setHighlights(data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData._id ? 'PUT' : 'POST';
    const url = formData._id ? `${API_URL}/${formData._id}` : API_URL;

    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData)
    });

    setShowModal(false);
    setFormData({
      title: '', highlight: '', description: '', content: '', image: '',
      link: '', author: '', category: '', tags: '', publishedAt: '',
      country: '', state: '', _id: ''
    });
    loadHighlights();
  };

  const editHighlight = (h) => {
    setFormData({
      ...h,
      tags: Array.isArray(h.tags) ? h.tags.join(', ') : h.tags,
      _id: h._id
    });
    setShowModal(true);
  };

  const deleteHighlight = async (id) => {
    if (window.confirm('Are you sure to delete this highlight?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      loadHighlights();
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6 text-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Highlights</h1>
        <button onClick={() => setShowModal(true)} className="bg-purple-600 text-white px-4 py-2 rounded">
          Add New Highlight
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Country</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {highlights.map(h => (
              <tr key={h._id}>
                <td className="p-3 border">{h.title}</td>
                <td className="p-3 border">{h.author || '-'}</td>
                <td className="p-3 border">{h.category || '-'}</td>
                <td className="p-3 border">{h.country}</td>
                <td className="p-3 border text-center space-x-2">
                  <button onClick={() => editHighlight(h)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => deleteHighlight(h._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-3 text-lg">&times;</button>
            <h2 className="text-xl font-semibold mb-4">{formData._id ? 'Edit Highlight' : 'Add Highlight'}</h2>
            <form onSubmit={handleSubmit} className="space-y-2 text-sm">
              <div className="flex gap-2">
                <input id="title" value={formData.title} onChange={handleChange} required placeholder="Title" className="w-1/2 border px-2 py-1 rounded" />
                <input id="highlight" value={formData.highlight} onChange={handleChange} placeholder="Highlight" className="w-1/2 border px-2 py-1 rounded" />
              </div>
              <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border px-2 py-1 rounded text-sm"></textarea>
              <textarea id="content" value={formData.content} onChange={handleChange} required placeholder="Content" className="w-full border px-2 py-1 rounded text-sm"></textarea>
              <div className="flex gap-2">
                <input id="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-1/2 border px-2 py-1 rounded" />
                <input id="link" value={formData.link} onChange={handleChange} placeholder="Link" className="w-1/2 border px-2 py-1 rounded" />
              </div>
              <div className="flex gap-2">
                <input id="author" value={formData.author} onChange={handleChange} placeholder="Author" className="w-1/2 border px-2 py-1 rounded" />
                <input id="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-1/2 border px-2 py-1 rounded" />
              </div>
              <input id="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full border px-2 py-1 rounded" />
              <div className="flex gap-2">
                <input id="country" value={formData.country} onChange={handleChange} required placeholder="Country" className="w-1/2 border px-2 py-1 rounded" />
                <input id="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-1/2 border px-2 py-1 rounded" />
              </div>
              <input type="date" id="publishedAt" value={formData.publishedAt} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Cancel</button>
                <button type="submit" className="bg-purple-600 text-white px-3 py-1 rounded text-sm">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlight;
