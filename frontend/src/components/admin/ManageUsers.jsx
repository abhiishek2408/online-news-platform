import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
  const API = 'http://localhost:3003/api/users';

  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'viewer',
    _id: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setUsers(data);
  };

  const openModal = () => {
    setFormData({ email: '', password: '', role: 'viewer', _id: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ email: '', password: '', role: 'viewer', _id: '' });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEdit = (user) => {
    setFormData({ email: user.email, role: user.role, password: '', _id: user._id });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, email, password, role } = formData;

    const method = _id ? 'PUT' : 'POST';
    const url = _id ? `${API}/${_id}` : API;

    const body = _id ? { email, role } : { email, password, role };

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    closeModal();
    loadData();
  };

  return (
    <div className="bg-gray-100 p-6 text-sm font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={openModal}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.role}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
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
              {formData._id ? 'Edit User' : 'Add User'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              {!formData._id && (
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              )}
              <select
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
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

export default ManageUsers;
