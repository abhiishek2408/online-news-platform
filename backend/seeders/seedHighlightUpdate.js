const mongoose = require('mongoose');
const Highlight = require('../Models/Highlight'); // Adjust path

mongoose.connect('mongodb://localhost:27017/news_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedHighlights = async () => {
  await Highlight.deleteMany({}); // Optional: clear previous

  const longContent = `
  India’s space ambitions have taken a giant leap forward in 2025 with the launch of the much-anticipated Gaganyaan mission. This mission marks India's first attempt to send humans into space using indigenous technology developed entirely by the Indian Space Research Organisation (ISRO).
The launch, carried out from the Satish Dhawan Space Centre in Sriharikota, was met with widespread national celebration. The rocket carried a three-member crew that will spend 7 days in low-earth orbit before returning safely.
ISRO Chairman Dr. S. Somnath declared this moment a milestone in Indian space history, stating, “We are not just reaching for the stars, we are building the future of space exploration from our own soil.”
This mission is a culmination of nearly a decade of research and development. India joins an elite club of countries — including the US, Russia, and China — that have successfully launched manned space missions.
Gaganyaan has also strengthened India’s position in global collaborations. NASA and ESA have provided advisory support, while Indian engineers and scientists spearheaded the project’s core systems.
Beyond technology, this mission reflects a new vision for India’s youth. Education campaigns, science scholarships, and nationwide exhibitions have accompanied the launch, inspiring future generations.
The module carries state-of-the-art life support systems, AI-assisted navigation, and real-time telemetry linked to ISRO’s Bengaluru headquarters.
Safety measures include multiple backup systems, emergency abort features, and reinforced heat shielding. These innovations were tested rigorously before approval.
One of the astronauts on board is Squadron Leader Rakesh Mehta, a test pilot turned astronaut, who previously led high-risk flight simulations. Alongside him are scientist-astronaut Ananya Singh and mission engineer Kiran Patel.
Their training spanned three years and included underwater simulations, isolation chambers, and zero-gravity flights conducted in both India and Russia.
In addition to the primary mission, Gaganyaan also carries microgravity experiments designed by Indian students. These include fluid behavior studies, plant growth monitoring, and AI system adaptability in space.
India’s Prime Minister praised ISRO, stating, “This is not just a mission; it’s a moment of pride, of unity, and of possibility for every Indian.”
Economically, this mission is projected to boost India’s aerospace sector, attracting private investment and startup innovation under the SpaceTech initiative.
Following Gaganyaan, ISRO has laid out plans for Chandrayaan-4, Mars Orbiter 2, and even a possible Venus exploration.
International media has praised India’s cost-efficient innovation, especially in contrast to much larger space budgets of developed nations.
Over the next 12 months, ISRO will evaluate mission results to refine future long-duration space stays and potential lunar habitation modules.
This success underscores India's rising stature as a space power and opens doors for more global collaboration.
The astronauts are scheduled to return on July 20th and will undergo a 3-week medical and debriefing period post-landing.
Families of the crew, watching from mission control, expressed pride and emotion as the rocket soared beyond the clouds.
The mission has already sparked a wave of interest across social media, with hashtags like #Gaganyaan and #IndiaInSpace trending globally.
Educational institutions across India held live viewings, turning classrooms into cheering arenas of space enthusiasm.
Space agencies worldwide are sending congratulations, recognizing India’s achievement not just as national pride, but a global advancement in space science.
Indian cinema and documentaries are expected to pick up the mission as a theme for inspiring visual storytelling.
As the crew orbits the Earth, every Indian looks upward, not just in awe, but with the belief that the sky is no longer the limit — it’s only the beginning.
This landmark event redefines India’s place in the 21st-century space race and reaffirms its capability to lead with vision, innovation, and courage.
`.trim();

  const highlights = [
    {
      title: "India's Space Mission 2025",
      highlight: "ISRO launches ambitious Gaganyaan mission.",
      description: "India’s space ambitions have taken a giant leap forward in 2025 with the launch of the much-anticipated Gaganyaan mission. This mission marks India's first attempt to send humans into space using indigenous technology developed entirely by the Indian Space Research Organisation",
      content: longContent,
      image: "https://example.com/images/isro.jpg",
      link: "/news/space-mission-2025",
      author: "Abhishek Yadav",
      category: "Science",
      tags: ["ISRO", "Gaganyaan", "Space"],
      isArchived: false,
      publishedAt: new Date("2025-07-01"),
      country: "India",
      state: "Andhra Pradesh" // ISRO Sriharikota
    },
    {
      title: "AI Revolution in 2025",
      highlight: "New AI models are transforming industries.",
      description: "Experts say that AI is reaching new milestones every quarter.",
      content: "Artificial Intelligence (AI) has taken a major leap in 2025...",
      image: "https://example.com/news/ai-2025.jpg",
      link: "/news/ai-revolution-2025",
      author: "John Doe",
      category: "Technology",
      tags: ["AI", "Innovation", "2025"],
      isArchived: true,
      publishedAt: new Date("2023-04-01"),
      country: "USA",
      state: "California"
    },
    {
      title: "Global Markets React to Inflation",
      highlight: "Stock markets respond to US inflation data.",
      description: "Wall Street saw sharp dips as inflation rates rose unexpectedly.",
      content: "Market analysts are adjusting forecasts as inflation impacts continue...",
      image: "https://example.com/images/markets.jpg",
      link: "/news/markets-2025",
      author: "Jane Smith",
      category: "Finance",
      tags: ["Markets", "Inflation", "2025"],
      isArchived: true,
      publishedAt: new Date("2023-05-15"),
      country: "USA",
      state: "New York"
    }
  ];

  try {
    await Highlight.insertMany(highlights);
    console.log(" Seeded highlights with country and state!");
  } catch (err) {
    console.error(" Error:", err);
  } finally {
    mongoose.disconnect();
  }
};

seedHighlights();
