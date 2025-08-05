import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import session from 'express-session';

import apiRoutes from './routes/api.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import newsRoutes from './routes/specialNewsRoutes.js';
import manageComment from './routes/manageComment.js';
import manageHeadline from './routes/manageHeadline.js';
import manageHighlight from './routes/manageHighlight.js';
import manageLatestHeadline from './routes/manageLatestHeadline.js';
import manageLiveUpdate from './routes/manageLiveUpdate.js';
import managePoll from './routes/managePoll.js';
import manageRecentHeadline from './routes/manageRecentHeadline.js';
import managespecialNewsRoutes from './routes/manageSpecialNews.js';
import manageUser from './routes/manageUser.js';
import weatherRoutes from './routes/weather.js';
import apiNewsRoutes from './routes/apiNews.js';
import subscribeRoute from './routes/subscribe.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('DB connection error:', err));

app.use(cors({
  origin: 'https://online-news-platform.vercel.app',
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use('/api', apiRoutes);
app.use('/api', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/newsapi', apiNewsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/comments', manageComment);
app.use('/api/headlines', manageHeadline);
app.use('/api/managehighlights', manageHighlight);
app.use('/api/latest-headlines', manageLatestHeadline);
app.use('/api/live-updates', manageLiveUpdate);
app.use('/api/manage-polls', managePoll);
app.use('/api/recent-news', manageRecentHeadline);
app.use('/api/special-news', managespecialNewsRoutes);
app.use('/api/users', manageUser);
app.use('/api/subscribe', subscribeRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
