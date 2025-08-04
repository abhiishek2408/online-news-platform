const mongoose = require("mongoose");
const Comment = require("../Models/Comment");

const seedComments = [
  {
    name: "Alice",
    rating: 5,
    comment: "EVs are the future! 🌱",
  },
  {
    name: "Bob",
    rating: 4,
    comment: "Only if charging stations increase.",
  },
  {
    name: "Charlie",
    rating: 3,
    comment: "Neutral opinion, depends on location.",
  },
];

async function seedDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/news_portal");

    await Comment.deleteMany({});
    await Comment.insertMany(seedComments);

    console.log("Database seeded");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seedDB();
