import React from 'react';

export default function EmptyState({
  message = 'Không có dữ liệu',
  icon = null,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-[#98989D] ${className}`}
    >
      {icon && <div className="mb-3">{icon}</div>}
      <div className="text-lg font-medium">
        {message}
      </div>
    </div>
  );
}