import React, { useEffect, useState } from "react";

const Headline = () => {
  const [headlines, setHeadlines] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    headline: "",
    description: "",
    content: "",
    image: "",
    link: "",
    author: "",
    category: "",
    tags: "",
    country: "",
    state: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const API_URL = "https://online-news-platform-backend.onrender.com/api/headlines";

  const fetchHeadlines = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setHeadlines(data);
  };

  useEffect(() => {
    fetchHeadlines();
  }, []);

  const openModal = () => {
    setModalOpen(true);
    setFormData({
      title: "",
      headline: "",
      description: "",
      content: "",
      image: "",
      link: "",
      author: "",
      category: "",
      tags: "",
      country: "",
      state: "",
    });
    setEditingId(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      title: "",
      headline: "",
      description: "",
      content: "",
      image: "",
      link: "",
      author: "",
      category: "",
      tags: "",
      country: "",
      state: "",
    });
    setEditingId(null);
  };

  const handleEdit = (headline) => {
    setEditingId(headline._id);
    setFormData({
      ...headline,
      tags: Array.isArray(headline.tags) ? headline.tags.join(", ") : "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this headline?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchHeadlines();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    closeModal();
    fetchHeadlines();
  };

  return (
    <div className="p-6 text-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Headlines</h1>
        <button onClick={openModal} className="bg-purple-600 text-white px-4 py-2 rounded">
          Add New Headline
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
            {headlines.map((h) => (
              <tr key={h._id}>
                <td className="p-3 border">{h.title}</td>
                <td className="p-3 border">{h.author || "-"}</td>
                <td className="p-3 border">{h.category || "-"}</td>
                <td className="p-3 border">{h.country}</td>
                <td className="p-3 border text-center space-x-2">
                  <button onClick={() => handleEdit(h)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(h._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-xl relative">
            <button onClick={closeModal} className="absolute top-2 right-3 text-lg">
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Headline" : "Add Headline"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-2 text-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Title"
                  required
                  className="w-1/2 border px-2 py-1 rounded"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Headline"
                  required
                  className="w-1/2 border px-2 py-1 rounded"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                />
              </div>
              <textarea
                placeholder="Description"
                className="w-full border px-2 py-1 rounded"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <textarea
                placeholder="Content"
                className="w-full border px-2 py-1 rounded"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Image URL"
                  className="w-1/2 border px-2 py-1 rounded"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Link"
                  className="w-1/2 border px-2 py-1 rounded"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Author"
                  className="w-1/2 border px-2 py-1 rounded"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="w-1/2 border px-2 py-1 rounded"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                className="w-full border px-2 py-1 rounded"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Country"
                  required
                  className="w-1/2 border px-2 py-1 rounded"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="w-1/2 border px-2 py-1 rounded"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
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

export default Headline;