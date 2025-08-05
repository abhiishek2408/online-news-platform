import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './Context/ThemeContext';
import { SearchContext } from './Context/SearchContext';
import './Navbar.css';

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { keyword, setKeyword, handleSearch } = useContext(SearchContext);
  const [showMenu, setShowMenu] = useState(false);


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Only on Enter
    }
  };
  

  return (
    <nav className="navbar bg-gray-800 py-5 px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between w-full relative z-50">
      {/* Logo and Hamburger */}
      <div className="flex justify-between items-center w-full sm:w-auto">
        <div className="logo flex items-center text-3xl font-bold text-white">
          <span className="text-purple-400 text-3xl mr-2">🌐</span>
          <span className="logo-font">News</span>
          <span className="logo-font text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-400">
            Alpha
          </span>
        </div>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden text-gray-200 focus:outline-none text-2xl"
        >
          <i className={`fas ${showMenu ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Main Menu */}
      <ul
        className={`main-menu w-full sm:w-auto flex-col sm:flex-row sm:flex space-y-3 sm:space-y-0 sm:space-x-6 text-sm sm:text-base font-medium text-gray-200 font-thin items-start sm:items-center transition-all duration-300 ease-in-out ${
          showMenu ? 'flex mt-4' : 'hidden sm:flex'
        }`}
      >
        <li><Link to="/user/dashboard" className="hover:text-purple-400 px-2 py-2 transition">Home</Link></li>
        <li><Link to="/user/dashboard/weatherModal" className="hover:text-purple-400 px-2 py-2 transition">Weather</Link></li>

        {/* Local News Dropdown */}
        <li className="relative group">
          <button
            type="button"
            tabIndex={0}
            className="hover:text-purple-400 px-2 py-2 flex items-center cursor-pointer focus:outline-none"
          >
            Local News
            <svg className="ml-1 w-4 h-4 text-gray-200 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="dropdown absolute z-20 bg-gray-700 border border-gray-600 rounded-md grid grid-cols-2 gap-y-1 gap-x-6 p-3 mt-2 min-w-[400px] max-h-[400px] overflow-y-auto hidden group-hover:grid group-focus-within:grid sm:left-1/2 sm:-translate-x-1/2 sm:top-full left-0 top-[100%] translate-x-0">
            {[
              "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu Kashmir", "Jharkhand",
              "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Uttar Pradesh", "Uttarakhand", "West Bengal"
            ].map((state) => (
              <Link
                key={state}
                to={`/user/dashboard/categorynewspage?state=${encodeURIComponent(state)}`}
                className="px-3 py-1.5 hover:bg-gray-600 hover:text-purple-400 text-sm rounded-md transition"
              >
                {state}
              </Link>
            ))}
          </div>
        </li>

        {/* Categories Dropdown */}
        <li className="relative group">
          <button
            type="button"
            tabIndex={0}
            className="hover:text-purple-400 px-2 py-2 flex items-center cursor-pointer focus:outline-none"
          >
            Categories
            <svg className="ml-1 w-4 h-4 text-gray-200 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="dropdown bg-gray-700 border border-gray-600 rounded-md absolute z-20 hidden group-hover:block group-focus-within:block top-full mt-2 sm:left-1/2 sm:-translate-x-1/2 left-0 translate-x-0 min-w-[200px]">
            {[
              "Religion", "LifeStyle", "Election", "Sports", "Quiz", "Facts", "Weather News", "Articles", "Editorial"
            ].map((category) => (
              <Link
                key={category}
                to={`/user/dashboard/categorynewspage?category=${encodeURIComponent(category)}`}
                className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition"
              >
                {category}
              </Link>
            ))}
          </div>
        </li>

        {/* Search Box */}
        <li className="flex items-center w-full sm:w-auto">
          <div className="search-box relative w-full sm:w-auto">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search news..."
              className="w-full sm:w-36 px-3 py-1.5 rounded-md bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:border-purple-400 pr-10"
            />
            <i
              onClick={handleSearch}
              className="fa fa-search absolute right-3 top-2.5 text-gray-400 hover:text-purple-400 cursor-pointer"
            />
          </div>
        </li>

        {/* Subscribe */}
        <li>
          <Link
            to="/user/dashboard/subscriptionpage"
            className="bg-purple-600 text-white py-1.5 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200"
          >
            Subscribe
          </Link>
        </li>

        {/* Theme Toggle */}
        <li>
          <button
            onClick={toggleTheme}
            className="text-gray-200 hover:text-purple-400 transition"
            title="Toggle theme"
          >
            {darkMode ? (
              <i className="fas fa-sun text-lg"></i>
            ) : (
              <i className="fas fa-moon text-lg"></i>
            )}
          </button>
        </li>

        {/* Profile Dropdown */}
        <li className="relative group">
          <span className="text-gray-200 hover:text-purple-400 text-lg cursor-pointer">
            <i className="fas fa-user-circle"></i>
          </span>
          <div className="dropdown bg-gray-700 border border-gray-600 rounded-md absolute z-20 hidden group-hover:block group-focus-within:block top-full mt-2 right-0 min-w-[150px]">
            <Link to="/login" className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">Login</Link>
            <Link to="/register" className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">Register</Link>
            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">Settings</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
