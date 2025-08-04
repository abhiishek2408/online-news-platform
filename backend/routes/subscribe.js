import express from 'express';
import Subscriber from '../Models/Subscriber.js';
import User from '../Models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    //  Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: 'No account found. Please register first.' });
    }

    //  Check if already subscribed
    const alreadySubscribed = await Subscriber.findOne({ email });
    if (alreadySubscribed) {
      return res.status(400).json({ error: 'Already subscribed' });
    }

    //  Create new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(200).json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
