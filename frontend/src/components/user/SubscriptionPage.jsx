import React, { useState, useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';
import axios from 'axios';

const SubscriptionPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // Use darkMode from ThemeContext (controlled by Navbar)
  const { darkMode } = useContext(ThemeContext);
  // Show subscribe input only after clicking button
  const [showSubscribe, setShowSubscribe] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('https://online-news-platform-backend.onrender.com/api/subscribe', { email });

      if (response.status === 200) {
        setSubscribed(true);
        setMessage(' Thanks for subscribing!');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          setMessage(' Please register first to subscribe.');
        } else if (err.response.status === 400) {
          setMessage(' You have already subscribed.');
        } else {
          setMessage(' Something went wrong. Try again later.');
        }
      } else {
        setMessage(' Could not connect to the server.');
      }
    }
    setLoading(false);
  };

  return (
    <div className={`relative p-8 shadow-xl rounded-3xl w-full h-[400px] max-w-md mx-auto flex flex-col justify-center items-center border backdrop-blur-xl overflow-hidden ${darkMode ? 'bg-gray-900/70 border-purple-800/60' : 'bg-white/70 border-purple-100/60'}`}>
      {/* Dark mode toggle is now controlled from Navbar/ThemeContext */}
      {/* Card Glow */}
      <div className={`absolute -inset-2 blur-2xl opacity-70 z-0 ${darkMode ? 'bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-yellow-900/10' : 'bg-gradient-to-br from-purple-200/30 via-pink-200/20 to-yellow-100/10'}`}></div>
      <h2 className={`text-2xl font-extrabold mb-6 text-center tracking-tight z-10 drop-shadow-sm ${darkMode ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-200 bg-clip-text text-transparent' : 'bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400 bg-clip-text text-transparent'}`}>
        Subscribe for Latest News
      </h2>

      <div className="w-full z-10">
        {subscribed ? (
          <p className={`text-center text-lg font-semibold animate-pulse ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{message}</p>
        ) : (
          <>
            {!showSubscribe && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowSubscribe(true)}
                  className={`font-semibold px-6 py-2 rounded-xl transition-colors duration-200 shadow-md ${darkMode ? 'bg-purple-800 text-white hover:bg-pink-700' : 'bg-purple-200 text-purple-900 hover:bg-pink-200'}`}
                >
                  Subscribe with email
                </button>
              </div>
            )}
            {showSubscribe && (
              <div className="flex flex-col gap-4 items-center justify-center mb-2 w-full mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`p-3 border-2 rounded-xl w-full focus:outline-none focus:ring-2 shadow-sm transition-all duration-200 ${darkMode ? 'border-purple-700 bg-gray-800/80 text-gray-100 focus:ring-purple-600' : 'border-purple-200 bg-white/80 text-gray-800 focus:ring-purple-400'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={loading || !email}
                  className={`w-full py-3 rounded-xl font-bold text-lg shadow-md transition-all duration-200 ${
                    loading || !email
                      ? darkMode
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                      : darkMode
                        ? 'bg-gradient-to-r from-purple-800 to-pink-800 hover:from-purple-900 hover:to-pink-900 text-white scale-[1.03] hover:scale-105'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white scale-[1.03] hover:scale-105'
                  }`}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            )}
            {message && <p className={`text-center font-medium mt-2 ${darkMode ? 'text-red-400' : 'text-red-500'}`}>{message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
