import React from 'react';
import TopHighlight from './TopHighlight';
import LatestNews from './TopLatestNews';
import RecentHeadlines from './TopRecentHeadlines';
import Poll from './Poll';
import LiveNewsStreaming from './LiveNewsStreaming';
import RecommendedNewsSection from './TopRecommendedNews';
import ReviewForm from './ReviewForm';
import TopSearchedNews from './TopSearchedNews';

const HomePage = () => {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-0">
      {/* TopHighlight + RecentHeadlines */}
      <div className="w-full max-w-[1200px] bg-white mb-2 p-3 mt-3 mx-auto rounded-xl shadow-sm text-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="flex-1 w-full">
            <TopHighlight />
          </div>
          <div className="w-full lg:w-[300px]">
            <RecentHeadlines />
          </div>
        </div>
      </div>

      {/* LatestNews + Poll */}
      <div className="w-full max-w-[1200px] bg-white p-3 pt-0 mb-3 mx-auto rounded-xl shadow-sm text-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
         <div className="w-[100%] sm:w-[95%] md:w-[85%] lg:flex-1 mx-auto">
  <LatestNews />
</div>

          <div className="w-full lg:w-[300px]">
            <Poll />
          </div>
        </div>
      </div>

      {/* Full-width sections */}
      <LiveNewsStreaming />
      <RecommendedNewsSection />
      <ReviewForm />
      <TopSearchedNews />
    </div>
  );
};

export default HomePage;
