import mongoose from 'mongoose';
import Headline from '../Models/Headline.js';
import dotenv from 'dotenv';

dotenv.config();

const updateHeadlineLikes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Update all Headlines that don't have likes field or have undefined/null likes
    const result = await Headline.updateMany(
      { $or: [{ likes: { $exists: false } }, { likes: null }] },
      { $set: { likes: 0 } }
    );

    console.log(`✅ Updated ${result.modifiedCount} Headline records with likes field`);
    console.log(`Total records matched: ${result.matchedCount}`);

    // Verify the update
    const Headlines = await Headline.find({});
    console.log(`\nTotal Headlines in collection: ${Headlines.length}`);
    console.log('Sample records:');
    Headlines.slice(0, 3).forEach(h => {
      console.log(`- ${h.title}: likes = ${h.likes}`);
    });

    await mongoose.connection.close();
    console.log('\n✨ Database connection closed');
  } catch (error) {
    console.error('❌ Error updating Headlines:', error);
    process.exit(1);
  }
};

updateHeadlineLikes();
