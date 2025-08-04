import express from 'express';
import Highlight from '../Models/Highlight.js';
import LatestHeadlines from '../Models/LatestHeadlines.js';
import Headline from '../Models/Headline.js';
import LiveUpdate from '../Models/LiveUpdate.js';
import VideoNews from '../Models/VideoNews.js';
import RecentNews from '../Models/RecentNews.js';

const router = express.Router();

router.get('/highlights', async (req, res) => {
  try {
    const data = await Highlight.find({ isArchived: false });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching highlights', error });
  }
});

router.get('/all-highlights', async (req, res) => {
  try {
    const data = await Highlight.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching highlights', error });
  }
});

router.get('/highlight/:id', async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    res.json(highlight);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching highlight', error: err });
  }
});

router.post('/highlights', async (req, res) => {
  try {
    const highlight = new Highlight(req.body);
    await highlight.save();
    res.status(201).json({ message: 'Highlight added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding highlight', error });
  }
});

router.get('/latest-news', async (req, res) => {
  try {
    const cards = await LatestHeadlines.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news cards', error });
  }
});

router.post('/latest-news', async (req, res) => {
  try {
    const card = new LatestHeadlines(req.body);
    await card.save();
    res.status(201).json({ message: 'News card added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding news card', error });
  }
});

router.get('/latest-news/:id', async (req, res) => {
  try {
    const newsItem = await LatestHeadlines.findById(req.params.id);
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news item', error });
  }
});

router.get('/headlines', async (req, res) => {
  try {
    const headlines = await Headline.find();
    res.json(headlines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching headlines', error });
  }
});

router.post('/headlines', async (req, res) => {
  try {
    const headline = new Headline(req.body);
    await headline.save();
    res.status(201).json({ message: 'Headline added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding headline', error });
  }
});

router.get('/live-updates', async (req, res) => {
  try {
    const liveupdates = await LiveUpdate.find();
    res.json(liveupdates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching liveupdates', error });
  }
});

router.post('/live-updates', async (req, res) => {
  try {
    const liveupdate = new LiveUpdate(req.body);
    await liveupdate.save();
    res.status(201).json({ message: 'Live update added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding live update', error });
  }
});

router.get('/video-news', async (req, res) => {
  try {
    const videos = await VideoNews.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video news', error });
  }
});

router.post('/video-news', async (req, res) => {
  try {
    const video = new VideoNews(req.body);
    await video.save();
    res.status(201).json({ message: 'Video news added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding video news', error });
  }
});


router.post('/recent-news', async (req, res) => {
  try {
    const { title, image, category, date } = req.body;
    const newsItem = new RecentNews({ title, image, category, date });
    await newsItem.save();
    res.status(201).json({ message: 'News item added successfully', newsItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding recent news', error });
  }
});

router.get('/recent-news/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const news = await RecentNews.find({ category }).sort({ _id: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent news', error });
  }
});

router.get('/test', (req, res) => {
  res.send('API is connected and working!');
});

export default router;
