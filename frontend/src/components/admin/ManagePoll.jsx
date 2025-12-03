import AdminEntityManager from './AdminEntityManager';
const apiUrl = 'https://online-news-platform-backend.onrender.com/api/polls';
const entityName = 'Poll';
export default function ManagePoll() {
  return <AdminEntityManager apiUrl={apiUrl} entityName={entityName} />;
}
