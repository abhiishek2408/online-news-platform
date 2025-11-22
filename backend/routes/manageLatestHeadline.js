
// routes/manageLatestHeadline.js
import express from 'express';
import LatestHeadlines from '../Models/LatestHeadlines.js';

const router = express.Router();

// GET all latest headlines
router.get('/', async (req, res) => {
  try {
    const headlines = await LatestHeadlines.find().sort({ updated_at: -1 });
    res.json(headlines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new headline
router.post('/', async (req, res) => {
  try {
    const newHeadline = new LatestHeadlines(req.body);
    await newHeadline.save();
    res.status(201).json(newHeadline);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update headline by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedHeadline = await LatestHeadlines.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHeadline);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE headline by ID
router.delete('/:id', async (req, res) => {
  try {
    await LatestHeadlines.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST like a headline by ID
router.post('/:id/like', async (req, res) => {
  try {
    const headline = await LatestHeadlines.findById(req.params.id);
    if (!headline) {
      return res.status(404).json({ error: 'Headline not found' });
    }
    headline.likes = (headline.likes || 0) + 1;
    await headline.save();
    res.json({ likes: headline.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
