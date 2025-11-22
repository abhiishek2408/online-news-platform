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
      handleSearch();
    }
  };

  const states = [
    "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu Kashmir", "Jharkhand",
    "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const categories = [
    "Religion", "LifeStyle", "Election", "Sports", "Quiz", "Facts", "Weather News", "Articles", "Editorial"
  ];

  return (
    <>
      {/* Backdrop overlay for sidebar */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
        />
      )}

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
            onClick={() => setShowMenu(true)}
            className="sm:hidden text-gray-200 focus:outline-none text-2xl"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Desktop Menu */}
       <ul className="hidden sm:flex flex-row space-x-6 text-sm sm:text-base font-thin text-gray-200 items-center">

          <li><Link to="/user/dashboard" className="hover:text-purple-400">Home</Link></li>
          <li><Link to="/user/dashboard/weatherModal" className="hover:text-purple-400">Weather</Link></li>

          {/* Local News Dropdown */}
          <li className="relative group">
            <button className="hover:text-purple-400 flex items-center">
              Local News
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="dropdown absolute z-20 bg-gray-700 border border-gray-600 rounded-md grid grid-cols-2 gap-y-1 gap-x-6 p-3 mt-2 min-w-[400px] max-h-[400px] overflow-y-auto hidden group-hover:grid group-focus-within:grid sm:left-1/2 sm:-translate-x-1/2">
              {states.map((state) => (
                <Link key={state} to={`/user/dashboard/categorynewspage?state=${encodeURIComponent(state)}`}
                  className="px-3 py-1.5 hover:bg-gray-600 hover:text-purple-400 text-sm rounded-md transition">
                  {state}
                </Link>
              ))}
            </div>
          </li>

          {/* Categories Dropdown */}
          <li className="relative group">
            <button className="hover:text-purple-400 flex items-center">
              Categories
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="dropdown bg-gray-700 border border-gray-600 rounded-md absolute z-20 hidden group-hover:block top-full mt-2 min-w-[200px]">
              {categories.map((cat) => (
                <Link key={cat} to={`/user/dashboard/categorynewspage?category=${encodeURIComponent(cat)}`}
                  className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">
                  {cat}
                </Link>
              ))}
            </div>
          </li>

          {/* Search */}
          <li>
            <div className="relative">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search news..."
                className="w-36 px-3 py-1.5 rounded-md bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:border-purple-400 pr-10"
              />
              <i
                onClick={handleSearch}
                className="fa fa-search absolute right-3 top-2.5 text-gray-400 hover:text-purple-400 cursor-pointer"
              />
            </div>
          </li>

          <li><Link to="/user/dashboard/review" className="hover:text-purple-400">Review</Link></li>

          <li>
            <Link to="/user/dashboard/subscriptionpage" className="bg-purple-600 text-white py-1.5 px-4 rounded-md hover:bg-purple-700 transition">
              Subscribe
            </Link>
          </li>

          <li>
            <button onClick={toggleTheme} className="text-gray-200 hover:text-purple-400 transition" title="Toggle theme">
              {darkMode ? <i className="fas fa-sun text-lg"></i> : <i className="fas fa-moon text-lg"></i>}
            </button>
          </li>

          {/* Profile */}
          <li className="relative group">
            <span className="text-gray-200 hover:text-purple-400 text-lg cursor-pointer">
              <i className="fas fa-user-circle"></i>
            </span>
            <div className="dropdown bg-gray-700 border border-gray-600 rounded-md absolute z-20 hidden group-hover:block top-full mt-2 right-0 min-w-[150px]">
              <Link to="/login" className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">Login</Link>
              <Link to="/register" className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">Register</Link>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">Settings</Link>
            </div>
          </li>
        </ul>

        {/* Sidebar for mobile */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-800 z-50 p-6 transform transition-transform duration-300 ease-in-out sm:hidden ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            onClick={() => setShowMenu(false)}
            className="absolute top-4 right-4 text-gray-300 text-xl focus:outline-none"
          >
            <i className="fas fa-times"></i>
          </button>

          <ul className="flex flex-col space-y-4 mt-10 text-white text-base font-medium">
            <li><Link to="/user/dashboard" className="hover:text-purple-400">Home</Link></li>
            <li><Link to="/user/dashboard/weatherModal" className="hover:text-purple-400">Weather</Link></li>

            {/* Local News */}
            <li>
              <details className="group">
                <summary className="cursor-pointer hover:text-purple-400">Local News</summary>
                <div className="ml-4 mt-2 space-y-1 text-sm">
                  {states.map(state => (
                    <Link key={state} to={`/user/dashboard/categorynewspage?state=${encodeURIComponent(state)}`} className="block hover:text-purple-400">
                      {state}
                    </Link>
                  ))}
                </div>
              </details>
            </li>

            {/* Categories */}
            <li>
              <details className="group">
                <summary className="cursor-pointer hover:text-purple-400">Categories</summary>
                <div className="ml-4 mt-2 space-y-1 text-sm">
                  {categories.map(cat => (
                    <Link key={cat} to={`/user/dashboard/categorynewspage?category=${encodeURIComponent(cat)}`} className="block hover:text-purple-400">
                      {cat}
                    </Link>
                  ))}
                </div>
              </details>
            </li>

            {/* Search */}
            <li>
              <div className="relative">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Search news..."
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
                />
                <i
                  onClick={handleSearch}
                  className="fa fa-search absolute right-3 top-3 text-gray-400 hover:text-purple-400 cursor-pointer"
                />
              </div>
            </li>

            <li><Link to="/user/dashboard/review" className="hover:text-purple-400">Review</Link></li>

            <li>
              <Link to="/user/dashboard/subscriptionpage" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition">
                Subscribe
              </Link>
            </li>

            <li>
              <button onClick={toggleTheme} className="text-gray-300 hover:text-purple-400">
                {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
              </button>
            </li>

            {/* Profile */}
            <li>
              <details className="group">
                <summary className="cursor-pointer hover:text-purple-400">Profile</summary>
                <div className="ml-4 mt-2 space-y-1 text-sm">
                  <Link to="/login" className="block hover:text-purple-400">Login</Link>
                  <Link to="/register" className="block hover:text-purple-400">Register</Link>
                  <Link to="/settings" className="block hover:text-purple-400">Settings</Link>
                </div>
              </details>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
