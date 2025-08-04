import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, Link } from 'react-router-dom';

const NewsAlphaAdmin = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigationLinks = [
    { label: "Home", path: "/admin/dashboard" },
    { label: "Manage Highlight", path: "managehighlight" },
    { label: "Manage Headline", path: "manageheadline" },
    { label: "Manage LatestHeadlines", path: "manage-latestheadlines" },
    { label: "Manage LiveUpdate", path: "manageliveupdate" },
    { label: "Manage RecentNews", path: "managerecentnews" },
    { label: "Manage SpecialNews", path: "managespecialnews" },
    { label: "Manage Poll", path: "managepoll" },
    { label: "Manage Comment", path: "managecomment" },
    { label: "Manage User", path: "manage-users" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-light relative">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold tracking-wide">
          News<span className="text-purple-400">Alpha</span> Admin
        </div>
      </nav>

      {/* Sidebar Toggle Button (Only when collapsed) */}
      {isSidebarCollapsed && (
        <button
          onClick={() => setIsSidebarCollapsed(false)}
          className="absolute top-16 left-0 h-10 w-6 bg-gray-900 text-white flex items-center justify-center rounded-r-md hover:bg-purple-500 transition"
        >
          <FaBars size={16} />
        </button>
      )}

      {/* Layout */}
      <div className="flex mt-1 min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className={`${isSidebarCollapsed ? "w-0 overflow-hidden p-0" : "w-60 p-5"} bg-gray-900 text-white shadow-md transition-all duration-300`}>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-base font-semibold">Navigation</h2>
            <button onClick={() => setIsSidebarCollapsed(true)} className="text-white hover:text-purple-400 text-lg font-bold">&times;</button>
          </div>

          <nav className="space-y-3">
            {navigationLinks.map((nav, idx) => (
              <Link key={idx} to={nav.path} className="block text-sm font-normal hover:text-purple-400 transition">{nav.label}</Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="px-4 py-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NewsAlphaAdmin;
