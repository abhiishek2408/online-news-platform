import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, role } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ error: '', success: '' });

  useEffect(() => {
    document.body.style.fontFamily = `'Lato', sans-serif`;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);

    if (res.success) {
      setMsg({ success: 'Login successful', error: '' });
      setTimeout(() => {
        navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }, 1000);
    } else {
      setMsg({ error: res.message, success: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-center text-3xl font-light text-purple-700 mb-6">Login</h2>

        {msg.error && <p className="text-sm text-red-500 text-center mb-4">{msg.error}</p>}
        {msg.success && <p className="text-sm text-green-500 text-center mb-4">{msg.success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 font-light mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-sm font-light"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-light mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 text-sm font-light"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm font-light transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-light">
            Not registered yet?{" "}
            <span
              className="text-purple-600 hover:underline cursor-pointer font-normal"
              onClick={() => navigate('/register')}
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
