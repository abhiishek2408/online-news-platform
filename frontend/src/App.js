import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import { ThemeProvider } from './components/user/Context/ThemeContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Lazy loaded components
const Login = lazy(() => import('./Auth/Login'));
const Register = lazy(() => import('./Auth/Register'));
const UserDashboard = lazy(() => import('./components/user/UserDashboard'));
const HomePage = lazy(() => import('./components/user/HomePage'));
const HighlightViewPage = lazy(() => import('./components/user/HighlightViewPage'));
const LatestNewsViewPage = lazy(() => import('./components/user/LatestNewsViewPage'));
const RecentHeadlineViewPage = lazy(() => import('./components/user/RecentHeadlineViewPage'));
const AllHighlightsPage = lazy(() => import('./components/user/AllHighlightsPage'));
const AllLatestNewsPage = lazy(() => import('./components/user/AllLatestNewsPage'));
const AllRecentHeadlinesPage = lazy(() => import('./components/user/AllRecentHeadlinesPage'));
const WeatherPage = lazy(() => import('./components/user/WeatherPage'));
const SubscriptionPage = lazy(() => import('./components/user/SubscriptionPage'));
const CategoryNewsPage = lazy(() => import('./components/user/CategoryNewsPage'));
const ReviewForm = lazy(() => import('./components/user/ReviewForm'));
const AboutUs = lazy(() => import('./components/user/AboutUs'));
const HelpPage = lazy(() => import('./components/user/HelpPage'));
const PrivacyPolicy = lazy(() => import('./components/user/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/user/TermsOfService'));
const CookiePolicy = lazy(() => import('./components/user/CookiePolicy'));
const Disclaimer = lazy(() => import('./components/user/Disclaimer'));

const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const HomepageAdmin = lazy(() => import('./components/admin/Homepage'));
const HighlightAdmin = lazy(() => import('./components/admin/Highlight'));
const HeadlineAdmin = lazy(() => import('./components/admin/Headline'));
const LatestHeadlinesAdmin = lazy(() => import('./components/admin/LatestHeadlines'));
const LiveUpdateAdmin = lazy(() => import('./components/admin/LiveUpdates'));
const PollAdmin = lazy(() => import('./components/admin/PollManager'));
const RecentNewsAdmin = lazy(() => import('./components/admin/RecentNews'));
const SpecialNewsAdmin = lazy(() => import('./components/admin/SpecialNews'));
const CommentAdmin = lazy(() => import('./components/admin/Comment'));
const UserAdmin = lazy(() => import('./components/admin/ManageUsers'));

function App() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          {showCookieBanner && (
            <div className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-center bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400 text-white p-4 shadow-lg animate-fade-in">
              <div className="max-w-2xl w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm font-medium">We use cookies to improve your experience. By using NewsAlpha, you accept our <a href='/user/dashboard/cookie-policy' className='underline font-semibold'>Cookie Policy</a>.</span>
                <button
                  onClick={handleAcceptCookies}
                  className="px-6 py-2 rounded-full bg-white text-purple-700 font-bold shadow-md hover:bg-purple-100 transition-all"
                >
                  Accept
                </button>
              </div>
            </div>
          )}
          <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={<UserDashboard />}>
                <Route index element={<HomePage />} />
              </Route>

              <Route path="/user/dashboard" element={<UserDashboard />}>
                <Route index element={<HomePage />} />
                <Route path="articleviewpage" element={<HighlightViewPage />} />
                <Route path="latestnewsview" element={<LatestNewsViewPage />} />
                <Route path="headlineview" element={<RecentHeadlineViewPage />} />
                <Route path="allhighlightnews" element={<AllHighlightsPage />} />
                <Route path="all-latestnews" element={<AllLatestNewsPage />} />
                <Route path="all-headlines" element={<AllRecentHeadlinesPage />} />
                <Route path="weatherModal" element={<WeatherPage />} />
                <Route path="categorynewspage" element={<CategoryNewsPage />} />
                <Route path="subscriptionpage" element={<SubscriptionPage />} />
                <Route path="review" element={<ReviewForm />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="help" element={<HelpPage />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="cookie-policy" element={<CookiePolicy />} />
                <Route path="disclaimer" element={<Disclaimer />} />
              </Route>

              <Route path="/admin/dashboard" element={<AdminDashboard />}>
                <Route index element={<HomepageAdmin />} />
                <Route path="managehighlight" element={<HighlightAdmin />} />
                <Route path="manageheadline" element={<HeadlineAdmin />} />
                <Route path="manage-latestheadlines" element={<LatestHeadlinesAdmin />} />
                <Route path="manageliveupdate" element={<LiveUpdateAdmin />} />
                <Route path="managecomment" element={<CommentAdmin />} />
                <Route path="managepoll" element={<PollAdmin />} />
                <Route path="managerecentnews" element={<RecentNewsAdmin />} />
                <Route path="managespecialnews" element={<SpecialNewsAdmin />} />
                <Route path="manage-users" element={<UserAdmin />} />
              </Route>

              {/* /about route only inside UserDashboard outlet */}
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
