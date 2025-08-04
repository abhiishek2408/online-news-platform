import express from 'express';
import RecentNews from '../Models/RecentNews.js';

const router = express.Router();

// GET all recent news
router.get('/', async (req, res) => {
  try {
    const news = await RecentNews.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new recent news
router.post('/', async (req, res) => {
  try {
    const { title, image, category, date } = req.body;
    if (!title || !image || !category || !date) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const news = new RecentNews({ title, image, category, date });
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

    const news = await RecentNews.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by ID
router.delete('/:id', async (req, res) => {
  try {
    await RecentNews.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
