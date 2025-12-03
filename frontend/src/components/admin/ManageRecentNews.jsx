import AdminEntityManager from './AdminEntityManager';
const apiUrl = 'https://online-news-platform-backend.onrender.com/api/recentnews';
const entityName = 'RecentNews';
export default function ManageRecentNews() {
  return <AdminEntityManager apiUrl={apiUrl} entityName={entityName} />;
}
