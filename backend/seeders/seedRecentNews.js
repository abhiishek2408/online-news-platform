// scripts/seedRecentNews.js
const mongoose = require('mongoose');
const RecentNews = require('../Models/RecentNews');

mongoose.connect('mongodb://localhost:27017/news_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = {
  Politics: [
    {
      title: "PM addresses the nation on key reforms",
      image: "https://example.com/politics1.jpg",
    },
    {
      title: "New bill passed in Parliament",
      image: "https://example.com/politics2.jpg",
    },
    {
      title: "Opposition walks out during session",
      image: "https://example.com/politics3.jpg",
    },
    {
      title: "Election dates declared for major states",
      image: "https://example.com/politics4.jpg",
    },
    {
      title: "Cabinet reshuffle expected soon",
      image: "https://example.com/politics5.jpg",
    },
  ],
  Cricket: [
    {
      title: "India defeats Australia in final over thriller",
      image: "https://example.com/cricket1.jpg",
    },
    {
      title: "Rohit Sharma named captain for T20 series",
      image: "https://example.com/cricket2.jpg",
    },
    {
      title: "New young talents shine in domestic league",
      image: "https://example.com/cricket3.jpg",
    },
    {
      title: "BCCI to invest in new stadiums",
      image: "https://example.com/cricket4.jpg",
    },
    {
      title: "MS Dhoni hints at IPL retirement",
      image: "https://example.com/cricket5.jpg",
    },
  ],
  Business: [
    {
      title: "Sensex hits record high amid market optimism",
      image: "https://example.com/business1.jpg",
    },
    {
      title: "RBI maintains repo rate in monetary policy review",
      image: "https://example.com/business2.jpg",
    },
    {
      title: "Startups boom as funding surges in Q2",
      image: "https://example.com/business3.jpg",
    },
    {
      title: "India signs trade deal with EU",
      image: "https://example.com/business4.jpg",
    },
    {
      title: "Unemployment dips slightly as hiring improves",
      image: "https://example.com/business5.jpg",
    },
  ],
  Technology: [
    {
      title: "ISRO launches new satellite for 5G connectivity",
      image: "https://example.com/tech1.jpg",
    },
    {
      title: "AI tools gain traction in Indian education sector",
      image: "https://example.com/tech2.jpg",
    },
    {
      title: "Startups embrace blockchain for transparency",
      image: "https://example.com/tech3.jpg",
    },
    {
      title: "Meta to open new R&D center in Bengaluru",
      image: "https://example.com/tech4.jpg",
    },
    {
      title: "Cybersecurity firms see rise in demand post-2024",
      image: "https://example.com/tech5.jpg",
    },
  ],
  Entertainment: [
    {
      title: "SRK announces next film under YRF banner",
      image: "https://example.com/ent1.jpg",
    },
    {
      title: "OTT platforms dominate Filmfare nominations",
      image: "https://example.com/ent2.jpg",
    },
    {
      title: "Cannes 2024: India bags 3 global awards",
      image: "https://example.com/ent3.jpg",
    },
    {
      title: "Bigg Boss finale sets TRP record",
      image: "https://example.com/ent4.jpg",
    },
    {
      title: "South Indian cinema sees major global growth",
      image: "https://example.com/ent5.jpg",
    },
  ],
  Health: [
    {
      title: "Govt launches national mental health program",
      image: "https://example.com/health1.jpg",
    },
    {
      title: "Monkeypox cases decline nationwide",
      image: "https://example.com/health2.jpg",
    },
    {
      title: "Yoga Day 2024: PM promotes healthy living",
      image: "https://example.com/health3.jpg",
    },
    {
      title: "New AI tool predicts cardiac risk early",
      image: "https://example.com/health4.jpg",
    },
    {
      title: "Nutrition education to be included in school syllabus",
      image: "https://example.com/health5.jpg",
    },
  ],
  Sports: [
    {
      title: "Neeraj Chopra wins gold again",
      image: "https://example.com/sports1.jpg",
    },
    {
      title: "Indian hockey team qualifies for Olympics",
      image: "https://example.com/sports2.jpg",
    },
    {
      title: "Commonwealth Games: India ranks 2nd overall",
      image: "https://example.com/sports3.jpg",
    },
    {
      title: "Para-athletes break national records",
      image: "https://example.com/sports4.jpg",
    },
    {
      title: "Kabbadi Premier League launched",
      image: "https://example.com/sports5.jpg",
    },
  ],
  Astrology: [
    {
      title: "Weekly Horoscope: What stars predict for you",
      image: "https://example.com/astro1.jpg",
    },
    {
      title: "Lunar eclipse to impact these signs",
      image: "https://example.com/astro2.jpg",
    },
    {
      title: "Saturn returns bring challenges",
      image: "https://example.com/astro3.jpg",
    },
    {
      title: "Astrology apps see user boom",
      image: "https://example.com/astro4.jpg",
    },
    {
      title: "Daily Panchang & Rahukalam",
      image: "https://example.com/astro5.jpg",
    },
  ],
  Lifestyle: [
    {
      title: "Top 5 wellness trends in 2024",
      image: "https://example.com/life1.jpg",
    },
    {
      title: "Minimalist decor ideas trending globally",
      image: "https://example.com/life2.jpg",
    },
    {
      title: "How to build a morning routine",
      image: "https://example.com/life3.jpg",
    },
    {
      title: "Travel hacks for solo backpackers",
      image: "https://example.com/life4.jpg",
    },
    {
      title: "Fitness influencers promoting body positivity",
      image: "https://example.com/life5.jpg",
    },
  ],
};

const seedData = [];

for (const category in categories) {
  categories[category].forEach((item) => {
    seedData.push({
      ...item,
      category,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
  });
}

const seedRecentNews = async () => {
  try {
    await RecentNews.deleteMany(); // Optional: clear existing data
    await RecentNews.insertMany(seedData);
    console.log(" Seeded 5 news articles for each category successfully.");
    mongoose.connection.close();
  } catch (error) {
    console.error(" Seeding failed:", error);
    mongoose.connection.close();
  }
};

seedRecentNews();
