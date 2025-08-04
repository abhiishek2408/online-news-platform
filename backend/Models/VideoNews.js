import mongoose from 'mongoose';

const videoNewsSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  source: String,
  postedAgo: String,
  likes: Number,
  comments: Number,
  videoUrl: String
});

export default mongoose.model('VideoNews', videoNewsSchema);
