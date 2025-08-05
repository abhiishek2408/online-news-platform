import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopHighlight = () => {
  const [highlight, setHighlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHighlight = async () => {
      try {
        const res = await fetch('https://online-news-platform-backend.onrender.com/api/highlights');
        const data = await res.json();
        
      setTimeout(() => {
      setHighlight(data[0]);
      setLoading(false);
      }, 2000);
    } catch (err) {
      console.error("Error loading highlight:", err);
      setLoading(false); // Still hide skeleton if error
    }
    };

    loadHighlight();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-[590px] gap-4 dark:bg-gray-900 dark:text-white rounded-xl">
      <div className="min-h-[500px] w-full p-6 bg-white rounded-lg border border-gray-200 bg-gray-50 flex flex-col justify-between">

      

        {/* Content or Skeleton */}
        <div className="flex-1 space-y-4">
          {loading ? (
            <>
              <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-52 bg-gray-300 rounded-md w-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
              </div>
            </>
          ) : (
            highlight && (
              <>

                {/* Professional Heading */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2 border-purple-300">
            <i className="fas fa-bolt text-purple-600"></i>
            Top Highlight
          </h2>
          <p className="text-sm text-gray-500 pl-7 mt-1">
            Featured story curated just for you
          </p>
        </div>

                {/* Title */}
                <Link
                  to={`/user/dashboard/articleviewpage?id=${highlight._id}`}
                  className="text-xl font-semibold text-gray-900 hover:text-purple-700 leading-snug"
                >
                  {highlight.title}
                </Link>

                {/* Image */}
                <div className="rounded-lg overflow-hidden">
                  <Link to={`/user/dashboard/articleviewpage?id=${highlight._id}`}>
                    <img
                      src={highlight.image}
                      alt="Top Highlight"
                      className="w-full h-52 object-cover rounded-md"
                    />
                  </Link>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-base leading-relaxed">
                  {highlight.description}
                </p>
              </>
            )
          )}
        </div>

        {/* See More Link */}
        {!loading && (
          <div className="mt-6 text-right">
            <Link
              to="/user/dashboard/allhighlightnews"
              className="text-purple-700 hover:underline text-sm font-medium"
            >
              See more highlights &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopHighlight;
