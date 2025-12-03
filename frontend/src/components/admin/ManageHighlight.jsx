import AdminEntityManager from './AdminEntityManager';
const apiUrl = 'https://online-news-platform-backend.onrender.com/api/highlights';
const entityName = 'Highlight';
export default function ManageHighlight() {
  return <AdminEntityManager apiUrl={apiUrl} entityName={entityName} />;
}
