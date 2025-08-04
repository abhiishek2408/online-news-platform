import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { SearchContext } from '../../context/SearchContext';
import './Navbar.css';

const LatestNewsViewPage = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { keyword, setKeyword, handleSearch } = useContext(SearchContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      {/* Top Nav Container */}
      <div className="flex items-center justify-between px-4 py-3 md:px-10 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold">
          <span className="text-purple-400 mr-2">🌐</span>
          <span className="logo-font">News</span>
          <span className="logo-font text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-400">Alpha</span>
        </div>

        {/* Hamburger button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-200 focus:outline-none">
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 items-center text-sm font-light">
          {renderMenuItems()}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden px-4 pt-2 pb-4 space-y-2 text-sm font-light bg-gray-800">
          {renderMenuItems(true)}
        </ul>
      )}
    </nav>
  );

  // 🔁 Reusable Menu Renderer
  function renderMenuItems(isMobile = false) {
    return (
      <>
        <li><Link to="/user/dashboard" className="hover:text-purple-400">Home</Link></li>
        <li><Link to="/user/dashboard/weatherModal" className="hover:text-purple-400">Weather</Link></li>

        {/* Local News Dropdown */}
        <li className="relative group">
          <span className="flex items-center hover:text-purple-400 cursor-pointer">
            Local News
            <svg className="ml-1 w-4 h-4 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
          <div className="dropdown bg-gray-700 border border-gray-600 rounded-md absolute z-20 hidden group-hover:grid grid-cols-2 gap-x-8 p-3 left-1/2 -translate-x-1/2 min-w-[350px] top-full mt-2 max-h-[310px] overflow-y-auto">
            {[
              "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu Kashmir", "Jharkhand",
              "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Uttar Pradesh", "Uttarakhand", "West Bengal"
            ].map((state) => (
              <Link key={state} to={`/user/dashboard/categorynewspage?state=${encodeURIComponent(state)}`}
                className="px-3 py-1.5 hover:bg-gray-600 hover:text-purple-400 text-sm rounded-md transition">
                {state}
              </Link>
            ))}
          </div>
        </li>

        {/* Categories Dropdown */}
        <li className="relative group">
          <span className="flex items-center hover:text-purple-400 cursor-pointer">
            Categories
            <svg className="ml-1 w-4 h-4 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
          <div className="dropdown bg-gray-700 border border-gray-600 rounded-md absolute z-20 hidden group-hover:block top-full mt-2 left-1/2 -translate-x-1/2 min-w-[150px]">
            {[
              "Religion", "LifeStyle", "Election", "Sports", "Quiz", "Facts", "Weather News", "Articles", "Editorial"
            ].map((category) => (
              <Link key={category} to={`/user/dashboard/categorynewspage?category=${encodeURIComponent(category)}`}
                className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">
                {category}
              </Link>
            ))}
          </div>
        </li>

        {/* Search Input */}
        <li className="flex items-center space-x-2">
          <div className="search-box relative w-full">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search news..."
              className="w-full md:w-36 px-3 py-1.5 rounded-md bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:border-purple-400 pr-10"
            />
            <i onClick={handleSearch} className="fa fa-search absolute right-3 top-2.5 text-gray-400 hover:text-purple-400 cursor-pointer" />
          </div>
        </li>

        {/* Subscribe Button */}
        <li><Link to="/user/dashboard/subscriptionpage" className="bg-purple-600 text-white py-1.5 px-4 rounded-md hover:bg-purple-700 transition">Subscribe</Link></li>

        {/* Theme Toggle */}
        <li>
          <button onClick={toggleTheme} className="hover:text-purple-400 transition" title="Toggle theme">
            {darkMode ? <i className="fas fa-sun text-lg"></i> : <i className="fas fa-moon text-lg"></i>}
          </button>
        </li>

        {/* Profile Dropdown */}
        <li className="relative group">
          <span className="hover:text-purple-400 cursor-pointer text-lg">
            <i className="fas fa-user-circle"></i>
          </span>
          <div className="dropdown bg-gray-700 border border-gray-600 rounded-md absolute z-20 hidden group-hover:block top-full mt-2 right-0 min-w-[150px]">
            <Link to="/login" className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">Login</Link>
            <Link to="/register" className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">Register</Link>
            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">Settings</Link>
          </div>
        </li>
      </>
    );
  }
};

export default LatestNewsViewPage;
