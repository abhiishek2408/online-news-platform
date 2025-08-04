// routes/pollRoutes.js
import express from 'express';
import Poll from '../Models/Poll.js';

const router = express.Router();

// GET all polls
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new poll with validation
router.post('/', async (req, res) => {
  try {
    const { pollQuestion, options } = req.body;
    if (!pollQuestion || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: 'Poll question and at least two options are required.' });
    }

    const newPoll = new Poll({
      pollQuestion,
      options,
      votes: Array(options.length).fill(0)
    });

    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update poll by ID
router.put('/:id', async (req, res) => {
  try {
    const { pollQuestion, options, votes } = req.body;
    const updatedPoll = await Poll.findByIdAndUpdate(
      req.params.id,
      { pollQuestion, options, votes },
      { new: true }
    );
    res.json(updatedPoll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE poll by ID
router.delete('/:id', async (req, res) => {
  try {
    await Poll.findByIdAndDelete(req.params.id);
    res.json({ message: 'Poll deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
