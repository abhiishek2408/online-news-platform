import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from './Context/SearchContext';

const UserDashboard = () => {
  return (
  <SearchProvider>
  <div>     
    <Navbar/>
    <main className="px-4 py-6">
    <Outlet />
    </main>
    <Footer/>
    </div>
  </SearchProvider>  
  );
};

export default UserDashboard;
