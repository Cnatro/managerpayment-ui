import React from 'react';

export default function Card({ title, children, className = '' }) {
  return (
    <div
      className={`
        bg-[#1E1E1E]
        border border-[#2C2C2E]
        rounded-2xl
        p-5
        ${className}
      `}
    >
      {title && (
        <h2 className="text-white text-lg font-semibold mb-4">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}