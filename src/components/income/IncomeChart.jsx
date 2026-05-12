import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// =========================
// format + sort data
// =========================
const formatChartData = (data = []) => {
  return data
    .map((item) => {
      const [month, year] = item.month.split('/');
      return {
        ...item,
        sortKey: new Date(year, month - 1), // sort đúng thời gian
      };
    })
    .sort((a, b) => a.sortKey - b.sortKey);
};

// =========================
// format tiền VN
// =========================
const formatVND = (value) => new Intl.NumberFormat('vi-VN').format(value) + 'đ';

export default function IncomeChart({ data = [] }) {
  const chartData = formatChartData(data);

  return (
    <div className="bg-[#1E1E1E] p-5 rounded-2xl h-[300px] shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          {/* X axis (tháng) */}
          <XAxis
            dataKey="month"
            tick={{ fill: '#aaa', fontSize: 12 }}
            axisLine={{ stroke: '#333' }}
          />

          {/* Y axis (tiền) */}
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat('vi-VN', {
                notation: 'compact',
              }).format(value)
            }
            tick={{ fill: '#aaa', fontSize: 12 }}
            axisLine={{ stroke: '#333' }}
          />

          {/* Tooltip đẹp hơn */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#111',
              border: '1px solid #333',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
            formatter={(value) => [formatVND(value), 'Thu nhập']}
            labelFormatter={(label) => `Tháng: ${label}`}
          />

          {/* LINE */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00E5FF"
            strokeWidth={3}
            dot={{ r: 4, fill: '#00E5FF' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
