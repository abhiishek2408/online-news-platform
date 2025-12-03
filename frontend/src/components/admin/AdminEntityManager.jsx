import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../user/Context/ThemeContext';

const PAGE_SIZE = 10;

const AdminEntityManager = ({ apiUrl, entityName, fields = [{ key: 'name', label: 'Name' }], role = 'admin' }) => {
  const { darkMode } = useContext(ThemeContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  // Analytics
  const totalItems = items.length;
  const recentItems = items.slice(-5);

  // Fetch all items
  useEffect(() => {
    setLoading(true);
    axios.get(apiUrl)
      .then(res => setItems(res.data))
      .catch(() => setError('Failed to fetch data'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  // Filtered and searched items
  const filteredItems = items.filter(item => {
    let match = true;
    if (search) {
      match = fields.some(f => String(item[f.key] || '').toLowerCase().includes(search.toLowerCase()));
    }
    // Add more filter logic here if needed
    return match;
  });

  // Pagination
  const pagedItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);

  // Add or update item
  const handleSave = (data) => {
    setLoading(true);
    const req = editItem
      ? axios.put(`${apiUrl}/${editItem._id}`, data)
      : axios.post(apiUrl, data);
    req.then(() => {
      setShowModal(false);
      setEditItem(null);
      return axios.get(apiUrl).then(res => setItems(res.data));
    })
    .catch(() => setError('Failed to save'))
    .finally(() => setLoading(false));
  };

  // Delete item
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete?')) return;
    setLoading(true);
    axios.delete(`${apiUrl}/${id}`)
      .then(() => setItems(items.filter(i => i._id !== id)))
      .catch(() => setError('Failed to delete'))
      .finally(() => setLoading(false));
  };

  // Role-based access
  const canEdit = role === 'admin' || role === 'editor';
  const canDelete = role === 'admin';

  return (
    <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Analytics */}
      <div className="flex gap-6 mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl shadow">
          <div className="text-lg font-bold">Total {entityName}s</div>
          <div className="text-2xl font-extrabold">{totalItems}</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white px-6 py-4 rounded-xl shadow">
          <div className="text-lg font-bold">Recent</div>
          <div className="text-base">{recentItems.map(i => i[fields[0].key]).join(', ')}</div>
        </div>
      </div>
      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${entityName}s...`}
          className="p-2 border rounded w-64"
        />
        {/* Add more filters here if needed */}
      </div>
      {/* Add Button */}
      {canEdit && (
        <div className="mb-4">
          <button
            onClick={() => { setShowModal(true); setEditItem(null); }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition"
          >
            Add {entityName}
          </button>
        </div>
      )}
      {loading && <div className="text-purple-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {/* Table */}
      <table className="w-full border rounded-xl overflow-hidden mb-4">
        <thead className={darkMode ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-900'}>
          <tr>
            {fields.map(f => <th key={f.key} className="p-3">{f.label}</th>)}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pagedItems.map(item => (
            <tr key={item._id} className="border-b">
              {fields.map(f => <td key={f.key} className="p-3">{item[f.key]}</td>)}
              <td className="p-3 flex gap-2">
                {canEdit && (
                  <button
                    onClick={() => { setShowModal(true); setEditItem(item); }}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >Edit</button>
                )}
                {canDelete && (
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex gap-2 items-center mb-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
        >Prev</button>
        <span className="px-2">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
        >Next</button>
      </div>
      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md`}>
            <h3 className="text-xl font-bold mb-4">{editItem ? `Edit ${entityName}` : `Add ${entityName}`}</h3>
            {/* Custom Form Fields */}
            {fields.map(f => (
              <input
                key={f.key}
                type="text"
                defaultValue={editItem?.[f.key] || ''}
                placeholder={f.label}
                className="w-full p-3 mb-4 border rounded"
                id={`entity-${f.key}`}
              />
            ))}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >Cancel</button>
              <button
                onClick={() => handleSave(Object.fromEntries(fields.map(f => [f.key, document.getElementById(`entity-${f.key}`).value])))}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEntityManager;
