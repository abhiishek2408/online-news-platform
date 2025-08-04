import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecentHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeadlines = async () => {
      try {
        const res = await fetch("http://localhost:3003/api/headlines");
        const data = await res.json();
        setHeadlines(data.slice(0, 10));
      } catch (err) {
        console.error("Error loading headlines:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHeadlines();
  }, []);

  return (
    <div className="bg-white border border-purple-100 rounded-lg p-5 flex flex-col flex-grow w-full max-w-md">
      <h2 className="text-lg font-bold text-purple-600 mb-4 flex items-center">
        <i className="fas fa-newspaper text-purple-600 mr-2"></i> Recent Headlines
      </h2>

      <div className="overflow-y-auto mb-1 mt-2 custom-scroll max-h-[330px]">
        <ul className="space-y-2 text-xs font-roboto">
          {loading ? (
            <li className="text-gray-500">Loading...</li>
          ) : headlines.length === 0 ? (
            <li className="text-gray-500">No headlines available.</li>
          ) : (
            headlines.map((h, index) => (
              <li
                key={index}
                className="p-1 bg-white rounded-md shadow-xs border border-gray-100"
              >
                <Link
                  to={h.link}
                  className="block text-gray-700 hover:text-purple-500 transition"
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
