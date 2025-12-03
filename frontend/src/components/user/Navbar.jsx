import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './Context/ThemeContext';
import { SearchContext } from './Context/SearchContext';
import './Navbar.css';

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { keyword, setKeyword, handleSearch } = useContext(SearchContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

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

      <nav className="navbar bg-gray-900 border-b border-gray-800 py-4 px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between w-full relative z-50">
        {/* Logo and Hamburger */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <div className="logo flex items-center text-2xl font-bold text-white">
            <span className="text-3xl mr-2">🌐</span>
            <span className="logo-font tracking-tight">News</span>
            <span className="logo-font text-purple-400 ml-1">Alpha</span>
          </div>

          <button
            onClick={() => setShowMenu(true)}
            className="sm:hidden text-gray-200 focus:outline-none text-2xl"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Desktop Menu */}
      <ul className="hidden sm:flex flex-row space-x-6 text-sm sm:text-base font-medium text-gray-200 items-center">

          <li><Link to="/user/dashboard" className="hover:text-purple-400 underline-offset-4 hover:underline transition-all">Home</Link></li>
          <li><Link to="/user/dashboard/weatherModal" className="hover:text-purple-400 underline-offset-4 hover:underline transition-all">Weather</Link></li>

          {/* Local News Dropdown */}
          <li className="relative group">
            <button className="hover:text-purple-400 flex items-center">
              Local News
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="dropdown absolute z-20 bg-gray-900 border border-gray-700 rounded-md grid grid-cols-2 gap-y-1 gap-x-6 p-3 mt-2 min-w-[400px] max-h-[400px] overflow-y-auto hidden group-hover:grid group-focus-within:grid sm:left-1/2 sm:-translate-x-1/2 shadow-lg">
              {states.map((state) => (
                <Link key={state} to={`/user/dashboard/categorynewspage?state=${encodeURIComponent(state)}`}
                  className="px-3 py-1.5 hover:bg-gray-800 text-sm rounded-md transition-all">
                  {state}
                </Link>
              ))}
            </div>
          </li>

          {/* Categories Dropdown with hover delay */}
          <li className="relative" onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setTimeout(() => setShowCategories(false), 200)}>
            <button className="hover:text-purple-400 flex items-center">
              Categories
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showCategories && (
              <div className="dropdown bg-gray-900 border border-gray-700 rounded-md absolute z-20 top-full mt-2 min-w-[200px] shadow-lg">
                {categories.map((cat) => (
                  <Link key={cat} to={`/user/dashboard/categorynewspage?category=${encodeURIComponent(cat)}`}
                    className="block px-4 py-2 hover:bg-gray-800 text-sm rounded-md transition-all">
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </li>

          {/* Search */}
          <li>
            <div className="navbar-searchbox">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search news, topics, authors..."
                autoComplete="off"
              />
              <i
                onClick={handleSearch}
                className="fa fa-search"
                title="Search"
              />
            </div>
          </li>

          <li><Link to="/user/dashboard/review" className="hover:text-purple-400 underline-offset-4 hover:underline transition-all">Review</Link></li>

          <li>
            <Link to="/user/dashboard/subscriptionpage" className="bg-purple-700 text-white py-1.5 px-5 rounded-full font-semibold hover:bg-purple-800 transition-all">
              Subscribe
            </Link>
          </li>

          <li>
            <button onClick={toggleTheme} className="text-gray-300 hover:text-purple-400 transition-all text-xl px-2" title="Toggle theme">
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
          </li>

          {/* Profile */}
          <li className="relative group">
            {/* Profile dropdown removed for user: no login/logout/register/settings */}
          </li>
        </ul>

        {/* Sidebar for mobile */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 border-l border-gray-800 z-50 p-6 transform transition-transform duration-300 ease-in-out sm:hidden ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            onClick={() => setShowMenu(false)}
            className="absolute top-4 right-4 text-gray-300 text-xl focus:outline-none"
          >
            <i className="fas fa-times"></i>
          </button>

          <ul className="flex flex-col space-y-4 mt-10 text-gray-100 text-base font-semibold">
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
              <div className="navbar-searchbox">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Search news, topics, authors..."
                  autoComplete="off"
                />
                <i
                  onClick={handleSearch}
                  className="fa fa-search"
                  title="Search"
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
            {/* Profile dropdown removed for user: no login/logout/register/settings */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
