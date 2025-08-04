import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const RecentHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeadlines = async () => {
      try {
        const res = await fetch("https://online-news-platform-backend.onrender.com/api/headlines");
        const data = await res.json();
        setTimeout(() => {
          setHeadlines(data.slice(0, 10));
          setLoading(false);
        }, 4000); // Simulate 4-second load
      } catch (err) {
        console.error("Error loading headlines:", err);
        setLoading(false);
      }
    };

    loadHeadlines();
  }, []);

  return (
    <div className="bg-white border border-purple-100 rounded-xl p-5 flex flex-col w-full max-w-md">
      
      {/* Conditionally render heading only when loading is false */}
      {!loading && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <i className="fas fa-bolt text-purple-600"></i>
          Recent Headlines
        </h2>
      )}

      <div className="flex-1 overflow-y-auto custom-scroll max-h-[470px]">
        <ul className="space-y-2 text-sm">
          {loading ? (
            Array.from({ length: 16 }).map((_, idx) => (
              <li
                key={idx}
                className="h-5 bg-gray-300 rounded-md animate-pulse w-full"
              ></li>
            ))
          ) : headlines.length === 0 ? (
            <li className="text-gray-500">No headlines available.</li>
          ) : (
            headlines.map((h, index) => (
              <li
                key={index}
                className="p-2 bg-white rounded-md border border-gray-200"
              >
                <Link
                  to={h.link}
                  className="block text-gray-800 hover:text-purple-600 transition"
                >
                  {h.headline}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecentHeadlines;
