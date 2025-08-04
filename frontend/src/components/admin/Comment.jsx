import React, { useEffect, useState } from 'react';

const ManageComments = () => {
  const API_URL = 'http://localhost:3003/api/comments';

  const [comments, setComments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', rating: '', comment: '', _id: '' });

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setComments(data);
  };

  const openModal = () => {
    setFormData({ name: '', rating: '', comment: '', _id: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: '', rating: '', comment: '', _id: '' });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEdit = (comment) => {
    setFormData(comment);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this comment?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      loadComments();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, rating, comment, _id } = formData;
    const method = _id ? 'PUT' : 'POST';
    const url = _id ? `${API_URL}/${_id}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, rating, comment })
    });

    closeModal();
    loadComments();
  };

  return (
    <div className="bg-gray-100 p-6 text-sm font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Comments</h1>
        <button onClick={openModal} className="bg-purple-600 text-white px-4 py-2 rounded">
          Add New Comment
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Rating</th>
              <th className="p-3 border">Comment</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {comments.map((c) => (
              <tr key={c._id}>
                <td className="p-3 border">{c.name}</td>
                <td className="p-3 border">{c.rating}</td>
                <td className="p-3 border">{c.comment}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
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
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
            <button onClick={closeModal} className="absolute top-2 right-3 text-lg">
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {formData._id ? 'Update Comment' : 'Add Comment'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                id="rating"
                placeholder="Rating (1-5)"
                value={formData.rating}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <textarea
                id="comment"
                placeholder="Write your comment..."
                value={formData.comment}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              ></textarea>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
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

export default ManageComments;
