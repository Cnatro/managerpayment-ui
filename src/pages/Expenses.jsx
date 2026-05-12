import { useState } from 'react';
import FloatingBackground from '../components/expense/FloatingBackground';
import RabbitSection from '../components/expense/RabbitSection';
import FilterBar from '../components/expense/FilterBar';
import ExpenseCard from '../components/expense/ExpenseCard';
import ExpenseModal from '../components/expense/ExpenseModal';
import { CarrotBurst } from '../components/expense/CarrotBurst';

export const expenses = [
  {
    id: 1,
    Category: 'Food',
    Amount: 200000,
    Month: 'May',
    WeekDate: '2026-05-12',
    Note: 'Milk tea 🧋',
  },
  {
    id: 2,
    Category: 'Shopping',
    Amount: 450000,
    Month: 'May',
    WeekDate: '2026-05-10',
    Note: 'Keyboard ⌨️',
  },
];

export const convertToCarrot = (amount) => {
  return Math.floor(amount / 10000); // 10k = 1 🥕
};

export default function ExpensePage() {
  const [data, setData] = useState(expenses);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('Tất cả');

  // 🧠 rabbit state engine
  const [lastAction, setLastAction] = useState(null);

  // 💥 carrot burst effect
  const [burst, setBurst] = useState(false);

  const total = data.reduce((a, b) => a + b.Amount, 0);
  const carrots = Math.floor(total / 10000);

  const filtered =
    filter === 'Tất cả' ? data : data.filter((d) => d.Category === filter);

  // =========================
  // ➕ ADD EXPENSE
  // =========================
  const addExpense = (item) => {
    setData((prev) => [item, ...prev]);

    setLastAction('add');

    // trigger effect
    setBurst(true);
    setTimeout(() => setBurst(false), 900);
  };

  // =========================
  // ❌ DELETE EXPENSE
  // =========================
  const deleteExpense = (id) => {
    setData((prev) => prev.filter((d) => d.id !== id));

    setLastAction('delete');

    setBurst(true);
    setTimeout(() => setBurst(false), 900);
  };

  // =========================
  // ✏️ UPDATE (future ready)
  // =========================
  const updateExpense = (updated) => {
    setData((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));

    setLastAction('update');
  };

  return (
    <div className="min-h-screen p-5 relative overflow-hidden bg-[#0B0F1A] text-white">
      {/* 🌈 BACKGROUND */}
      <FloatingBackground />

      {/* 💥 CARROT BURST EFFECT */}
      <CarrotBurst show={burst} />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h1 className="text-2xl font-bold">🐰</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-orange-400 px-4 py-2 rounded-xl text-white hover:scale-105 transition"
        >
          ➕ Thêm
        </button>
      </div>

      {/* 🐰 RABBIT CORE */}
      <div className="relative z-10">
        <RabbitSection
          carrots={carrots}
          totalSpent={total}
          lastAction={lastAction}
        />
      </div>

      {/* FILTER */}
      <div className="mt-4 relative z-10">
        <FilterBar setFilter={setFilter} />
      </div>

      {/* EXPENSE LIST */}
      <div className="space-y-3 mt-4 relative z-10">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            🐰 Không có tiêu nào... bé thỏ đang ngủ 😴
          </div>
        ) : (
          filtered.map((item) => (
            <ExpenseCard key={item.id} item={item} onDelete={deleteExpense} />
          ))
        )}
      </div>

      {/* MODAL */}
      {open && (
        <ExpenseModal onClose={() => setOpen(false)} onAdd={addExpense} />
      )}
    </div>
  );
}
