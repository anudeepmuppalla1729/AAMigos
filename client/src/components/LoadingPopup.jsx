import React from 'react';

function LoadingPopup() {
  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
      <div className="bg-[#171925]/90 p-6 px-12 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf400a]"></div>
        <p className="text-white mt-4">Processing...</p>
      </div>
    </div>
  );
}

export default LoadingPopup;