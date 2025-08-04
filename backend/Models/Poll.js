import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  pollQuestion: { type: String, required: true },
  options: [{ type: String, required: true }],
  votes: [{ type: Number, default: 0 }],
  isArchived: { type: Boolean, default: false }
});

export default mongoose.model('Poll', pollSchema);
