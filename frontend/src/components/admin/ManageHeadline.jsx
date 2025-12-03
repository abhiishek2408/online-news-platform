import AdminEntityManager from './AdminEntityManager';
const apiUrl = 'https://online-news-platform-backend.onrender.com/api/headlines';
const entityName = 'Headline';
export default function ManageHeadline() {
  return <AdminEntityManager apiUrl={apiUrl} entityName={entityName} />;
}
