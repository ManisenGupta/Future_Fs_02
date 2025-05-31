import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-16 h-64">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="ml-4 text-lg text-gray-600 dark:text-gray-400">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;