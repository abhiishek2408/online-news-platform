import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopHighlight = () => {
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    const loadHighlight = async () => {
      try {
        const res = await fetch('http://localhost:3003/api/highlights');
        const data = await res.json();
        setHighlight(data[0]);
      } catch (err) {
        console.error("Error loading highlight:", err);
      }
    };

    loadHighlight();
  }, []);

  return (
    
      <div className="flex flex-col w-full pb-1 gap-4 dark:bg-gray-900 dark:text-white">
        <div className="mx-auto my-1 pb-4 bg-white rounded-lg border border-gray-200 bg-gray-50">
          <h2 className="text-lg font-bold text-purple-600 mb-2 ml-3 flex items-center">
            <i className="fas fa-newspaper mr-2"></i> Top Highlight
          </h2>

          <div className="flex-1 overflow-y-auto custom-scroll p-2 min-h-[150px]">
            {highlight ? (
              <>
                <Link
                  to={`/user/dashboard/articleviewpage?id=${highlight._id}`}
                  className="block text-xl font-bold text-gray-900 mb-2"
                >
                  {highlight.title}
                </Link>

                <div className="mb-3 rounded-lg overflow-hidden h-48">
                  <Link to={`/user/dashboard/articleviewpage?id=${highlight._id}`}>
                    <img
                      src={highlight.image}
                      alt="Top Highlight"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>

                <p className="text-gray-700 text-sm">{highlight.description}</p>
              </>
            ) : (
              <p className="text-gray-500 text-sm">Loading highlight...</p>
            )}
          </div>

          <div className="mt-1 text-right">
            <Link
              to="allhighlightnews"
              className="text-purple-600 hover:underline text-sm font-semibold transition duration-300 ease-in-out"
            >
              See more highlights &rarr;
            </Link>
          </div>
        </div>
      </div>

  );
};

export default TopHighlight;
