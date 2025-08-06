# Online News Platform (MERN Stack)

A comprehensive online news application built with the MERN stack — MongoDB, Express.js, React.js, and Node.js. This platform is divided into two distinct interfaces:

- Admin Dashboard – for content management, moderation, and analytics  
- User Dashboard – for news consumption, filtering, and interaction  

Designed for modern digital journalism, the system supports real-time updates, dynamic news sections, and personalized user experiences.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [About the Features](#about-the-features)
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

The Online News Platform provides a scalable and modular way to manage and present news. The Admin Panel enables editorial teams to publish, schedule, and manage news and polls, while the User Interface lets readers browse by category, highlights, and trends.

Built with reusability and scalability in mind, the backend is organized with clean routes and controllers, while the frontend is split into modules for maintainability.

---

## Features

**Authentication & Access Control**
- Register/Login system with JWT-based authentication
- AuthContext for global auth state
- Role-based access: Reader vs Admin

**News Management (Admin)**
- Create, edit, delete articles
- Manage:
  - Headlines
  - Highlights
  - Special News
  - Recent News
  - Polls
  - Comments
  - Live Updates
- Manage users (moderate, delete, update roles)
- Publish scheduling and draft saving
- Poll management and analytics

**Real-Time User Dashboard**
- Live news streaming (LiveNewsStreaming.jsx)
- Latest, Recent, Top News, Weather integration
- Poll participation and review form
- Subscription system with backend model
- Category and tag filtering
- Bookmarking and article viewing
- Responsive layout with modular components

**Admin Components**
- AdminDashboard.jsx, ManageUsers.jsx, PollManager.jsx
- News section managers: Headlines, Highlights, Live Updates, Special, Recent
- Comment.jsx, Homepage.jsx, AdminNavbar.jsx

**User Components**
- Home, Category, Highlight, News View, Weather Pages
- Top Searched, Top Highlighted, Top Recommended sections
- Subscription and Review Forms
- Navbar.jsx, Footer.jsx

---

## About the Features

This platform is packed with modern and scalable news features:

- Two Dedicated Dashboards  
  Completely separated Admin and User dashboards for clear role-based functionality and cleaner architecture.

- Modular News Architecture  
  Articles are organized under specific types like Headlines, Highlights, Live Updates, Special News, each with its own model and route.

- Live News Streaming  
  Breaking news is displayed dynamically via LiveNewsStreaming.jsx for real-time updates.

- Poll System  
  Polls can be created and analyzed by admins and voted on by users through dedicated poll components and backend models.

- Dynamic Filtering  
  News can be filtered by tags, categories, recency, search queries, or popularity, improving user navigation.

- Reader Engagement Tools  
  Commenting and Review system supports threaded discussions with moderation handled by admin components.

- Content Recommendation  
  Components like TopRecommendedNews, TopSearchedNews, and TopRecentHeadlines surface trending and personalized content.

- Weather Integration  
  A built-in weather widget through WeatherPage.jsx provides readers with real-time weather data for context-aware browsing.

- Subscription System  
  Users can subscribe to newsletters using the SubscriptionPage.jsx component, with data stored in the Subscriber.js model.

- Responsive UI & Performance Optimization  
  All pages are responsive across devices, using Tailwind or Bootstrap, with loading skeletons, lazy-loading, and accessible navigation.

---

## Project Structure


online-news-platform/
├── backend/
│ ├── Models/
│ │ ├── Comment.js
│ │ ├── Headline.js
│ │ ├── Highlight.js
│ │ ├── LatestHeadlines.js
│ │ ├── LiveUpdate.js
│ │ ├── Poll.js
│ │ ├── RecentNews.js
│ │ ├── SpecialNews.js
│ │ ├── Subscriber.js
│ │ ├── User.js
│ │ └── VideoNews.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── routes/
│ │ ├── adminRoutes.js
│ │ ├── api.js
│ │ ├── apiNews.js
│ │ ├── authRoutes.js
│ │ ├── commentRoutes.js
│ │ ├── manageComment.js
│ │ ├── manageHeadline.js
│ │ ├── manageHighlight.js
│ │ ├── manageLatestHeadline.js
│ │ ├── manageLiveUpdate.js
│ │ ├── managePoll.js
│ │ ├── manageRecentHeadline.js
│ │ ├── manageSpecialNews.js
│ │ ├── manageUser.js
│ │ ├── pollRoutes.js
│ │ ├── specialNewsRoutes.js
│ │ ├── subscribe.js
│ │ └── weather.js
│ ├── images/
│ ├── public/
│ ├── seeders/
│ ├── .env
│ ├── server.js
│ └── package.json
│
├── frontend/
│ └── src/
│ ├── Auth/
│ │ ├── AuthContext.jsx
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ ├── components/
│ │ ├── admin/
│ │ │ ├── AdminDashboard.jsx
│ │ │ ├── AdminNavbar.jsx
│ │ │ ├── Comment.jsx
│ │ │ ├── Headline.jsx
│ │ │ ├── Highlight.jsx
│ │ │ ├── Homepage.jsx
│ │ │ ├── LatestHeadlines.jsx
│ │ │ ├── LiveUpdates.jsx
│ │ │ ├── ManageUsers.jsx
│ │ │ ├── PollManager.jsx
│ │ │ ├── RecentNews.jsx
│ │ │ └── SpecialNews.jsx
│ │ └── user/
│ │ ├── AllHighlightsPage.jsx
│ │ ├── AllLatestNewsPage.jsx
│ │ ├── CategoryNewsPage.jsx
│ │ ├── Footer.jsx
│ │ ├── HighlightViewPage.jsx
│ │ ├── HomePage.jsx
│ │ ├── LatestNewsViewPage.jsx
│ │ ├── LiveNewsStreaming.jsx
│ │ ├── Navbar.css
│ │ ├── Navbar.jsx
│ │ ├── Poll.jsx
│ │ ├── ReviewForm.jsx
│ │ ├── SubscriptionPage.jsx
│ │ ├── TopHighlight.jsx
│ │ ├── TopLatestNews.jsx
│ │ ├── TopRecentHeadlines.jsx
│ │ ├── TopRecommendedNews.jsx
│ │ ├── TopSearchedNews.jsx
│ │ ├── UserDashboard.jsx
│ │ └── WeatherPage.jsx
│ ├── App.js
│ ├── App.css
│ ├── index.js
│ ├── index.css
│ ├── logo.svg
│ └── setupTests.js
├── README.md
└── package-lock.json




