import React from 'react';

export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary transition ${className}`}
      {...props}
    />
  );
}
