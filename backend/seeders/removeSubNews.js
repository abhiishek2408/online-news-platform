const mongoose = require('mongoose');
const Highlight = require('../Models/Highlight'); // adjust path if needed

mongoose.connect('mongodb://localhost:27017/news_portal', { useNewUrlParser: true, useUnifiedTopology: true });

async function removeSubNews() {
  try {
    const result = await Highlight.updateMany({}, { $unset: { sub_news: "" } });
    console.log('sub_news field removed:', result);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

removeSubNews();
