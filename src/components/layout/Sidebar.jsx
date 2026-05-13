import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  PiggyBank,
  Landmark,
  Tags,
  Zap,
} from 'lucide-react';
import { apiCharts } from '../../services/api';
import { formatVND } from '../../shared/utils/format';

const navItems = [
  {
    label: 'Tổng quan',
    to: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Chi tiêu',
    to: '/expenses',
    icon: Receipt,
  },
  {
    label: 'Theo dõi ngân sách',
    to: '/budget',
    icon: Wallet,
  },
  {
    label: 'Phân tích tiết kiệm',
    to: '/savings',
    icon: PiggyBank,
  },
  {
    label: 'Thu nhập',
    to: '/income',
    icon: Landmark,
  },
  {
    label: 'Danh mục',
    to: '/categories',
    icon: Tags,
  },
];

export default function Sidebar() {
  const [loading, setLoading] = useState(true);
  const [processingData, setProcessingData] = useState({});

  const fetchProcessing = async () => {
    try {
      setLoading(true);

      const res = await apiCharts.processing();
      setProcessingData(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcessing();
  }, []);

  const budget = processingData?.[0] || {};

  const totalBudget = budget.amount || 0;
  const totalExpense = budget.totalExpense || 0;
  const remaining = budget.used || 0;

  const percentUsed = totalBudget ? (totalExpense / totalBudget) * 100 : 0;

  const progressWidth = Math.min(percentUsed, 100);
  const isOverBudget = remaining < 0;

  return (
    <aside className="h-screen w-72 bg-[#121212] border-r border-[#2C2C2E] flex flex-col">
      {/* Logo */}
      <div className="h-20 px-6 flex items-center border-b border-[#2C2C2E]">
        <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 flex items-center justify-center mr-3">
          <Zap className="text-[#00E5FF]" size={24} />
        </div>

        <div>
          <h1 className="text-white font-semibold text-lg tracking-wide">
            Quản lý tài chính
          </h1>
          <p className="text-[#98989D] text-xs">
            Kiểm soát chi tiêu thông minh
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-3 rounded-2xl
                transition-all duration-200
                ${
                  isActive
                    ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 shadow-lg shadow-cyan-500/10'
                    : 'text-[#98989D] hover:bg-[#1E1E1E] hover:text-white'
                }
              `
              }
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Status Panel */}
      <div className="p-4 border-t border-[#2C2C2E]">
        <div className="relative overflow-hidden rounded-3xl p-5 border border-white/5 bg-gradient-to-br from-[#1E1E1E] to-[#141414] shadow-lg">
          {/* glow effect */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 blur-3xl rounded-full" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-[#98989D]">Ngân sách tháng</p>
              <h3 className="text-white text-2xl font-bold mt-1">
                {formatVND(totalBudget)}
              </h3>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isOverBudget
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-green-500/20 text-green-400'
              }`}
            >
              {isOverBudget ? 'Vượt mức' : 'Ổn định'}
            </div>
          </div>

          {/* Expense info */}
          <div className="relative z-10 flex justify-between text-sm mb-3">
            <div>
              <p className="text-[#98989D]">Đã chi</p>
              <p className="text-white font-semibold">
                {formatVND(totalExpense)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[#98989D]">
                {isOverBudget ? 'Vượt' : 'Còn lại'}
              </p>
              <p
                className={`font-semibold ${
                  isOverBudget ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {formatVND(Math.abs(remaining))}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="relative z-10">
            <div className="w-full h-3 bg-[#2C2C2E] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isOverBudget
                    ? 'bg-gradient-to-r from-red-400 to-red-500'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                }`}
                style={{ width: `${progressWidth}%` }}
              />
            </div>

            <p className="text-xs text-[#98989D] mt-2">
              {isOverBudget
                ? `Bạn đã vượt ${formatVND(Math.abs(remaining))}`
                : `Đã sử dụng ${percentUsed.toFixed(1)}% ngân sách`}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
