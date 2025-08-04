// routes/specialNewsRoutes.js
import express from 'express';
import SpecialNews from '../Models/SpecialNews.js';

const router = express.Router();

// GET all special news
router.get('/', async (req, res) => {
  try {
    const news = await SpecialNews.find().sort({ publishedAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new special news
router.post('/', async (req, res) => {
  try {
    const { title, description, content, slug, image, link, category, tags, author, source, isFeatured, isActive, seoMeta } = req.body;
    if (!title || !description || !content) {
      return res.status(400).json({ error: 'Title, description, and content are required.' });
    }

    const news = new SpecialNews({
      title,
      description,
      content,
      slug,
      image,
      link,
      category,
      tags,
      author,
      source,
      isFeatured,
      isActive,
      seoMeta
    });

    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update by ID
router.put('/:id', async (req, res) => {
  try {
    const update = req.body;
    if (!update || Object.keys(update).length === 0) {
      return res.status(400).json({ error: 'Update data is required.' });
    }

    const news = await SpecialNews.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by ID
router.delete('/:id', async (req, res) => {
  try {
    await SpecialNews.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;