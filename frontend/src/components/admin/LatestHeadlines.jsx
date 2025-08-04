import React, { useEffect, useState } from 'react';

const LatestHeadlines = () => {
  const API = 'http://localhost:3003/api/latest-headlines';
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: '', headline: '', description: '', content: '',
    image: '', link: '', author: '', category: '', tags: '',
    country: '', state: '', publishedAt: '', headlineId: ''
  });
  const [modalOpen, setModalOpen] = useState(false);

  const loadData = async () => {
    const res = await fetch(API);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openModal = () => {
    setFormData({
      title: '', headline: '', description: '', content: '',
      image: '', link: '', author: '', category: '', tags: '',
      country: '', state: '', publishedAt: '', headlineId: ''
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const editItem = (item) => {
    setFormData({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
      headlineId: item._id
    });
    setModalOpen(true);
  };

  const deleteItem = async (id) => {
    if (window.confirm('Are you sure to delete this item?')) {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData.headlineId ? 'PUT' : 'POST';
    const url = formData.headlineId ? `${API}/${formData.headlineId}` : API;

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    delete payload.headlineId;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    closeModal();
    loadData();
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-gray-100 p-6 text-sm min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Latest Headlines</h1>
        <button onClick={openModal} className="bg-purple-600 text-white px-4 py-2 rounded">Add New</button>
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
            {data.map((h, i) => (
              <tr key={i}>
                <td className="p-3 border">{h.title}</td>
                <td className="p-3 border">{h.author || '-'}</td>
                <td className="p-3 border">{h.category || '-'}</td>
                <td className="p-3 border">{h.country}</td>
                <td className="p-3 border text-center space-x-2">
                  <button onClick={() => editItem(h)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => deleteItem(h._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-xl relative">
            <button onClick={closeModal} className="absolute top-2 right-3 text-lg">&times;</button>
            <h2 className="text-xl font-semibold mb-4">{formData.headlineId ? 'Edit' : 'Add'} Headline</h2>
            <form onSubmit={handleSubmit} className="space-y-2 text-sm">
              <div className="flex gap-2">
                <input id="title" value={formData.title} onChange={handleChange} type="text" placeholder="Title" required className="w-1/2 border px-2 py-1 rounded" />
                <input id="headline" value={formData.headline} onChange={handleChange} type="text" placeholder="Headline" className="w-1/2 border px-2 py-1 rounded" />
              </div>
              <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border px-2 py-1 rounded text-sm"></textarea>
              <textarea id="content" value={formData.content} onChange={handleChange} placeholder="Content" className="w-full border px-2 py-1 rounded text-sm"></textarea>
              <div className="flex gap-2">
                <input id="image" value={formData.image} onChange={handleChange} type="text" placeholder="Image URL" className="w-1/2 border px-2 py-1 rounded" />
                <input id="link" value={formData.link} onChange={handleChange} type="text" placeholder="Link" className="w-1/2 border px-2 py-1 rounded" />
              </div>
              <div className="flex gap-2">
                <input id="author" value={formData.author} onChange={handleChange} type="text" placeholder="Author" className="w-1/2 border px-2 py-1 rounded" />
                <input id="category" value={formData.category} onChange={handleChange} type="text" placeholder="Category" className="w-1/2 border px-2 py-1 rounded" />
              </div>
              <input id="tags" value={formData.tags} onChange={handleChange} type="text" placeholder="Tags (comma separated)" className="w-full border px-2 py-1 rounded" />
              <div className="flex gap-2">
                <input id="country" value={formData.country} onChange={handleChange} type="text" placeholder="Country" required className="w-1/2 border px-2 py-1 rounded" />
                <input id="state" value={formData.state} onChange={handleChange} type="text" placeholder="State" className="w-1/2 border px-2 py-1 rounded" />
              </div>
              <input id="publishedAt" value={formData.publishedAt} onChange={handleChange} type="date" className="w-full border px-2 py-1 rounded" required />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                <button type="submit" className="bg-purple-600 text-white px-3 py-1 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestHeadlines;
