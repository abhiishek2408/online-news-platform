// // routes/pollRoutes.js
// const express = require("express");
// const router = express.Router();
// const Poll = require("../Models/Poll");

// // Create Poll
// router.post("/create", async (req, res) => {
//   const { pollQuestion, options } = req.body;
//   if (!pollQuestion || options.length !== 4) {
//     return res.status(400).json({ message: "Invalid poll data." });
//   }

//   try {
//     const newPoll = new Poll({ pollQuestion, options, votes: [0, 0, 0, 0] });
//     await newPoll.save();
//     res.status(201).json(newPoll);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating poll", error: err });
//   }
// });

// // Get Latest Poll
// router.get("/latest", async (req, res) => {
//   try {
//     const poll = await Poll.findOne().sort({ _id: -1 });
//     res.json(poll);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching poll", error: err });
//   }
// });

// // Vote
// router.post("/vote/:id", async (req, res) => {
//   const { optionIndex } = req.body;
//   try {
//     const poll = await Poll.findById(req.params.id);
//     if (poll && poll.votes[optionIndex] !== undefined) {
//       poll.votes[optionIndex] += 1;
//       await poll.save();
//       res.json(poll);
//     } else {
//       res.status(404).json({ message: "Poll or option not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error voting", error: err });
//   }
// });

// module.exports = router;





import express from 'express';
import Poll from '../Models/Poll.js';

const router = express.Router();

// Create Poll
router.post('/create', async (req, res) => {
  const { pollQuestion, options } = req.body;
  if (!pollQuestion || !Array.isArray(options) || options.length !== 4) {
    return res.status(400).json({ message: 'Invalid poll data.' });
  }

  try {
    const newPoll = new Poll({
      pollQuestion,
      options,
      votes: [0, 0, 0, 0]
    });
    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (err) {
    res.status(500).json({ message: 'Error creating poll', error: err });
  }
});

// Get Latest Poll
router.get('/latest', async (req, res) => {
  try {
    const poll = await Poll.findOne({ isArchived: false });
    res.json(poll);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching poll', error: err });
  }
});

// Vote
router.post('/vote/:id', async (req, res) => {
  const { optionIndex } = req.body;
  try {
    const poll = await Poll.findById(req.params.id);
    if (poll && poll.votes[optionIndex] !== undefined) {
      poll.votes[optionIndex] += 1;
      await poll.save();
      res.json(poll);
    } else {
      res.status(404).json({ message: 'Poll or option not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error voting', error: err });
  }
});

export default router;
