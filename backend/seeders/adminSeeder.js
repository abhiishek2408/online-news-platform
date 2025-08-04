// seeders/adminSeeder.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../Models/User.js';

mongoose.connect('mongodb://localhost:27017/news_portal')
  .then(async () => {
    const existingAdmin = await User.findOne({ email: 'admin@news.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      email: 'admin@news.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log(' Admin created');
    process.exit();
  })
  .catch(err => {
    console.error('Error creating admin:', err);
    process.exit(1);
  });
