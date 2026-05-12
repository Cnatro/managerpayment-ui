import React from 'react';
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
        <div className="bg-[#1E1E1E] rounded-2xl p-4 border border-[#2C2C2E]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#98989D']">Ngân sách tháng</span>

            <span className="text-[#32D74B] text-xs font-medium">
              Đang hoạt động
            </span>
          </div>

          <h3 className="text-white text-xl font-bold font-mono">$4,200</h3>

          <div className="w-full h-2 bg-[#2C2C2E] rounded-full mt-3">
            <div className="w-[65%] h-full bg-[#00E5FF] rounded-full"></div>
          </div>

          <p className="text-[#98989D] text-xs mt-2">
            Đã sử dụng 65% ngân sách
          </p>
        </div>
      </div>
    </aside>
  );
}
