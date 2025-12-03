import React, { useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from './Context/SearchContext';

const UserDashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <SearchProvider>
      <div className={darkMode ? 'bg-gray-900 min-h-screen text-white' : 'bg-white min-h-screen text-gray-900'}>
        <Navbar />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SearchProvider>
  );
};

export default UserDashboard;
