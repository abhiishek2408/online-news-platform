import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState({ error: '', success: '' });

  useEffect(() => {
    document.body.style.fontFamily = `'Lato', sans-serif`;
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form.name, form.email, form.password);

    if (res.success) {
      setMsg({ success: 'Registration successful!', error: '' });
      setTimeout(() => navigate('/login'), 1000);
    } else {
      setMsg({ error: res.message, success: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-center text-3xl font-light text-purple-700 mb-6">Register</h2>

        {msg.error && <p className="text-sm text-red-500 text-center mb-4">{msg.error}</p>}
        {msg.success && <p className="text-sm text-green-500 text-center mb-4">{msg.success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 font-light mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-sm font-light"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-light mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-sm font-light"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-light mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-sm font-light"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm font-light transition-all"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-light">
            Already have an account?{' '}
            <span
              className="text-purple-600 hover:underline cursor-pointer font-normal"
              onClick={() => navigate('/')}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
