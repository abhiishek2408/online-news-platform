import React, { Suspense, lazy } from 'react';
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
const AllHighlightsPage = lazy(() => import('./components/user/AllHighlightsPage'));
const AllLatestNewsPage = lazy(() => import('./components/user/AllLatestNewsPage'));
const WeatherPage = lazy(() => import('./components/user/WeatherPage'));
const SubscriptionPage = lazy(() => import('./components/user/SubscriptionPage'));
const CategoryNewsPage = lazy(() => import('./components/user/CategoryNewsPage'));

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
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
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
                <Route path="allhighlightnews" element={<AllHighlightsPage />} />
                <Route path="all-latestnews" element={<AllLatestNewsPage />} />
                <Route path="weatherModal" element={<WeatherPage />} />
                <Route path="categorynewspage" element={<CategoryNewsPage />} />
                <Route path="subscriptionpage" element={<SubscriptionPage />} />
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
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
