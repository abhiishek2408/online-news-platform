import mongoose from 'mongoose';

const HeadlineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headline: { type: String, required: true },
  description: { type: String },
  content: { type: String },
  image: { type: String },
  link: { type: String },
  author: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  isArchived: { type: Boolean, default: false },
  publishedAt: { type: Date },
  published_at: { type: Date },
  updated_at: { type: Date, default: Date.now },
  country: { type: String, required: true },
  state: { type: String },
  likes: { type: Number, default: 0 }
});

HeadlineSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model('Headline', HeadlineSchema);
