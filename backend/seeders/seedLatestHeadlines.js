const mongoose = require('mongoose');
const NewsCard = require('../Models/LatestHeadlines'); // Adjust the path as needed

mongoose.connect('mongodb://localhost:27017/news_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const newsCards = [
  {
    title: "India’s Moon Rover Sends First Images",
    headline: "Chandrayaan rover begins lunar photography",
    description: "India's rover lands successfully and starts sending images.",
    content: "The Chandrayaan rover has landed near the Moon’s south pole and transmitted its first high-resolution images...",
    image: "https://example.com/images/chandrayaan-rover.jpg",
    link: "/news/moon-rover-images",
    author: "ISRO Team",
    category: "Science",
    tags: ["ISRO", "Moon", "Space"],
    isArchived: false,
    publishedAt: new Date("2025-07-01"),
    published_at: new Date("2025-07-01"),
    country: "India",
    state: "Andhra Pradesh"
  },
  {
    title: "Lucknow Hosts International Literature Fest",
    headline: "Authors from 15+ countries attend",
    description: "The Lucknow Literature Fest showcases global writing talent.",
    content: "The three-day event featured readings, poetry slams, and author panels...",
    image: "https://example.com/images/lucknow-litfest.jpg",
    link: "/news/lucknow-litfest",
    author: "Sonal Verma",
    category: "Culture",
    tags: ["Literature", "Festival", "Uttar Pradesh"],
    isArchived: false,
    publishedAt: new Date("2025-07-02"),
    published_at: new Date("2025-07-02"),
    country: "India",
    state: "Uttar Pradesh"
  },
  {
    title: "Apple Launches iGlasses with AR Features",
    headline: "Wearable tech reimagined",
    description: "Apple's iGlasses can display live data overlays via AR.",
    content: "The smart glasses sync with iPhones and bring futuristic overlays directly to your eyes...",
    image: "https://example.com/images/iglasses.jpg",
    link: "/news/apple-iglasses",
    author: "Sophia Wang",
    category: "Technology",
    tags: ["Apple", "Wearables", "AR"],
    isArchived: false,
    publishedAt: new Date("2025-07-03"),
    published_at: new Date("2025-07-03"),
    country: "USA",
    state: "California"
  },
  {
    title: "World Cup 2026 Preparations Begin",
    headline: "Stadium construction kicks off",
    description: "FIFA begins infrastructure setup for the 2026 tournament.",
    content: "Major upgrades are happening across host nations including the USA, Mexico, and Canada...",
    image: "https://example.com/images/worldcup-2026.jpg",
    link: "/news/world-cup-prep",
    author: "David Lopez",
    category: "Sports",
    tags: ["FIFA", "World Cup", "Football"],
    isArchived: false,
    publishedAt: new Date("2025-07-04"),
    published_at: new Date("2025-07-04"),
    country: "USA",
    state: "New York"
  },
  {
    title: "Kanpur Startup Launches Eco Battery",
    headline: "UP startup disrupts EV battery market",
    description: "Kanpur-based company invents plant-based battery for electric vehicles.",
    content: "The startup, GreenVolt, claims its battery charges faster and lasts longer than lithium-ion counterparts...",
    image: "https://example.com/images/eco-battery.jpg",
    link: "/news/eco-battery-up",
    author: "Farhan Qureshi",
    category: "Business",
    tags: ["Startup", "EV", "Kanpur"],
    isArchived: false,
    publishedAt: new Date("2025-07-05"),
    published_at: new Date("2025-07-05"),
    country: "India",
    state: "Uttar Pradesh"
  },
  {
    title: "Delhi Sees Surge in Green Building Projects",
    headline: "Eco-friendly construction is trending",
    description: "More than 300 green-certified buildings completed in 2025.",
    content: "Delhi’s real estate is embracing sustainable materials and designs...",
    image: "https://example.com/images/green-buildings.jpg",
    link: "/news/green-buildings-delhi",
    author: "Anjali Mehta",
    category: "Environment",
    tags: ["Delhi", "Green", "Construction"],
    isArchived: false,
    publishedAt: new Date("2025-07-06"),
    published_at: new Date("2025-07-06"),
    country: "India",
    state: "Delhi"
  },
  {
    title: "NASA Announces Asteroid Mining Program",
    headline: "Asteroids could be new gold mines",
    description: "NASA to explore metal-rich asteroids for future space mining.",
    content: "Initial unmanned missions will analyze potential mining sites in the asteroid belt...",
    image: "https://example.com/images/asteroid-mining.jpg",
    link: "/news/nasa-asteroid-mining",
    author: "Laura Kim",
    category: "Science",
    tags: ["NASA", "Mining", "Asteroids"],
    isArchived: false,
    publishedAt: new Date("2025-07-07"),
    published_at: new Date("2025-07-07"),
    country: "USA",
    state: "Florida"
  },
  {
    title: "Ganga Riverfront Project Completed in Varanasi",
    headline: "Modern walkway opens along Ganga",
    description: "Varanasi's riverfront is now a tourist and cultural hotspot.",
    content: "New ghats, gardens, and solar lighting systems enhance the spiritual experience...",
    image: "https://example.com/images/ganga-riverfront.jpg",
    link: "/news/ganga-riverfront-varanasi",
    author: "Rakesh Tiwari",
    category: "Development",
    tags: ["Ganga", "Riverfront", "Varanasi"],
    isArchived: false,
    publishedAt: new Date("2025-07-08"),
    published_at: new Date("2025-07-08"),
    country: "India",
    state: "Uttar Pradesh"
  },
  {
    title: "Google Unveils AI-Powered Travel Assistant",
    headline: "Your next travel buddy is AI",
    description: "The tool suggests trips, budgets, bookings in seconds.",
    content: "Google’s AI can now plan your trip end-to-end from flights to food...",
    image: "https://example.com/images/ai-travel.jpg",
    link: "/news/google-travel-ai",
    author: "Elon Kapoor",
    category: "Technology",
    tags: ["Google", "AI", "Travel"],
    isArchived: false,
    publishedAt: new Date("2025-07-09"),
    published_at: new Date("2025-07-09"),
    country: "USA",
    state: "Washington"
  },
  {
    title: "India’s GDP Projected to Surpass $4 Trillion",
    headline: "IMF forecasts India's strong economic growth",
    description: "India's economic momentum continues to surprise experts.",
    content: "With a growing digital economy and industrial output, India may surpass $4 trillion in GDP by 2026...",
    image: "https://example.com/images/india-gdp.jpg",
    link: "/news/india-gdp-forecast",
    author: "Kavita Rao",
    category: "Finance",
    tags: ["GDP", "India", "Economy"],
    isArchived: false,
    publishedAt: new Date("2025-07-09"),
    published_at: new Date("2025-07-09"),
    country: "India",
    state: "Maharashtra"
  }
];

const seed = async () => {
  try {
    await NewsCard.deleteMany({});
    await NewsCard.insertMany(newsCards);
    console.log(" NewsCard data seeded successfully.");
  } catch (err) {
    console.error(" Error seeding NewsCard data:", err);
  } finally {
    mongoose.disconnect();
  }
};

seed();
