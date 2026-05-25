import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import ChartWrapper from '../components/ui/ChartWrapper';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import Table from '../components/ui/Table';
import ProgressBar from '../components/ui/ProgressBar';
import FinancialChart from '../components/charts/FinancialChart';

import { apiBudgets, apiCharts } from '../services/api';
import { formatVND } from '../shared/utils/format';
import Savings from './Savings';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  const [data, setData] = useState(null);

  const [period, setPeriod] = useState('month');
  const [chartData, setChartData] = useState([]);
  const [budgets, setBudgets] = useState([]);

  // fetch dashboard summary
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const res = await apiCharts.dashboard();

        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.log('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    const fetchBudgetInCurrentMonth = async () => {
      try {
        setLoading(true);

        const filter = {
          period,
        };

        const res = await apiBudgets.get(filter);

        setBudgets(res.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetInCurrentMonth();
  }, []);

  // fetch chart by period
  useEffect(() => {
    const fetchChart = async () => {
      try {
        setChartLoading(true);

        const res = await apiCharts.getByPeriod(period);

        if (res.status === 200) {
          setChartData(res.data);
        }
      } catch (error) {
        console.log('Chart error:', error);
      } finally {
        setChartLoading(false);
      }
    };

    fetchChart();
  }, [period]);

  if (loading) {
    return <Loader className="mt-20" />;
  }

  if (!data) {
    return <EmptyState message="Không tìm thấy dữ liệu tổng quan" />;
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white">Tổng quan tài chính</h1>

        <p className="text-[#98989D] mt-3 text-lg">
          Theo dõi chi tiêu, tiết kiệm và xu hướng tài chính
        </p>
      </div>

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* BALANCE HERO */}
        <div className="xl:col-span-2">
          <Card className="h-full flex flex-col justify-between p-8">
            <div>
              <p className="text-[#98989D] text-sm uppercase tracking-[3px] mb-4">
                Số dư hiện tại
              </p>

              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                {formatVND(data.remainingBalance)}
              </h2>

              <p className="text-[#98989D] mt-4 max-w-xl">
                Tổng số tiền còn lại sau khi đã tính toàn bộ chi tiêu, tiết kiệm
                và khấu trừ.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              <div className="bg-[#1E1E1E] rounded-2xl p-5">
                <p className="text-[#98989D] text-sm mb-2">Thu nhập</p>

                <p className="text-2xl font-bold text-green-500">
                  {formatVND(data.totalIncome)}
                </p>
              </div>

              <div className="bg-[#1E1E1E] rounded-2xl p-5">
                <p className="text-[#98989D] text-sm mb-2">Chi tiêu</p>

                <p className="text-2xl font-bold text-red-500">
                  {formatVND(data.totalExpenses)}
                </p>
              </div>

              <div className="bg-[#1E1E1E] rounded-2xl p-5">
                <p className="text-[#98989D] text-sm mb-2">Tiết kiệm</p>

                <p className="text-2xl font-bold text-blue-500">
                  {formatVND(data.totalSavings)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* QUICK STATS */}
        <div className="space-y-6">
          <Card>
            <p className="text-[#98989D] text-sm mb-3">Tổng khấu trừ</p>

            <h3 className="text-3xl font-bold text-yellow-500">
              {formatVND(data.totalDeductions)}
            </h3>
          </Card>

          <Card>
            <p className="text-[#98989D] text-sm mb-3">Số dư khả dụng</p>

            <h3 className="text-3xl font-bold text-primary">
              {formatVND(data.remainingBalance)}
            </h3>
          </Card>

          <Card>
            <p className="text-[#98989D] text-sm mb-3">Tỷ lệ tiết kiệm</p>

            <h3 className="text-3xl font-bold text-cyan-400">
              {Math.round((data.totalSavings / (data.totalIncome || 1)) * 100)}%
            </h3>
          </Card>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT CONTENT */}
        <div className="xl:col-span-8 space-y-6">
          {/* CHART */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Biểu đồ mức độ chi tiêu
                </h2>
              </div>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-[#1E1E1E] text-white px-4 py-3 rounded-xl outline-none"
              >
                <option value="day">Ngày</option>
                <option value="week">Tuần</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
              </select>
            </div>

            <ChartWrapper>
              {chartLoading ? (
                <Loader />
              ) : (
                <FinancialChart data={chartData} period={period} />
              )}
            </ChartWrapper>
          </Card>

          {/* RECENT EXPENSES */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Chi tiêu gần đây
              </h2>

              <p className="text-[#98989D] mt-1">
                Danh sách các khoản chi tiêu mới nhất
              </p>
            </div>

            {data.recentExpenses?.length > 0 ? (
              <Table
                columns={[
                  { key: 'date', title: 'Ngày' },
                  { key: 'categoryName', title: 'Danh mục' },
                  { key: 'amount', title: 'Số tiền' },
                  { key: 'note', title: 'Ghi chú' },
                ]}
                data={data.recentExpenses}
              />
            ) : (
              <EmptyState message="Chưa có khoản chi tiêu nào" />
            )}
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="xl:col-span-4 space-y-6">
          {/* SAVINGS */}
          <Savings />

          {/* BUDGET */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Ngân sách</h2>

              <p className="text-[#98989D] mt-1">
                Theo dõi tiến độ sử dụng ngân sách
              </p>
            </div>

            {budgets?.length > 0 ? (
              <div className="space-y-5">
                {budgets.map((budget) => {
                  const percent = Math.min(
                    Math.round((budget.used / budget.limitAmount) * 100),
                    100,
                  );

                  return (
                    <div
                      key={budget.id}
                      className="bg-[#1E1E1E] border border-[#2C2C2E] rounded-2xl p-5"
                    >
                      {/* TOP */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {budget.name}
                          </h3>

                          <p className="text-[#98989D] text-sm mt-1">
                            {budget.startDate} → {budget.endDate}
                          </p>
                        </div>

                        <div
                          className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${
                  percent >= 90
                    ? 'bg-red-500/20 text-red-400'
                    : percent >= 70
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                }
              `}
                        >
                          {percent}%
                        </div>
                      </div>

                      {/* MONEY */}
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-[#98989D]">
                          Đã dùng: {formatVND(budget.used)}
                        </span>

                        <span className="text-white font-medium">
                          {formatVND(budget.limitAmount)}
                        </span>
                      </div>

                      {/* PROGRESS */}
                      <ProgressBar
                        value={budget.used}
                        max={budget.limitAmount}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState message="Chưa có dữ liệu ngân sách" />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
