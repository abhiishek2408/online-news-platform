import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '#',
  },
  category: {
    type: String,
    enum: [
      'Technology',
      'Politics',
      'Health',
      'Science',
      'Business',
      'Entertainment',
      'Sports',
      'Other',
    ],
    default: 'Other',
  },
  tags: {
    type: [String],
    default: [],
  },
  author: {
    type: String,
    default: 'Unknown',
  },
  source: {
    type: String,
    default: 'Internal',
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  seoMeta: {
    title: String,
    description: String,
    keywords: [String],
  },
  comments: [
    {
      name: String,
      comment: String,
      commentedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model('SpecialNews', newsSchema);
