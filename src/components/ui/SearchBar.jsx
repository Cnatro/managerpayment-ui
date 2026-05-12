import React from 'react';
import Input from './Input';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="max-w-xs"
      />
    </div>
  );
}
