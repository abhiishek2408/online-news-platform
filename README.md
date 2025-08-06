# Online News Platform (MERN Stack)

A comprehensive and modern online news application built using the **MERN Stack** — **MongoDB**, **Express.js**, **React.js**, and **Node.js**.

This platform offers two fully-featured interfaces:

- **Admin Dashboard** – for content moderation, scheduling, and user management  
- **User Dashboard** – for news exploration, filtering, personalization, and real-time updates  

---

## 📌 Overview

Designed to support **digital journalism**, this platform includes:

- Real-time news updates  
- Live news streaming  
- Poll and weather integration  
- Role-based dashboards  
- Modular, scalable architecture  

---

## 📂 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Detailed Feature Overview](#detailed-feature-overview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## Introduction

The Online News Platform provides a **scalable** and **modular** approach to delivering and managing digital content.  

- The **Admin Panel** supports article creation, live updates, poll handling, and user moderation.  
- The **User Interface** is optimized for real-time news consumption with categorized news, trending content, and an interactive experience.

---

## Features

### Authentication & Access Control

- JWT-based login system  
- Global auth state via `AuthContext`  
- Role-based access: Admin vs Reader  

### Admin Capabilities

- Create, edit, delete, and schedule news  
- Manage:  
  - Headlines  
  - Live Updates  
  - Highlights  
  - Special & Recent News  
  - Comments, Polls, Users  
- Poll analytics & user moderation  

### User Dashboard

- Live news feed via `LiveNewsStreaming.jsx`  
- Explore top, latest, and recent news  
- Weather updates and news recommendations  
- Commenting, bookmarking, and polls  
- Mobile-responsive layout  

### Component Highlights

- Admin: `AdminDashboard.jsx`, `ManageUsers.jsx`, `PollManager.jsx`  
- User: `HomePage.jsx`, `TopSearchedNews.jsx`, `WeatherPage.jsx`, etc.

---

## Detailed Feature Overview

- **Dual Dashboards**: Separate interfaces for admin and users  
- **Modular News Types**: Headlines, Highlights, Live Updates, Recent News, etc.  
- **Live Streaming**: Updates shown in real-time for breaking news  
- **Poll System**: Admins create polls, users vote, backend analytics track results  
- **Filtering Options**: Sort and search by tag, category, and popularity  
- **Engagement Tools**: Comments, threaded replies, moderation support  
- **Recommendation Engine**: Highlights trending and popular articles  
- **Weather Widget**: Embedded via `WeatherPage.jsx`  
- **Newsletter Subscription**: Handled through `SubscriptionPage.jsx` and backend  
- **Performance Optimization**: Lazy loading, skeletons, and mobile-first UI  

---

## Project Structure

```
online-news-platform/
├── backend/
│   ├── Models/
│   ├── middleware/
│   ├── routes/
│   ├── images/
│   ├── public/
│   ├── seeders/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   └── src/
│       ├── Auth/
│       ├── components/
│       │   ├── admin/
│       │   └── user/
│       ├── App.js
│       ├── index.js
│       ├── App.css
│       └── index.css
├── README.md
└── package-lock.json
```

---

## Tech Stack

**Frontend**

- React.js  
- React Router  
- Axios  
- Tailwind / Bootstrap  

**Backend**

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT  

**Others**

- Cloudinary / Multer (for image upload)  
- OpenWeatherMap API (for weather integration)  
- Git & GitHub  

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/online-news-platform.git
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

---

## Configuration

- Rename `.env.example` to `.env` in the `backend/` folder  
- Add the following:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Usage

- Admin can manage content through the `/admin` route  
- Users can view and interact with news via `/home`  
- Dynamic routing handles categories, highlights, etc.

---

## API Documentation

Available in `/backend/routes/`:

- `authRoutes.js`  
- `pollRoutes.js`  
- `manageUser.js`  
- `apiNews.js`  
- `commentRoutes.js`  
- `subscribe.js`  
- `weather.js`  

---

## Screenshots

Here are some preview screenshots of the project interface:

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400.png?text=Admin+Dashboard)

### User Homepage
![User Homepage](https://via.placeholder.com/800x400.png?text=User+Homepage)

### Live News Streaming
![Live News Streaming](https://via.placeholder.com/800x400.png?text=Live+News+Streaming)

### Poll Management
![Poll Management](https://via.placeholder.com/800x400.png?text=Poll+Manager)

---

## Troubleshooting

- **MongoDB not connecting?** → Check `.env` and Mongo URI  
- **Image upload failing?** → Ensure Cloudinary credentials are valid  
- **CORS issues?** → Set headers correctly in Express  
- **React errors?** → Open console to debug unhandled exceptions  

---

## Contributors

- **Abhishek Yadav** – Full Stack Developer  
- [Other contributors, if any]

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---
