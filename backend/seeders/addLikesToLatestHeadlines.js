import mongoose from 'mongoose';
import LatestHeadlines from '../Models/LatestHeadlines.js';
import dotenv from 'dotenv';

dotenv.config();

const updateLatestHeadlinesLikes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Update all LatestHeadliness that don't have likes field or have undefined/null likes
    const result = await LatestHeadlines.updateMany(
      { $or: [{ likes: { $exists: false } }, { likes: null }] },
      { $set: { likes: 0 } }
    );

    console.log(`✅ Updated ${result.modifiedCount} LatestHeadlines records with likes field`);
    console.log(`Total records matched: ${result.matchedCount}`);

    // Verify the update
    const LatestHeadliness = await LatestHeadlines.find({});
    console.log(`\nTotal LatestHeadliness in collection: ${LatestHeadliness.length}`);
    console.log('Sample records:');
    LatestHeadliness.slice(0, 3).forEach(h => {
      console.log(`- ${h.title}: likes = ${h.likes}`);
    });

    await mongoose.connection.close();
    console.log('\n✨ Database connection closed');
  } catch (error) {
    console.error('❌ Error updating LatestHeadliness:', error);
    process.exit(1);
  }
};

updateLatestHeadlinesLikes();
