import React, { useState } from "react";
import { FaBars, FaHome, FaStar, FaHeading, FaListAlt, FaBolt, FaNewspaper, FaGift, FaPoll, FaComments, FaUser } from "react-icons/fa";
import { Outlet, Link, useLocation } from 'react-router-dom';

const NewsAlphaAdmin = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigationLinks = [
    { label: "Home", path: "/admin/dashboard", icon: <FaHome /> },
    { label: "Manage Highlight", path: "managehighlight", icon: <FaStar /> },
    { label: "Manage Headline", path: "manageheadline", icon: <FaHeading /> },
    { label: "Manage LatestHeadlines", path: "manage-latestheadlines", icon: <FaListAlt /> },
    { label: "Manage LiveUpdate", path: "manageliveupdate", icon: <FaBolt /> },
    { label: "Manage RecentNews", path: "managerecentnews", icon: <FaNewspaper /> },
    { label: "Manage SpecialNews", path: "managespecialnews", icon: <FaGift /> },
    { label: "Manage Poll", path: "managepoll", icon: <FaPoll /> },
    { label: "Manage Comment", path: "managecomment", icon: <FaComments /> },
    { label: "Manage User", path: "manage-users", icon: <FaUser /> },
  ];
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-100 to-yellow-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 text-gray-800 dark:text-white font-light relative">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-900 via-pink-900 to-yellow-700 text-white px-8 py-5 flex justify-between items-center shadow-lg">
        <div className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
          <span className="text-3xl">🌐</span>
          News<span className="text-purple-400">Alpha</span> <span className="ml-2 text-base font-normal bg-purple-700/80 px-3 py-1 rounded-full">Admin Panel</span>
        </div>
        <div className="hidden md:block text-sm font-light">Welcome, Admin!</div>
      </nav>

      {/* Sidebar Toggle Button (Only when collapsed) */}
      {isSidebarCollapsed && (
        <button
          onClick={() => setIsSidebarCollapsed(false)}
          className="fixed top-24 left-0 h-10 w-8 bg-purple-700 text-white flex items-center justify-center rounded-r-xl shadow-lg hover:bg-pink-500 transition z-40"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Layout */}
      <div className="flex mt-1 min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className={`${isSidebarCollapsed ? "w-0 overflow-hidden p-0" : "w-64 p-7"} bg-gradient-to-br from-purple-900 via-gray-900 to-purple-700 text-white shadow-2xl transition-all duration-300 min-h-[calc(100vh-80px)] relative z-30 rounded-r-3xl`}>
          <div className="flex justify-between items-center mb-7">
            <h2 className="text-lg font-bold tracking-wide">Navigation</h2>
            <button onClick={() => setIsSidebarCollapsed(true)} className="text-white hover:text-pink-400 text-2xl font-bold">&times;</button>
          </div>

          <nav className="space-y-2">
            {navigationLinks.map((nav, idx) => {
              const isActive = location.pathname.endsWith(nav.path) || location.pathname === nav.path || location.pathname.endsWith(`/${nav.path}`);
              return (
                <Link
                  key={idx}
                  to={nav.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 shadow-sm hover:bg-purple-700/60 hover:text-yellow-300 ${isActive ? 'bg-purple-700/80 text-yellow-300' : 'bg-gray-900/40 text-white'}`}
                >
                  <span className="text-xl">{nav.icon}</span> {nav.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="px-6 py-8 flex-1 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl mx-4 my-6 min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NewsAlphaAdmin;
