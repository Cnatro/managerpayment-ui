import React from 'react';

export default function ProgressBar({
  value,
  max,
  className = '',
}) {
  const percent = Math.min(
    100,
    (value / max) * 100
  );

  return (
    <div
      className={`w-full bg-[#2C2C2E] rounded-full h-3 ${className}`}
    >
      <div
        className="bg-[#00E5FF] h-3 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}