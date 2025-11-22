import mongoose from 'mongoose';
import Highlight from '../Models/Highlight.js';
import dotenv from 'dotenv';

dotenv.config();

const updateHighlightLikes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Update all highlights that don't have likes field or have undefined/null likes
    const result = await Highlight.updateMany(
      { $or: [{ likes: { $exists: false } }, { likes: null }] },
      { $set: { likes: 0 } }
    );

    console.log(`✅ Updated ${result.modifiedCount} highlight records with likes field`);
    console.log(`Total records matched: ${result.matchedCount}`);

    // Verify the update
    const highlights = await Highlight.find({});
    console.log(`\nTotal highlights in collection: ${highlights.length}`);
    console.log('Sample records:');
    highlights.slice(0, 3).forEach(h => {
      console.log(`- ${h.title}: likes = ${h.likes}`);
    });

    await mongoose.connection.close();
    console.log('\n✨ Database connection closed');
  } catch (error) {
    console.error('❌ Error updating highlights:', error);
    process.exit(1);
  }
};

updateHighlightLikes();
