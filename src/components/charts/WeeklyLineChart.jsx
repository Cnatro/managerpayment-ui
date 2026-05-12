import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Dot,
} from 'recharts';

export default function WeeklyLineChart({ data = [] }) {
  if (!data?.length)
    return (
      <div className="text-[#98989D] text-center py-8">Không có dữ liệu</div>
    );

  const currentWeek = Math.ceil(new Date().getDate() / 7);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid stroke="#2C2C2E" strokeDasharray="4 4" />

        <XAxis dataKey="label" stroke="#98989D" />

        <YAxis stroke="#98989D" />

        {/* TOOLTIP CARD */}
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
                    tuần trước
                  </p>
                )}
              </div>
            );
          }}
        />

        <Line
          type="monotone"
          dataKey="amount"
          stroke="#00E5FF"
          strokeWidth={3}
          dot={({ cx, cy, payload }) => {
            const isCurrent = payload.week === currentWeek;

            return (
              <circle
                cx={cx}
                cy={cy}
                r={isCurrent ? 6 : 4}
                fill={payload.trend === 'down' ? '#FF453A' : '#32D74B'}
                stroke={isCurrent ? '#00E5FF' : 'none'}
                strokeWidth={2}
              />
            );
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
