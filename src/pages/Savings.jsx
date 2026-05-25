import React, { useMemo, useState } from 'react';
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
import { CalendarDays } from 'lucide-react';

const dataMap = [
  { month: 1, year: 2026, label: 'T1', amount: 1200 },
  { month: 2, year: 2026, label: 'T2', amount: 1800 },
  { month: 3, year: 2026, label: 'T3', amount: 2400 },
  { month: 4, year: 2026, label: 'T4', amount: 2100 },
  { month: 5, year: 2026, label: 'T5', amount: 3200 },
  { month: 6, year: 2026, label: 'T6', amount: 4100 },
  { month: 7, year: 2025, label: 'T7', amount: 3800 },
  { month: 8, year: 2026, label: 'T8', amount: 5000 },
  { month: 9, year: 2026, label: 'T9', amount: 5000 },
  { month: 10, year: 2026, label: 'T10', amount: 5000 },
  { month: 11, year: 2026, label: 'T11', amount: 5000 },
  { month: 7, year: 2026, label: 'T7', amount: 5000 },
  { month: 12, year: 2026, label: 'T12', amount: 5000 },
];

export default function Savings({ data = [] }) {
  if (!data?.length) {
    data = dataMap;
  }

  const currentDate = new Date();

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const [selectedMonth, setSelectedMonth] = useState('all');

  const years = [...new Set(data.map((item) => item.year))];

  const filteredData = useMemo(() => {
    let filtered = data.filter((item) => item.year === Number(selectedYear));

    if (selectedMonth !== 'all') {
      filtered = filtered.filter(
        (item) => item.month === Number(selectedMonth),
      );
    }

    return filtered;
  }, [data, selectedYear, selectedMonth]);

  const totalMoney = filteredData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-[#1A1A1A] border border-[#2C2C2E] rounded-[32px] p-5">
      {/* TOP */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[#98989D] text-xs uppercase tracking-[3px] mb-2">
            Tiết kiệm
          </p>

          <h2 className="text-xl font-bold text-white leading-tight">
            Số tiền còn lại
          </h2>
        </div>

        <div
          className="
          bg-gradient-to-br
          from-[#00E5FF]/20
          to-[#32D74B]/10
          border border-[#2C2C2E]
          rounded-2xl
          px-4
          py-3
        "
        >
          <p className="text-[#98989D] text-xs mb-1">Tổng</p>

          <h3 className="text-2xl font-bold text-white font-mono">
            ${totalMoney}
          </h3>
        </div>
      </div>
      {/* FILTER */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-[#202020] border border-[#2C2C2E] px-3 py-3 rounded-2xl">
          <CalendarDays size={16} className="text-[#98989D]" />

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent text-sm text-white outline-none border-none w-full"
          >
            <option value="all">Tất cả</option>

            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1} className="bg-[#1A1A1A]">
                T{i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 bg-[#202020] border border-[#2C2C2E] px-3 py-3 rounded-2xl">
          <CalendarDays size={16} className="text-[#98989D]" />

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-transparent text-sm text-white outline-none border-none w-full"
          >
            {years.map((year) => (
              <option key={year} value={year} className="bg-[#1A1A1A]">
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* MINI CHART */}
      {!filteredData.length ? (
        <div className="text-center py-16 text-[#98989D]">Không có dữ liệu</div>
      ) : (
        <div className="h-[260px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{
                top: 10,
                right: 0,
                left: -25,
                bottom: 0,
              }}
            >
              <CartesianGrid
                stroke="#2C2C2E"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                stroke="#777"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                stroke="#777"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `$${v}`}
              />

              <Tooltip
                cursor={{
                  fill: 'rgba(255,255,255,0.03)',
                }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;

                  const item = payload[0].payload;

                  return (
                    <div className="bg-[#1E1E1E] border border-[#2C2C2E] rounded-2xl p-4">
                      <p className="text-white font-semibold">
                        {item.label}/{item.year}
                      </p>

                      <p className="text-[#00E5FF] text-xl font-bold mt-2">
                        ${item.amount}
                      </p>
                    </div>
                  );
                }}
              />

              <Bar dataKey="amount" radius={[10, 10, 0, 0]} barSize={28}>
                {filteredData.map((entry, index) => {
                  const isCurrent =
                    entry.month === currentDate.getMonth() + 1 &&
                    entry.year === currentDate.getFullYear();

                  return (
                    <Cell
                      key={index}
                      fill={isCurrent ? '#00E5FF' : '#32D74B'}
                      opacity={isCurrent ? 1 : 0.7}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
