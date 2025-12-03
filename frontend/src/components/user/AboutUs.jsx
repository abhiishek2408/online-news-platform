import React, { useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';

const AboutUs = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-50'}`}>
      <div className={`max-w-3xl w-full rounded-3xl shadow-2xl p-10 border backdrop-blur-xl ${darkMode ? 'bg-gray-900/90 border-purple-800' : 'bg-white/90 border-purple-200'}`}>
        <div className="mb-8 text-center">
          <h1 className={`text-4xl font-extrabold mb-4 drop-shadow-sm bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-200' : 'bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400'}`}>About NewsAlpha</h1>
          <p className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Your trusted source for the latest news, insights, and stories from around the world.</p>
        </div>
        <div className={`space-y-6 text-base font-light ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <p>
            <span className={`font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>NewsAlpha</span> is dedicated to delivering accurate, timely, and engaging news to our readers. Our team of passionate journalists and editors work around the clock to bring you breaking headlines, in-depth analysis, and inspiring human stories.
          </p>
          <p>
            We believe in the power of information to shape opinions, drive change, and connect communities. Our platform covers a wide range of topics including politics, sports, entertainment, technology, lifestyle, and more.
          </p>
          <p>
            <span className={`font-semibold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>Why choose NewsAlpha?</span>
            <ul className="list-disc ml-6 mt-2">
              <li>Real-time updates and live coverage</li>
              <li>Expert opinions and editorial insights</li>
              <li>User-friendly experience with modern design</li>
              <li>Commitment to truth, transparency, and ethics</li>
            </ul>
          </p>
          <p>
            <span className={`font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Join our community</span> and stay informed with NewsAlpha. We value your feedback and strive to improve every day. Thank you for making us your go-to news destination!
          </p>
        </div>
        <div className="mt-10 text-center">
          <span className={`inline-block px-6 py-2 rounded-full font-bold shadow-md ${darkMode ? 'bg-gradient-to-r from-purple-800 to-pink-800 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>Contact: contact@newsalpha.com</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
