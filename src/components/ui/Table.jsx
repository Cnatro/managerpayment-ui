import React from 'react';

export default function Table({
  columns,
  data,
  className = '',
}) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-[#1E1E1E] rounded-2xl">
        <thead>
          <tr className="border-b border-[#2C2C2E]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold text-[#98989D] uppercase"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-[#2C2C2E] hover:bg-[#252525]"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-sm text-white"
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}