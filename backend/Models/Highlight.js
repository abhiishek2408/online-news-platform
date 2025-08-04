
import mongoose from 'mongoose';

const HighlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  highlight: { type: String },
  description: { type: String },
  content: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  author: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  isArchived: { type: Boolean, default: false },
  publishedAt: { type: Date, required: true },
  published_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  // ➕ New fields
  country: { type: String, required: true },
  state: { type: String }
});

// Auto-update `updated_at` on every save
HighlightSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model('Highlight', HighlightSchema);
