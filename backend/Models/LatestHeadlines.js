import mongoose from 'mongoose';

const LatestHeadlinesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headline: { type: String },
  description: { type: String },
  content: { type: String },
  image: { type: String },
  link: { type: String },
  author: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  isArchived: { type: Boolean, default: false },
  publishedAt: { type: Date },
  published_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  // Location support
  country: { type: String, required: true },
  state: { type: String },

  // Like support
  likes: { type: Number, default: 0 }
});

// Auto-update `updated_at` on save
LatestHeadlinesSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model('LatestHeadlines', LatestHeadlinesSchema);
