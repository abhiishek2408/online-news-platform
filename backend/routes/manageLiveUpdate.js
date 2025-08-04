// routes/liveUpdateRoutes.js
import express from 'express';
import LiveUpdate from '../Models/LiveUpdate.js';

const router = express.Router();

// GET all updates
router.get('/', async (req, res) => {
  try {
    const updates = await LiveUpdate.find().sort({ timestamp: -1 });
    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new update with input validation
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required and must be a non-empty string.' });
    }

    const update = new LiveUpdate({ message });
    await update.save();
    res.status(201).json(update);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update by ID with input validation
router.put('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'Update data cannot be empty.' });
    }

    const updated = await LiveUpdate.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE update by ID
router.delete('/:id', async (req, res) => {
  try {
    await LiveUpdate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
