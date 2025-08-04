// scripts/seedRecentNewsExtra.js
const mongoose = require('mongoose');
const RecentNews = require('../Models/RecentNews');

mongoose.connect('mongodb://localhost:27017/news_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const additionalNews = {
  Politics: [
    {
      title: "Supreme Court rules on electoral bonds",
      image: "https://example.com/politics6.jpg",
    },
    {
      title: "Major reshuffle in bureaucratic positions",
      image: "https://example.com/politics7.jpg",
    },
    {
      title: "State CM announces farmers' relief fund",
      image: "https://example.com/politics8.jpg",
    },
  ],
  Cricket: [
    {
      title: "Virat Kohli celebrates record-breaking century",
      image: "https://example.com/cricket6.jpg",
    },
    {
      title: "ICC introduces new rules for T20 format",
      image: "https://example.com/cricket7.jpg",
    },
    {
      title: "Women’s cricket team advances to finals",
      image: "https://example.com/cricket8.jpg",
    },
  ],
  Business: [
    {
      title: "SEBI proposes stricter IPO guidelines",
      image: "https://example.com/business6.jpg",
    },
    {
      title: "Stock market sees sharp correction post-Budget",
      image: "https://example.com/business7.jpg",
    },
    {
      title: "FDI inflows rise despite global slowdown",
      image: "https://example.com/business8.jpg",
    },
  ],
  Technology: [
    {
      title: "Indian startup launches indigenous AI assistant",
      image: "https://example.com/tech6.jpg",
    },
    {
      title: "Quantum computing research gains momentum",
      image: "https://example.com/tech7.jpg",
    },
    {
      title: "ISRO collaborates with academia for innovations",
      image: "https://example.com/tech8.jpg",
    },
  ],
  Entertainment: [
    {
      title: "Bollywood biopic stirs political debates",
      image: "https://example.com/ent6.jpg",
    },
    {
      title: "Streaming platforms announce summer releases",
      image: "https://example.com/ent7.jpg",
    },
    {
      title: "Global music awards: Indian artist bags top honor",
      image: "https://example.com/ent8.jpg",
    },
  ],
  Health: [
    {
      title: "WHO issues new guidelines on nutrition",
      image: "https://example.com/health6.jpg",
    },
    {
      title: "Free health checkups announced in rural zones",
      image: "https://example.com/health7.jpg",
    },
    {
      title: "Vaccine booster drive begins across cities",
      image: "https://example.com/health8.jpg",
    },
  ],
  Sports: [
    {
      title: "Indian athlete breaks long jump record",
      image: "https://example.com/sports6.jpg",
    },
    {
      title: "Football league final draws huge audience",
      image: "https://example.com/sports7.jpg",
    },
    {
      title: "Tennis prodigy enters top 10 rankings",
      image: "https://example.com/sports8.jpg",
    },
  ],
  Astrology: [
    {
      title: "Full moon rituals gaining popularity",
      image: "https://example.com/astro6.jpg",
    },
    {
      title: "Jupiter’s transition impacts finance signs",
      image: "https://example.com/astro7.jpg",
    },
    {
      title: "Gemini season: What it means for all signs",
      image: "https://example.com/astro8.jpg",
    },
  ],
  Lifestyle: [
    {
      title: "Digital detox retreats trend in 2024",
      image: "https://example.com/life6.jpg",
    },
    {
      title: "Fusion cuisine takes over urban restaurants",
      image: "https://example.com/life7.jpg",
    },
    {
      title: "Interior design goes eco-friendly",
      image: "https://example.com/life8.jpg",
    },
  ],
};

const newSeedData = [];

for (const category in additionalNews) {
  additionalNews[category].forEach((item) => {
    newSeedData.push({
      ...item,
      category,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });
  });
}

const seedMoreRecentNews = async () => {
  try {
    await RecentNews.insertMany(newSeedData);
    console.log(" Inserted 3 more unique news articles per category.");
    mongoose.connection.close();
  } catch (error) {
    console.error(" Error inserting additional data:", error);
    mongoose.connection.close();
  }
};

seedMoreRecentNews();
