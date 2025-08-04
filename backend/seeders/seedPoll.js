
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Poll from '../Models/Poll.js';

dotenv.config(); // If using .env for DB_URI

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/news_portal';

const polls = [
  {
    pollQuestion: "What is your favorite programming language?",
    options: ["JavaScript", "Python", "Java", "C++"],
    votes: [0, 0, 0, 0],
  },
  {
    pollQuestion: "Which frontend framework do you prefer?",
    options: ["React", "Vue", "Angular", "Svelte"],
    votes: [0, 0, 0, 0],
  },
  {
    pollQuestion: "How often do you read news online?",
    options: ["Daily", "Weekly", "Occasionally", "Never"],
    votes: [0, 0, 0, 0],
  },
  {
    pollQuestion: "Do you prefer light mode or dark mode?",
    options: ["Light Mode", "Dark Mode", "Both", "Don't Care"],
    votes: [0, 0, 0, 0],
  },
  {
    pollQuestion: "What type of news do you follow the most?",
    options: ["Politics", "Technology", "Sports", "Entertainment"],
    votes: [0, 0, 0, 0],
  }
];

async function seedPolls() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected.");

    await Poll.deleteMany(); // Clear existing
    console.log("Old polls deleted.");

    await Poll.insertMany(polls);
    console.log("5 polls seeded successfully.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedPolls();
