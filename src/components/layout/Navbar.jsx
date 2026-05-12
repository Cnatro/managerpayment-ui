import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  Search,
  Activity,
  User,
  Settings,
  LogOut,
  UserCircle,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // click ngoài dropdown -> đóng
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-20 bg-[#121212] border-b border-[#2C2C2E] px-6 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-white text-2xl font-semibold">Bảng điều khiển</h1>

        <p className="text-[#98989D] text-sm mt-1">
          Theo dõi tài chính theo thời gian thực
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 relative">
        {/* Search */}
        <div className="hidden md:flex items-center bg-[#1E1E1E] border border-[#2C2C2E] rounded-2xl px-4 py-2 w-64">
          <Search size={18} className="text-[#98989D]" />

          <input
            type="text"
            placeholder="Tìm kiếm giao dịch..."
            className="bg-transparent outline-none text-white ml-2 w-full placeholder-[#98989D]"
          />
        </div>

        {/* Live */}
        <div className="flex items-center gap-2 bg-[#1E1E1E] border border-[#2C2C2E] px-4 py-2 rounded-2xl">
          <Activity size={18} className="text-[#32D74B]" />

          <span className="text-[#32D74B] text-sm font-medium">
            Đang hoạt động
          </span>
        </div>

        {/* Notification */}
        <button className="w-11 h-11 bg-[#1E1E1E] border border-[#2C2C2E] rounded-2xl flex items-center justify-center hover:bg-[#252525] transition">
          <Bell size={18} className="text-[#00E5FF]" />
        </button>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 px-3 h-11 bg-[#1E1E1E] border border-[#2C2C2E] rounded-2xl hover:bg-[#252525] transition"
          >
            <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center">
              <User size={16} className="text-[#00E5FF]" />
            </div>

            <ChevronDown
              size={16}
              className={`text-[#98989D] transition ${
                openDropdown ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {openDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-[#1E1E1E] border border-[#2C2C2E] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* User info */}
              {/* <div className="px-4 py-4 border-b border-[#2C2C2E]">
                <p className="text-white font-medium">Nhi Nguyen</p>
                <p className="text-[#98989D] text-sm">nhi@gmail.com</p>
              </div> */}

              {/* Menu item */}
              <button
                className="w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-[#252525] transition text-sm"
                onClick={() => {
                  navigate('/profile');
                  setOpenDropdown(false);
                }}
              >
                <UserCircle size={18} className="text-[#00E5FF]" />
                Hồ sơ cá nhân
              </button>

              <button className="w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-[#252525] transition text-sm">
                <Settings size={18} className="text-[#00E5FF]" />
                Cài đặt
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 flex items-center gap-3 text-[#FF453A] hover:bg-[#252525] transition text-sm border-t border-[#2C2C2E]"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
