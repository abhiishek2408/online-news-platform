// seeders/seedLiveUpdates.js
const mongoose = require('mongoose');
const LiveUpdate = require('../Models/LiveUpdate');

mongoose.connect('mongodb://localhost:27017/news_portal')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const seedUpdates = async () => {
  await LiveUpdate.deleteMany({});

  await LiveUpdate.insertMany([
    { message: "Breaking News: Global Markets React" },
    { message: "Tech Innovations Unveiled" },
    { message: "Sports: Championship Highlights" },
    { message: "Weather Alert: Storms Approaching" },
    { message: "Political Developments" },
    { message: "Health & Wellness Tips" }
  ]);

  console.log(" Live updates seeded.");
  mongoose.connection.close();
};

seedUpdates();
