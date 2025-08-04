
import mongoose from 'mongoose';
import Poll from '../Models/Poll.js';

const MONGODB_URI = "mongodb://localhost:27017/news_portal";

async function updateExistingPolls() {
  await Poll.updateMany(
    { isArchived: { $exists: false } },
    { $set: { isArchived: false } }
  );
  console.log(" Polls updated with isArchived field.");
  mongoose.disconnect();
}

updateExistingPolls();
