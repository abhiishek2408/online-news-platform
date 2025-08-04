import express from 'express';
import News from '../Models/SpecialNews.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const newsList = await News.find({ isActive: true })
      .sort({ publishedAt: -1 })
      .limit(5);
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: 'News not found' });

    res.json(newsItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.patch('/:id/view', async (req, res) => {
  try {
    const newsItem = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!newsItem) return res.status(404).json({ message: 'News not found' });

    res.json({ message: 'View count incremented', views: newsItem.views });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.patch('/:id/like', async (req, res) => {
  try {
    const newsItem = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!newsItem) return res.status(404).json({ message: 'News not found' });

    res.json({ message: 'Like count incremented', likes: newsItem.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/:id/comment', async (req, res) => {
  const { name, comment } = req.body;

  if (!name || !comment) {
    return res.status(400).json({ message: 'Name and comment are required' });
  }

  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: 'News not found' });

    newsItem.comments.push({ name, comment });
    await newsItem.save();

    res.status(201).json({ message: 'Comment added', comments: newsItem.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id/comments', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id, 'comments');
    if (!newsItem) return res.status(404).json({ message: 'News not found' });

    res.json(newsItem.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
