import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { SearchContext } from '../../context/SearchContext';
import './Navbar.css';


const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { keyword, setKeyword, handleSearch } = useContext(SearchContext);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  return (
    <nav className="navbar bg-gray-800 py-6 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between w-full rounded-none">

      <div className="logo flex items-center text-3xl font-bold text-white mb-4 md:mb-0">
        <span className="text-purple-400 text-3xl mr-2">🌐</span>
        <span className="logo-font">News</span>
        <span className="logo-font text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-400">Alpha</span>
      </div>

      <ul className="main-menu flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center text-sm md:text-base font-medium text-gray-200 font-thin">

        <li>
          <Link to="/user/dashboard" className="hover:text-purple-400 px-2 py-2 rounded-md transition duration-150 ease-in-out">Home</Link>
        </li>
        <li>
          <Link to="/user/dashboard/weatherModal" className="hover:text-purple-400 px-2 py-2 rounded-md transition duration-150 ease-in-out">Weather</Link>
        </li>

        {/* Local News Dropdown */}
        <li className="relative group">
          <span className="hover:text-purple-400 px-2 py-2 rounded-md flex items-center cursor-pointer transition duration-150 ease-in-out">
            Local News
            <svg className="ml-1 w-4 h-4 text-gray-200 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>

          <div className="dropdown bg-gray-700 rounded-md border border-gray-600 grid grid-cols-2 gap-y-1 gap-x-8 p-3 absolute z-20 hidden group-hover:grid left-1/2 -translate-x-1/2 min-w-[350px] top-full mt-2 max-h-[310px] overflow-y-auto">
            {[
              "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu Kashmir", "Jharkhand",
              "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Uttar Pradesh", "Uttarakhand", "West Bengal"
            ].map((state) => (
              <Link
                key={state}
                to={`/user/dashboard/categorynewspage?state=${encodeURIComponent(state)}`}
                className="px-3 py-1.5 hover:bg-gray-600 hover:text-purple-400 text-sm rounded-md transition duration-150">
                {state}
              </Link>
            ))}
          </div>
        </li>

        {/* Categories Dropdown */}
        <li className="relative group">
          <span className="hover:text-purple-400 px-2 py-2 rounded-md flex items-center cursor-pointer transition duration-150 ease-in-out">
            Categories
            <svg className="ml-1 w-4 h-4 text-gray-200 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
          <div className="dropdown bg-gray-700 border border-gray-600 rounded-md absolute z-20 hidden group-hover:block top-full mt-2 left-1/2 -translate-x-1/2 min-w-[150px]">
            {[
              "Religion", "LifeStyle", "Election", "Sports", "Quiz", "Facts", "Weather News", "Articles", "Editorial"
            ].map((category) =>
             
                <Link key={category} to={`/user/dashboard/categorynewspage?category=${encodeURIComponent(category)}`} className="block px-4 py-2 hover:bg-gray-600 hover:text-purple-400 text-sm transition">
                  {category}
                </Link>
              
            )}
          </div>
        </li>

        {/* Search */}
        <li className="flex items-center space-x-2 ml-4">
          <div className="search-box relative">
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

        {/* Subscribe */}
        <li>
          <Link to="/user/dashboard/subscriptionpage" className="bg-purple-600 text-white py-1.5 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200">
            Subscribe
          </Link>
        </li>

        <li className="ml-4">
      <button
        onClick={toggleTheme}
        className="text-gray-800 dark:text-gray-200 hover:text-purple-400 transition"
        title="Toggle theme"
      >
        {darkMode ? (
          <i className="fas fa-sun text-lg"></i>
        ) : (
          <i className="fas fa-moon text-lg"></i>
        )}
      </button>
    </li>

        {/* Profile (hidden by default) */}
        <li className="relative group ml-4">
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
    </nav>
  );
};

export default Navbar;
