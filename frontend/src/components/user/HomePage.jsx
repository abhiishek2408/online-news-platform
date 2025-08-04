import React from 'react';
import TopHighlight from './TopHighlight';
import LatestNews from './TopLatestNews';
import RecentHeadlines from './TopRecentHeadlines';
import Poll from './Poll';
import LiveNewsStreaming from './LiveNewsStreaming';
import RecommendedNewsSection from './RecommendedNewsSection';
import ReviewForm from './ReviewForm';
import TopSearchedNews from './TopSearchedNews';


const HomePage = () => {

  


  return (
  <div>     

  <div className="w-full max-w-[1000px] bg-white mb-2 p-3 mt-3 mx-auto rounded-xl shadow-sm text-sm">
  <div className="flex flex-row gap-4 items-start">
    <div className="flex-1 ">
      <TopHighlight />
    </div>
  
    <div className="w-[280px]">
      <RecentHeadlines />
    </div>
  </div>
</div>

  <div className="w-full max-w-[1000px] bg-white p-3 pt-0 mb-3 mx-auto rounded-xl shadow-sm text-sm">
<div className="flex flex-row gap-4 items-start">
    <div className="flex-1 ">
   <LatestNews />
    </div>
  
    <div className="w-[280px]">
      <Poll />
    </div>
  </div>
</div>
    
  <LiveNewsStreaming/>
  <RecommendedNewsSection/>
  <ReviewForm/>
  <TopSearchedNews/>

    </div>
  );
};

export default HomePage;