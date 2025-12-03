import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10" style={{ fontFamily: 'Lato, sans-serif' }}>
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* User Info */}
        <div id="user-info-profile" className="mb-6 text-sm font-light">
          <p id="user-name-profile" className="text-base"></p>
          <p id="user-email-profile" className="text-gray-400"></p>
        </div>

        {/* Main Content - Horizontal Scroll or Wrap */}
        <div className="flex flex-row flex-wrap sm:flex-nowrap overflow-x-auto w-full justify-between gap-6 mb-8 text-sm font-light ml-10 md:ml-0">

          {/* Contact Us */}
          <div className="min-w-[200px] flex-1 text-left sm:text-center">
            <h3 className="text-base font-semibold text-white mb-1">Contact Us</h3>
            <p>Email: <a href="mailto:contact@tagdiv.com" className="text-purple-400 hover:text-purple-300 transition">contact@tagdiv.com</a></p>
            <p>Phone: +1234567890</p>
            <p>Address: 123 Street, City, Country</p>
          </div>

          {/* Quick Links - Only essential */}
          <div className="min-w-[200px] flex-1 text-left sm:text-center">
            <h3 className="text-base font-semibold text-white mb-1">Quick Links</h3>
            <ul className="space-y-1 text-gray-300">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/user/dashboard/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/user/dashboard/review" className="hover:text-white transition">Review</Link></li>
            </ul>
          </div>

          {/* Support - Only Help Center */}
          <div className="min-w-[200px] flex-1 text-left sm:text-center">
            <h3 className="text-base font-semibold text-white mb-1">Support</h3>
            <ul className="space-y-1 text-gray-300">
              <li><Link to="/user/dashboard/help" className="hover:text-white transition">Help Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="min-w-[200px] flex-1 text-left sm:text-center">
            <h3 className="text-base font-semibold text-white mb-1">Legal</h3>
            <ul className="space-y-1 text-gray-300">
              <li><Link to="/user/dashboard/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/user/dashboard/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/user/dashboard/cookie-policy" className="hover:text-white transition">Cookie Policy</Link></li>
              <li><Link to="/user/dashboard/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Links - Removed unnecessary */}

        {/* Footer Bottom - Only copyright */}
        <div className="text-center text-xs text-gray-400 font-light space-y-1">
          <p>© 2025 NewsAlpha.com | Passionately crafted by NewsAlphaTeam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
