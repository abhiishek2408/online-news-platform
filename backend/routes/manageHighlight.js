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

export default router;
