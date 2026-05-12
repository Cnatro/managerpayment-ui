import React from 'react';

export default function ChartWrapper({
  title,
  children,
  className = '',
}) {
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
        <div className="text-white font-semibold mb-4">
          {title}
        </div>
      )}

      {children}
    </div>
  );
}