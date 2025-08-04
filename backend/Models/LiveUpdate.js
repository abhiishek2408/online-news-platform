import mongoose from 'mongoose';

const liveUpdateSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('LiveUpdate', liveUpdateSchema);
