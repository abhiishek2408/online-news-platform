import express from 'express';
import Highlight from '../Models/Highlight.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await Highlight.find();
  res.json(data);
});

router.post('/', async (req, res) => {
  const highlight = new Highlight(req.body);
  await highlight.save();
  res.status(201).json(highlight);
});

router.put('/:id', async (req, res) => {
  const updated = await Highlight.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Highlight.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

// Like endpoint
router.post('/:id/like', async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    if (!highlight) {
      return res.status(404).json({ message: 'Highlight not found' });
    }
    highlight.likes = (highlight.likes || 0) + 1;
    await highlight.save();
    res.json({ likes: highlight.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error updating likes', error: error.message });
  }
});

export default router;
