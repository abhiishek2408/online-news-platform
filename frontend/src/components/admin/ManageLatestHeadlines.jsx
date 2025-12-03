import AdminEntityManager from './AdminEntityManager';
const apiUrl = 'https://online-news-platform-backend.onrender.com/api/latestheadlines';
const entityName = 'LatestHeadline';
export default function ManageLatestHeadlines() {
  return <AdminEntityManager apiUrl={apiUrl} entityName={entityName} />;
}
