import React, { useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';

const HelpPage = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50'}`}>
      <div className={`max-w-2xl w-full rounded-3xl shadow-2xl p-10 border backdrop-blur-xl ${darkMode ? 'bg-gray-900/90 border-purple-800' : 'bg-white/90 border-purple-200'}`}>
        <div className="mb-8 text-center">
          <h1 className={`text-3xl font-extrabold mb-4 drop-shadow-sm bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-200' : 'bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400'}`}>Help Center</h1>
          <p className={`text-base font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Find answers to common questions and get support for NewsAlpha.</p>
        </div>
        <div className={`space-y-6 text-base font-light ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <div>
            <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>Frequently Asked Questions</h2>
            <ul className="list-disc ml-6">
              <li>How do I subscribe to NewsAlpha updates?</li>
              <li>Where can I find the latest headlines?</li>
              <li>How do I contact support?</li>
              <li>How do I change my theme?</li>
              <li>How do I submit feedback or report a problem?</li>
            </ul>
          </div>
          <div>
            <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>Contact Support</h2>
            <p>If you need further assistance, please email us at <span className="font-semibold">support@newsalpha.com</span> or use the contact form on our About Us page.</p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <span className={`inline-block px-6 py-2 rounded-full font-bold shadow-md ${darkMode ? 'bg-gradient-to-r from-purple-800 to-pink-800 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>We're here to help you 24/7!</span>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
