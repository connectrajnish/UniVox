import React from 'react';

const ShimmerCard = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md w-full h-64 animate-pulse">
      {/* Shimmer effect div */}
      <div className="bg-gray-300 h-40 w-full mx-auto mb-2 rounded-md"></div>
      <div className="bg-gray-300 h-4 w-2/3 mx-auto mb-2 rounded-md"></div>
      <div className="bg-gray-300 h-4 w-4/5 mx-auto mb-2 rounded-md"></div>
      <div className="bg-gray-300 h-4 w-3/4 mx-auto mb-2 rounded-md"></div>
    </div>
  );
};

export default ShimmerCard;
