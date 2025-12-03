import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';

const Poll = () => {
  const { darkMode } = useContext(ThemeContext);
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPoll = async () => {
    try {
      const res = await fetch('https://online-news-platform-backend.onrender.com/api/polls/latest');
      const data = await res.json();
      const alreadyVoted = localStorage.getItem(`voted_poll_${data._id}`);
      setVoted(!!alreadyVoted);
      // Simulate 4s delay
      setTimeout(() => {
        setPoll(data);
        setLoading(false);
      }, 4000);
    } catch (error) {
      console.error('Error fetching poll:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  const vote = async (index) => {
    if (!poll) return;

    try {
      const res = await fetch(`https://online-news-platform-backend.onrender.com/api/polls/vote/${poll._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex: index }),
      });

      const updatedPoll = await res.json();
      localStorage.setItem(`voted_poll_${poll._id}`, true);
      setPoll(updatedPoll);
      setVoted(true);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const getTotalVotes = () => poll?.votes.reduce((sum, v) => sum + v, 0) || 0;

  return (
    <div className={`p-4 mt-4 rounded-md border max-w-md min-h-[280px] ${loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}>
      {loading ? (
        <>
          <div className="h-5 w-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-5 w-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-5 w-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
        </>
      ) : (
        <>
          <h2 className={`text-lg font-bold mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <i className={`fas fa-poll-h mr-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}></i> Poll
          </h2>

          <div className={`border rounded-md p-3 text-sm ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}> 
            <h2 className={`text-base font-semibold mb-3 ${darkMode ? 'text-purple-200' : ''}`}>
              {poll?.pollQuestion}
            </h2>

            {!voted ? (
              <div className="space-y-2">
                {Array.isArray(poll.options) && poll.options.length > 0 ? (
                  poll.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => vote(idx)}
                      className={`block w-full font-medium px-4 py-2 rounded ${darkMode ? 'bg-purple-900 hover:bg-purple-800 text-purple-200' : 'bg-purple-100 hover:bg-purple-200 text-purple-800'}`}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No poll options available.</div>
                )}
              </div>
            ) : (
              <div className="mt-5 border-t pt-3">
                <h3 className={`font-semibold mb-1 text-sm ${darkMode ? 'text-purple-200' : 'text-gray-700'}`}>Results:</h3>
                <ul className={`space-y-3 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {Array.isArray(poll.options) && poll.options.length > 0 ? (
                    poll.options.map((option, idx) => {
                      const totalVotes = getTotalVotes();
                      const votes = poll.votes[idx];
                      const percent = totalVotes === 0 ? 0 : ((votes / totalVotes) * 100).toFixed(1);
                      return (
                        <li key={idx}>
                          <div className={`mb-1 font-medium ${darkMode ? 'text-red-300' : 'text-red-800'}`}>{option}</div>
                          <div className={`w-full rounded-full h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div
                              className={`h-4 rounded-full text-xs text-center ${darkMode ? 'bg-purple-800 text-purple-100' : 'bg-purple-600 text-white'}`}
                              style={{ width: `${percent}%` }}
                            >
                              {percent}%
                            </div>
                          </div>
                          <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{votes} vote{votes !== 1 ? 's' : ''}</div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-gray-500 text-center">No poll options available.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Poll;
