import { useEffect, useState } from 'react';
import FloatingBackground from '../components/expense/FloatingBackground';
import RabbitSection from '../components/expense/RabbitSection';
import FilterBar from '../components/expense/FilterBar';
import ExpenseCard from '../components/expense/ExpenseCard';
import ExpenseModal from '../components/expense/ExpenseModal';
import { CarrotBurst } from '../components/expense/CarrotBurst';
import { apiCategories, apiExpenses } from '../services/api';
import Loader from '../components/ui/Loader';

export const convertToCarrot = (amount) => {
  return Math.floor(amount / 10000); // 10k = 1 🥕
};

export default function Expenses() {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('Tất cả');

  // 🧠 rabbit state engine
  const [lastAction, setLastAction] = useState(null);

  // 💥 carrot burst effect
  const [burst, setBurst] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const total = expenses.reduce((a, b) => a + b.amount, 0);
  const carrots = Math.floor(total / 10000);

  const filtered =
    filter === 'Tất cả'
      ? expenses
      : expenses.filter((d) => d.categoryId === Number(filter));

  // GET
  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const res = await apiExpenses.get();
      setExpenses(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await apiCategories.get();
      setCategories(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);
  // =========================
  // ➕ ADD EXPENSE
  // =========================
  const addExpense = async (item) => {
    try {
      setLoading(true);
      const res = await apiExpenses.create(item);

      if (res.status === 201) {
        setExpenses((prev) => [item, ...prev]);

        setLastAction('add');

        // trigger effect
        setBurst(true);
        setTimeout(() => setBurst(false), 900);
      }
    } catch (error) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ❌ DELETE EXPENSE
  // =========================
  const deleteExpense = async (id) => {
    try {
      setLoading(true);
      const res = await apiExpenses.delete(id);

      if (res.status === 200) {
        setExpenses((prev) => prev.filter((d) => d.id !== id));

        setLastAction('delete');

        setBurst(true);
        setTimeout(() => setBurst(false), 900);
      }
    } catch (error) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ✏️ UPDATE (future ready)
  // =========================
  const updateExpense = async (updated) => {
    try {
      setLoading(true);
      const res = await apiExpenses.update(updated.id, updated);

      if (res.status === 200) {
        setExpenses((prev) =>
          prev.map((d) => (d.id === updated.id ? updated : d)),
        );

        setLastAction('update');
      }
    } catch (error) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (item) => {
    setEditItem(item);
    setOpen(true);
  };

  const categoryMap = categories.reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {});

  if (loading) return <Loader className="mt-20" />;

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
          onClick={() => {
            setEditItem(null);
            setOpen(true);
          }}
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
        <FilterBar setFilter={setFilter} categories={categories} />
      </div>

      {/* EXPENSE LIST */}
      <div className="space-y-3 mt-4 relative z-10">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            🐰 Không có tiêu nào... bé thỏ đang ngủ 😴
          </div>
        ) : (
          filtered.map((item) => (
            <ExpenseCard
              key={item.id}
              item={item}
              category={categoryMap[item.categoryId]}
              onDelete={deleteExpense}
              onEdit={onEdit}
            />
          ))
        )}
      </div>

      {/* MODAL */}
      {open && (
        <ExpenseModal
          onClose={() => setOpen(false)}
          onAdd={addExpense}
          onUpdate={updateExpense}
          editItem={editItem}
          categories={categories}
        />
      )}
    </div>
  );
}
