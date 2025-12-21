import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 transition duration-300 bg-gray-200 hover:bg-gray-300 border border-gray-300 mb-4 ${className}`}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
      <span>Back</span>
    </button>
  );
};

export default BackButton;