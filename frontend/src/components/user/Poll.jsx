import React, { useEffect, useState } from 'react';

const Poll = () => {
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPoll = async () => {
    try {
      const res = await fetch('http://localhost:3003/api/polls/latest');
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
      const res = await fetch(`http://localhost:3003/api/polls/vote/${poll._id}`, {
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
    <div className={`p-4 mt-4 rounded-md border border-gray-200 bg-gray-50 max-w-md min-h-[280px] ${loading ? 'animate-pulse' : ''}`}>
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
          <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
            <i className="fas fa-poll-h text-purple-600 mr-2"></i> Poll
          </h2>

          <div className="bg-white border rounded-md p-3 text-sm">
            <h2 className="text-base font-semibold mb-3">
              {poll?.pollQuestion}
            </h2>

            {!voted ? (
              <div className="space-y-2">
                {poll.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => vote(idx)}
                    className="block w-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium px-4 py-2 rounded"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-5 border-t pt-3">
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">Results:</h3>
                <ul className="space-y-3 text-xs text-gray-600">
                  {poll.options.map((option, idx) => {
                    const totalVotes = getTotalVotes();
                    const votes = poll.votes[idx];
                    const percent = totalVotes === 0 ? 0 : ((votes / totalVotes) * 100).toFixed(1);
                    return (
                      <li key={idx}>
                        <div className="mb-1 font-medium text-red-800">{option}</div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-purple-600 h-4 rounded-full text-xs text-white text-center"
                            style={{ width: `${percent}%` }}
                          >
                            {percent}%
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{votes} vote{votes !== 1 ? 's' : ''}</div>
                      </li>
                    );
                  })}
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
