// routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey'; // Use dotenv in real projects

//  REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Optionally generate a JWT
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      role: newUser.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

//  LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

//  LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

export default router;

