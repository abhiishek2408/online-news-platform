import React, { useEffect, useState } from 'react';

const LiveUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [message, setMessage] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const API = 'https://online-news-platform-backend.onrender.com/api/live-updates';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setUpdates(data);
  };

  const openModal = () => {
    setModalOpen(true);
    setMessage('');
    setUpdateId('');
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEdit = (id, msg) => {
    setUpdateId(id);
    setMessage(msg);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert('Message cannot be empty');

    const method = updateId ? 'PUT' : 'POST';
    const url = updateId ? `${API}/${updateId}` : API;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    closeModal();
    loadData();
  };

  return (
    <div className="bg-gray-100 p-6 text-sm min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Live Updates</h1>
        <button onClick={openModal} className="bg-purple-600 text-white px-4 py-2 rounded">Add New</button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="p-3 border">Message</th>
              <th className="p-3 border">Timestamp</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {updates.map((item) => (
              <tr key={item._id}>
                <td className="p-3 border">{item.message}</td>
                <td className="p-3 border">{new Date(item.timestamp).toLocaleString()}</td>
                <td className="p-3 border text-center space-x-2">
                  <button onClick={() => handleEdit(item._id, item.message)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
            <button onClick={closeModal} className="absolute top-2 right-3 text-lg">&times;</button>
            <h2 className="text-xl font-semibold mb-4">{updateId ? 'Edit Update' : 'Add Update'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message..."
                required
                className="w-full border px-2 py-1 rounded text-sm"
              />
              <div className="flex justify-end gap-2">
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

export default LiveUpdates;