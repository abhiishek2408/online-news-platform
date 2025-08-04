import React from 'react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white font-light">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-normal mb-6 text-gray-800 dark:text-white">Dashboard Overview</h1>

        {/* Stat Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md transition">
            <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">Total News</div>
            <div className="text-3xl font-semibold text-purple-500">328</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md transition">
            <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">Active Reporters</div>
            <div className="text-3xl font-semibold text-green-500">18</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md transition">
            <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">Pending Articles</div>
            <div className="text-3xl font-semibold text-red-500">5</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-normal mb-4 text-gray-800 dark:text-gray-200">Recent Activity</h2>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <li className="border-b border-gray-200 dark:border-gray-700 pb-2">Ravi submitted a news article on “SpaceX Mission”.</li>
            <li className="border-b border-gray-200 dark:border-gray-700 pb-2">Admin approved “Chandrayaan-4 Update”.</li>
            <li className="border-b border-gray-200 dark:border-gray-700 pb-2">Meera's article was rejected due to unverified sources.</li>
            <li>New reporter registered: Amit Sharma</li>
          </ul>
        </div>

        {/* Alerts and Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-6">
          {/* Alerts */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-lg font-semibold mb-4">Alerts</h2>
            <ul className="list-disc pl-5 text-red-600 space-y-2">
              <li>3 Live Updates not published</li>
              <li>1 Special News draft needs approval</li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full">Add Headline</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">Create Poll</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full">Publish Live Update</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
