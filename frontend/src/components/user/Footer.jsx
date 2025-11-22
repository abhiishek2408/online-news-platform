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

          {/* Quick Links */}
          <div className="min-w-[200px] flex-1 text-left sm:text-center">
            <h3 className="text-base font-semibold text-white mb-1">Quick Links</h3>
            <ul className="space-y-1 text-gray-300">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link to="/news" className="hover:text-white transition">News</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="min-w-[200px] flex-1 text-left sm:text-center">
            <h3 className="text-base font-semibold text-white mb-1">Support</h3>
            <ul className="space-y-1 text-gray-300">
              <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
              <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
              <li><Link to="/report" className="hover:text-white transition">Report a Problem</Link></li>
              <li><Link to="/chat" className="hover:text-white transition">Live Chat</Link></li>
              <li><Link to="/forum" className="hover:text-white transition">Community Forum</Link></li>
              <li><Link to="/user/dashboard/review" className="hover:text-white transition">Review</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="min-w-[200px] flex-1 text-left sm:text-center">
            <h3 className="text-base font-semibold text-white mb-1">Legal</h3>
            <ul className="space-y-1 text-gray-300">
              <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center flex-wrap space-x-6 mb-6 text-xl text-gray-300">
          <Link to="#" className="hover:text-purple-500 transition"><i className="fab fa-facebook"></i></Link>
          <Link to="#" className="hover:text-pink-400 transition"><i className="fab fa-instagram"></i></Link>
          <Link to="#" className="hover:text-sky-400 transition"><i className="fab fa-twitter"></i></Link>
          <Link to="#" className="hover:text-red-600 transition"><i className="fab fa-youtube"></i></Link>
          <Link to="#" className="hover:text-green-400 transition"><i className="fab fa-whatsapp"></i></Link>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-xs text-gray-400 font-light space-y-1">
          <p className="tracking-wide">HOME | BLOG | FORUMS | ABOUT US | SUPPORT | POLICY | PRIVACY</p>
          <p>© 2025 NewsAlpha.com | Passionately crafted with by NewsAlphaTeam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
