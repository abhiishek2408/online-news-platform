const mongoose = require("mongoose");
const News = require("../Models/SpecialNews"); //  Make sure file path and export are correct

const sampleNews = [
  {
    title: "Quantum Computing Breakthrough in 2025",
    slug: "quantum-computing-breakthrough-2025",
    image: "https://placehold.co/600x400/1E3A8A/FFFFFF?text=Quantum",
    description: "Quantum computing has reached new heights with a major breakthrough in Qubit stability.",
    content: "Researchers from MIT have successfully stabilized qubits at room temperature, paving the way for commercial quantum processors.",
    category: "Technology",
    tags: ["quantum", "computing", "technology"],
    author: "Dr. Ada Lovelace",
    source: "MIT News",
    isFeatured: true,
    seoMeta: {
      title: "Quantum Computing Breakthrough 2025",
      description: "Learn about the latest advancement in quantum computing by MIT.",
      keywords: ["quantum computing", "MIT", "Qubit"]
    }
  },
  {
    title: "SpaceX Plans Mars Base by 2030",
    slug: "spacex-plans-mars-base-2030",
    image: "https://placehold.co/600x400/065F46/FFFFFF?text=Mars",
    description: "Elon Musk confirms a timeline to start construction of a Mars base within 5 years.",
    content: "SpaceX aims to launch Starship missions to Mars with cargo and build an automated habitat before 2030.",
    category: "Science",
    tags: ["spacex", "mars", "space"],
    author: "Elon Musk",
    source: "SpaceX Reports",
    isFeatured: true,
    seoMeta: {
      title: "SpaceX Mars Mission 2030",
      description: "SpaceX outlines its bold plan to colonize Mars by 2030.",
      keywords: ["mars", "spacex", "elon musk"]
    }
  },
  {
    title: "Global Markets React to Tech Layoffs",
    slug: "global-markets-react-tech-layoffs",
    image: "https://placehold.co/600x400/991B1B/FFFFFF?text=Economy",
    description: "Major layoffs in the tech industry have rattled global investors and analysts.",
    content: "Companies like Google and Amazon have reduced workforce by over 15%, causing fear in the markets.",
    category: "Business",
    tags: ["layoffs", "tech", "economy"],
    author: "Jane Fintech",
    source: "Reuters",
    seoMeta: {
      title: "Tech Layoffs 2025",
      description: "Global stock markets react sharply to widespread layoffs in tech sector.",
      keywords: ["layoffs", "tech news", "stock market"]
    }
  },
  {
    title: "AI Defeats Human Champions in Every Game",
    slug: "ai-defeats-human-all-games",
    image: "https://placehold.co/600x400/5B21B6/FFFFFF?text=AI",
    description: "New multi-agent AI outperforms human players in chess, Go, and StarCraft.",
    content: "OpenAI and DeepMind collaboration produced the first general-purpose competitive AI.",
    category: "Technology",
    tags: ["ai", "gaming", "machine learning"],
    author: "Alan Turing",
    source: "OpenAI Blog",
    isFeatured: false,
    seoMeta: {
      title: "AI Wins All Games",
      description: "A super-intelligent AI defeats the best human players in strategy games.",
      keywords: ["AI", "DeepMind", "OpenAI"]
    }
  },
  {
    title: "India Leads the World in Solar Energy",
    slug: "india-leads-world-solar-energy",
    image: "https://placehold.co/600x400/047857/FFFFFF?text=Solar",
    description: "India becomes the top producer of solar energy in the world as of July 2025.",
    content: "With massive investments and new plants across Rajasthan and Gujarat, India surpasses China in solar production.",
    category: "Politics",
    tags: ["india", "solar", "energy"],
    author: "Ravi Shankar",
    source: "NDTV",
    isFeatured: true,
    seoMeta: {
      title: "India Solar Power 2025",
      description: "India becomes #1 in solar energy production in 2025.",
      keywords: ["solar energy", "India", "green tech"]
    }
  }
];

async function seedData() {
  try {
    await News.deleteMany(); // Clear existing data
    await News.insertMany(sampleNews); // Insert new data
    console.log(" Seeded 5 special news items successfully.");
  } catch (error) {
    console.error(" Failed to seed data:", error.message);
  } finally {
    mongoose.disconnect(); // Always disconnect
  }
}

// Connect and seed
mongoose.connect("mongodb://localhost:27017/news_portal")
  .then(() => {
    console.log(" Connected to MongoDB");
    seedData();
  })
  .catch(err => {
    console.error(" MongoDB connection error:", err);
  });

