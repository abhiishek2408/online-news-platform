const mongoose = require('mongoose');
const VideoNews = require('../Models/VideoNews');

mongoose.connect('mongodb://localhost:27017/news_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(" Connected to MongoDB");
  seedData();
}).catch(err => {
  console.error(" MongoDB connection error:", err);
});

async function seedData() {
  try {
    await VideoNews.deleteMany(); // Optional: clear old data

    const sampleVideos = [
      {
        title: "How AI is changing education: Harvard expert explains",
        thumbnail: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1AJPyI.img?w=549&h=309",
        source: "India Today",
        postedAgo: "4d",
        likes: 53,
        comments: 1,
        videoUrl: "https://www.youtube.com/embed/Nq2wYlWFucg"
      },
      {
        title: "ISRO Chandrayaan-3 Update: Moon Mission Progress",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Chandrayaan-3_on_the_Moon_%282%29.jpg/480px-Chandrayaan-3_on_the_Moon_%282%29.jpg",
        source: "NDTV",
        postedAgo: "2d",
        likes: 120,
        comments: 9,
        videoUrl: "https://www.youtube.com/embed/GmGAx9dBuj4"
      },
      {
        title: "Top 5 Tech Inventions in 2025 That Will Change the World",
        thumbnail: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=60",
        source: "TechCrunch",
        postedAgo: "3h",
        likes: 78,
        comments: 5,
        videoUrl: "https://www.youtube.com/embed/oGnd_PG8GZc"
      },
      {
        title: "World Leaders Meet at G20 Summit - Key Highlights",
        thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=60",
        source: "BBC News",
        postedAgo: "1w",
        likes: 89,
        comments: 3,
        videoUrl: "https://www.youtube.com/embed/1_4zKAk1v1A"
      }
    ];

    await VideoNews.insertMany(sampleVideos);
    console.log(" Seeded 4 video news entries.");
    process.exit();

  } catch (error) {
    console.error(" Failed to seed video news:", error);
    process.exit(1);
  }
  
}
