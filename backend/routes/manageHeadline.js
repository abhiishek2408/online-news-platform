import express from 'express';
import Headline from '../Models/Headline.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const headline = new Headline(req.body);
    await headline.save();
    res.status(201).json(headline);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const headlines = await Headline.find().sort({ updated_at: -1 });
  res.json(headlines);
});

router.put('/:id', async (req, res) => {
  const updated = await Headline.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Headline.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

export default router;
