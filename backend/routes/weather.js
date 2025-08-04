import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
const router = express.Router();


const WEATHER_KEY = process.env.OPENWEATHER_API_KEY;

router.get('/current', async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

router.get('/forecast', async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

router.get('/city', async (req, res) => {
  const { q } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${WEATHER_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});
console.log("🔑 API Key:", process.env.OPENWEATHER_API_KEY);


export default router;
