import React, { useState } from 'react';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

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
    <div className="flex-col lg:flex-row justify-between w-full max-w-[1000px] bg-white p-3 mx-auto mt-5 items-stretch">
      <section className="bg-white shadow-sm rounded-xl p-6 border border-gray-200 w-full">
        <h3 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
          <i className="fas fa-comments text-purple-500 mr-2"></i> Comments
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="reviewer-name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name:
            </label>
            <input
              type="text"
              id="reviewer-name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-52 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Rating Stars */}
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Your Rating:</span>
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
                  className={`cursor-pointer text-2xl transition-colors duration-200 ${
                    rating >= star ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                >
                  ★
                </label>
              </React.Fragment>
            ))}
          </div>

          {/* Comment Textarea */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Your Comments:
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <input
              type="submit"
              value="Submit Comment"
              className="bg-gradient-to-br from-purple-600 to-purple-600 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2.5 rounded-lg text-base font-medium shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default ReviewForm;
