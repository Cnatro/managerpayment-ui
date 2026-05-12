import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

export default function MonthlyBarChart({ data = [] }) {
  if (!data?.length)
    return (
      <div className="text-[#98989D] text-center py-8">Không có dữ liệu</div>
    );

  const currentMonth = new Date().getMonth() + 1;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barSize={30}>
        <CartesianGrid stroke="#2C2C2E" strokeDasharray="4 4" />

        <XAxis dataKey="label" stroke="#98989D" />

        <YAxis stroke="#98989D" />

        {/* TOOLTIP CARD STYLE */}
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;

            const data = payload[0].payload;

            return (
              <div className="bg-[#1E1E1E] border border-[#2C2C2E] p-4 rounded-xl shadow-lg">
                <p className="text-white font-semibold">{data.label}</p>

                <p className="text-[#00E5FF] text-lg font-bold mt-1">
                  {data.formatted}
                </p>

                {data.change !== 0 && (
                  <p
                    className={`text-sm mt-1 ${
                      data.trend === 'up' ? 'text-[#32D74B]' : 'text-[#FF453A]'
                    }`}
                  >
                    {data.trend === 'up' ? '▲' : '▼'} {data.percent}% so với
                    tháng trước
                  </p>
                )}
              </div>
            );
          }}
        />

        <Bar dataKey="amount">
          {data.map((entry) => (
            <Cell
              key={entry.month}
              fill={
                entry.month === currentMonth
                  ? '#00E5FF' // highlight tháng hiện tại
                  : entry.trend === 'down'
                    ? '#FF453A' // đỏ nếu giảm
                    : '#32D74B' // xanh nếu tăng
              }
              opacity={entry.month === currentMonth ? 1 : 0.75}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
