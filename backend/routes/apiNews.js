import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
const router = express.Router();

const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

router.get('/api-news-search', async (req, res) => {
  const { q } = req.query;
  const url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${NEWSAPI_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

export default router;
