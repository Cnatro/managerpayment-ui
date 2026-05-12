import React from 'react';

export default function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary transition ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
