import AdminEntityManager from './AdminEntityManager';
const apiUrl = 'https://online-news-platform-backend.onrender.com/api/liveupdates';
const entityName = 'LiveUpdate';
export default function ManageLiveUpdate() {
  return <AdminEntityManager apiUrl={apiUrl} entityName={entityName} />;
}
