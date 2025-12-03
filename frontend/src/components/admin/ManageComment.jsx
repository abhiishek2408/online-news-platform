import AdminEntityManager from './AdminEntityManager';
const apiUrl = 'https://online-news-platform-backend.onrender.com/api/comments';
const entityName = 'Comment';
export default function ManageComment() {
  return <AdminEntityManager apiUrl={apiUrl} entityName={entityName} />;
}
