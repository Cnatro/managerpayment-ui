import React from 'react';

export default function Loader({ className = '' }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="w-10 h-10 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}