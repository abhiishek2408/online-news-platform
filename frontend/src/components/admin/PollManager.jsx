import React, { useEffect, useState } from 'react';

const PollManager = () => {
  const API = 'http://localhost:3003/api/manage-polls';

  const [polls, setPolls] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [pollId, setPollId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPolls(data);
  };

  const openModal = () => {
    setPollQuestion('');
    setOptions(['', '']);
    setPollId('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const editPoll = (poll) => {
    setPollQuestion(poll.pollQuestion);
    setOptions(poll.options);
    setPollId(poll._id);
    setModalOpen(true);
  };

  const deletePoll = async (id) => {
    if (window.confirm('Delete this poll?')) {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanOptions = options.map(opt => opt.trim()).filter(Boolean);
    if (cleanOptions.length < 2) return alert('Enter at least 2 options.');

    const body = { pollQuestion, options: cleanOptions };
    const method = pollId ? 'PUT' : 'POST';
    const url = pollId ? `${API}/${pollId}` : API;

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
        <h1 className="text-2xl font-bold">Poll Manager</h1>
        <button onClick={openModal} className="bg-purple-600 text-white px-4 py-2 rounded">
          Add Poll
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="p-3 border">Question</th>
              <th className="p-3 border">Options</th>
              <th className="p-3 border">Votes</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {polls.map((poll) => (
              <tr key={poll._id}>
                <td className="p-3 border">{poll.pollQuestion}</td>
                <td className="p-3 border">
                  <ul>
                    {poll.options.map((option, i) => (
                      <li key={i}>
                        {option} ({poll.votes?.[i] || 0})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 border">
                  {poll.votes?.reduce((a, b) => a + b, 0) || 0}
                </td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => editPoll(poll)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePoll(poll._id)}
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

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-lg relative">
            <button onClick={closeModal} className="absolute top-2 right-3 text-lg">
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {pollId ? 'Edit Poll' : 'Add Poll'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Poll Question"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
              <div className="space-y-2">
                {options.map((opt, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required={index < 2}
                    className="option border p-2 rounded w-full"
                  />
                ))}
              </div>
              <button type="button" onClick={addOption} className="text-purple-600 text-sm">
                + Add Option
              </button>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
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

export default PollManager;
