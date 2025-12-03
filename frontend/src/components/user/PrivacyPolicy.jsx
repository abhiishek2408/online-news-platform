import React, { useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';

const PrivacyPolicy = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50'}`}>
      <div className={`max-w-2xl w-full rounded-3xl shadow-2xl p-10 border backdrop-blur-xl ${darkMode ? 'bg-gray-900/90 border-purple-800' : 'bg-white/90 border-purple-200'}`}>
        <h1 className={`text-3xl font-extrabold mb-6 drop-shadow-sm bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-200' : 'bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400'}`}>Privacy Policy</h1>
        <div className={`space-y-6 text-base font-light ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <p>Your privacy is important to us. This policy explains how NewsAlpha collects, uses, and protects your personal information.</p>
          <ul className="list-disc ml-6">
            <li>We do not share your personal data with third parties except as required by law.</li>
            <li>We use cookies to improve your experience and analyze site traffic.</li>
            <li>You can contact us to request deletion or correction of your data.</li>
          </ul>
          <p>For any questions, email <span className="font-semibold">privacy@newsalpha.com</span>.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
