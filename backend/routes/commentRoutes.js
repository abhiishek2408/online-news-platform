// const express = require("express");
// const router = express.Router();
// const Comment = require("../Models/Comment");

// router.post("/", async (req, res) => {
//   try {
//     const { name, rating, comment } = req.body;

//     if (!name || !rating || !comment) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newComment = new Comment({ name, rating, comment });
//     await newComment.save();

//     res.status(201).json({ message: "Comment added successfully", comment: newComment });
//   } catch (error) {
//     console.error("Error saving comment:", error);
//     res.status(500).json({ message: "Error saving comment", error });
//   }
// });

// module.exports = router;


import express from 'express';
import Comment from '../Models/Comment.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newComment = new Comment({ name, rating, comment });
    await newComment.save();

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ message: 'Error saving comment', error });
  }
});

export default router;
