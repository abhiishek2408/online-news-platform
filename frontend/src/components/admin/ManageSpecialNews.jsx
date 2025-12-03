import AdminEntityManager from './AdminEntityManager';
const apiUrl = 'https://online-news-platform-backend.onrender.com/api/specialnews';
const entityName = 'SpecialNews';
export default function ManageSpecialNews() {
  return <AdminEntityManager apiUrl={apiUrl} entityName={entityName} />;
}
