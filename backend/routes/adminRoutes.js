// routes/adminRoutes.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Admin Dashboard
router.get('/dashboard', isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/dashboard.html'));
});

export default router;
