import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
    <div className="p-4 shadow-md rounded bg-white dark:bg-gray-800 w-full h-[400px] max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2 text-center">Subscribe for Latest News</h2>

      {subscribed ? (
        <p className="text-green-600 text-center">{message}</p>
      ) : (
        <>
          <div className="flex items-center justify-center mb-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 border border-gray-300 rounded mr-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              disabled={loading || !email}
              className={`px-4 py-2 rounded ${
                loading || !email
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {message && <p className="text-red-500 text-center">{message}</p>}
        </>
      )}
    </div>
  );
};

export default SubscriptionPage;
