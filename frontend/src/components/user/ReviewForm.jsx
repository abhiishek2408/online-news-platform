import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';

const ReviewForm = () => {
  const { darkMode } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert('Please select a rating.');
      return;
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rating, comment }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Comment submitted successfully!');
        setName('');
        setRating('');
        setComment('');
      } else {
        console.error(data);
        alert('Failed to submit comment: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting your comment.');
    }
  };

  return (
    <div className={`flex-col lg:flex-row justify-between w-full max-w-[1200px] mx-auto mt-5 items-stretch ${loading ? (darkMode ? 'animate-pulse bg-gray-800 p-5 rounded-xl' : 'animate-pulse bg-gray-100 p-5 rounded-xl') : (darkMode ? 'bg-gray-900 p-3' : 'bg-white p-3')}`}>
  
      {loading ? (
        <div className={darkMode ? "w-full h-[400px] bg-gray-700 rounded-xl" : "w-full h-[400px] bg-gray-200 rounded-xl"}></div>
      ) : (
        <section className={`shadow-sm rounded-xl p-6 border w-full ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <i className={`fas fa-comments mr-2 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}></i> Comments
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="reviewer-name" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}> 
                Your Name:
              </label>
              <input
                type="text"
                id="reviewer-name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-52 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-400'}`}
              />
            </div>

            {/* Rating Stars */}
            <div className="flex gap-2 items-center">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Your Rating:</span>
              {[5, 4, 3, 2, 1].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star${star}`}
                    name="rating"
                    value={star}
                    checked={rating === String(star)}
                    onChange={() => setRating(String(star))}
                    className="hidden"
                  />
                  <label
                    htmlFor={`star${star}`}
                    className={`cursor-pointer text-2xl transition-colors duration-200 ${rating >= star ? 'text-yellow-400' : (darkMode ? 'text-gray-600' : 'text-gray-400')}`}
                  >
                    ★
                  </label>
                </React.Fragment>
              ))}
            </div>

            {/* Comment Textarea */}
            <div>
              <label htmlFor="comment" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}> 
                Your Comments:
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-400'}`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <input
                type="submit"
                value="Submit Comment"
                className={`bg-gradient-to-br px-6 py-2.5 rounded-lg text-base font-medium shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer ${darkMode ? 'from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-900 text-purple-200' : 'from-purple-600 to-purple-600 hover:from-purple-700 hover:to-purple-800 text-white'}`}
              />
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default ReviewForm;
