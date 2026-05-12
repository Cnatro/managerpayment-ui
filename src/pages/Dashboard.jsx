import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import ChartWrapper from '../components/ui/ChartWrapper';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import WeeklyLineChart from '../components/charts/WeeklyLineChart';
import Table from '../components/ui/Table';
import ProgressBar from '../components/ui/ProgressBar';
import { apiCharts } from '../services/api';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [monthlyChart, setMonthlyChart] = useState(null);
  const [weeklyChart, setWeeklyChart] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      
      apiCharts.dashboard().then((res) => res.data),
      apiCharts.monthly().then((res) => res.data),
      apiCharts.weekly().then((res) => res.data),
    ])
      .then(([dashboard, monthly, weekly]) => {
        console.log('dashboard response:', dashboard);
        console.log('monthly response:', monthly);
        console.log('weekly response:', weekly);
        setData(dashboard);
        setMonthlyChart(monthly);
        setWeeklyChart(weekly);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader className="mt-20" />;
  if (!data) return <EmptyState message="No dashboard data found" />;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Tổng quan tài chính</h1>

        <p className="text-[#98989D] mt-2">
          Theo dõi chi tiêu, tiết kiệm và xu hướng tài chính
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card title="Total Income" className="text-center">
          <div className="text-2xl font-bold text-green-600">
            ${data.totalIncome}
          </div>
        </Card>
        <Card title="Total Expenses" className="text-center">
          <div className="text-2xl font-bold text-red-500">
            ${data.totalExpenses}
          </div>
        </Card>
        <Card title="Total Savings" className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            ${data.totalSavings}
          </div>
        </Card>
        <Card title="Total Deductions" className="text-center">
          <div className="text-2xl font-bold text-yellow-500">
            ${data.totalDeductions}
          </div>
        </Card>
        <Card title="Remaining Balance" className="text-center">
          <div className="text-2xl font-bold text-primary">
            ${data.remainingBalance}
          </div>
        </Card>
      </div>

      {/* Charts & Table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <ChartWrapper title="Thống kê theo tháng">
          <MonthlyBarChart data={monthlyChart} />
        </ChartWrapper>
        <ChartWrapper title="Thống kê theo tuần">
          <WeeklyLineChart data={weeklyChart} />
        </ChartWrapper>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Recent Expenses Table */}
        <Card title="Recent Expenses">
          {data.recentExpenses && data.recentExpenses.length > 0 ? (
            <Table
              columns={[
                { key: 'date', title: 'Date' },
                { key: 'category', title: 'Category' },
                { key: 'amount', title: 'Amount' },
                { key: 'note', title: 'Note' },
              ]}
              data={data.recentExpenses}
            />
          ) : (
            <EmptyState message="No recent expenses" />
          )}
        </Card>

        {/* Budget Progress Section */}
        <Card title="Budget Progress">
          {data.budgets && data.budgets.length > 0 ? (
            <div className="space-y-4">
              {data.budgets.map((budget) => (
                <div key={budget.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{budget.category}</span>
                    <span>
                      {budget.used} / {budget.limit}
                    </span>
                  </div>
                  <ProgressBar value={budget.used} max={budget.limit} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No budget data" />
          )}
        </Card>
      </div>

      {/* Savings Summary Section */}
      <Card title="Savings Summary" className="mb-8">
        {data.savingsSummary && data.savingsSummary.length > 0 ? (
          <Table
            columns={[
              { key: 'type', title: 'Type' },
              { key: 'amount', title: 'Amount' },
              { key: 'note', title: 'Note' },
            ]}
            data={data.savingsSummary}
          />
        ) : (
          <EmptyState message="No savings data" />
        )}
      </Card>
    </div>
  );
}
