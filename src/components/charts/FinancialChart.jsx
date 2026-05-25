import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

export default function FinancialChart({ data = [], period = 'month' }) {
  if (!data?.length) {
    return (
      <div className="text-[#98989D] text-center py-8">Không có dữ liệu</div>
    );
  }

  const currentDate = new Date();

  const getCurrentValue = () => {
    switch (period) {
      case 'day':
        return currentDate.getDate();
      case 'week':
        return Math.ceil(currentDate.getDate() / 7);
      case 'month':
        return currentDate.getMonth() + 1;
      case 'year':
        return currentDate.getFullYear();
      default:
        return null;
    }
  };

  const currentValue = getCurrentValue();

  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }

    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }

    return value;
  };

  const renderTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const item = payload[0].payload;

    return (
      <div className="bg-[#1E1E1E] border border-[#2C2C2E] p-4 rounded-xl shadow-lg">
        <p className="text-white font-semibold">{item.label}</p>

        <p className="text-[#00E5FF] text-lg font-bold mt-1">
          {item.formatted}
        </p>
      </div>
    );
  };

  const isBarChart = period === 'month' || period === 'year';

  if (isBarChart) {
    return (
      <div className="w-full h-[300px] pl-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid stroke="#2C2C2E" strokeDasharray="4 4" />

            <XAxis dataKey="label" stroke="#98989D" />

            <YAxis stroke="#98989D" width={70} tickFormatter={formatYAxis} />

            <Tooltip content={renderTooltip} />

            <Bar dataKey="amount">
              {data.map((item) => (
                <Cell
                  key={item.label}
                  fill={
                    item.value === currentValue
                      ? '#00E5FF'
                      : item.trend === 'down'
                        ? '#FF453A'
                        : '#32D74B'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] pl-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid stroke="#2C2C2E" strokeDasharray="4 4" />

          <XAxis dataKey="label" stroke="#98989D" />

          <YAxis stroke="#98989D" width={70} tickFormatter={formatYAxis} />

          <Tooltip content={renderTooltip} />

          <Line
            dataKey="amount"
            stroke="#00E5FF"
            strokeWidth={3}
            dot={({ cx, cy, payload }) => (
              <circle
                cx={cx}
                cy={cy}
                r={payload.value === currentValue ? 6 : 4}
                fill={payload.trend === 'down' ? '#FF453A' : '#32D74B'}
              />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
