import mongoose from 'mongoose';

const recentNewsSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
  date: String    
});

export default mongoose.model('RecentNews', recentNewsSchema);
