import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { formatVND } from '../../shared/utils/format';

export default function ExpenseModal({
  onClose,
  onAdd,
  onUpdate,
  editItem,
  categories = [],
}) {
  const [form, setForm] = useState({
    categoryId: '',
    amount: '',
    note: '',
    date: '',
  });

  // =========================
  // INIT FORM WHEN EDIT
  // =========================
  useEffect(() => {
    if (editItem) {
      setForm({
        categoryId: editItem.categoryId || '',
        amount: editItem.amount || '',
        note: editItem.note || '',
        date: editItem.date || '',
      });
    } else {
      setForm({
        categoryId: '',
        amount: '',
        note: '',
        date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [editItem]);

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = () => {
    if (!form.categoryId || !form.amount) {
      alert('Chọn category + nhập amount 🐰');
      return;
    }

    const payload = {
      ...editItem,
      categoryId: Number(form.categoryId),
      amount: Number(form.amount),
      note: form.note || '',
      date: form.date || new Date().toISOString().slice(0, 10),
    };

    if (editItem) {
      onUpdate(payload);
    } else {
      onAdd(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111827] p-6 rounded-2xl w-[340px] border border-white/10"
      >
        <h2 className="text-white text-lg mb-4">
          {editItem ? '✏️ Edit Expense' : '➕ Thêm Expense'}
        </h2>

        {/* ================= CATEGORY SELECT ================= */}
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          className="w-full p-3 mb-2 rounded-lg bg-[#1f2937] text-white border border-white/10 outline-none focus:border-orange-400 transition"
        >
          <option value="">-- Chọn danh mục --</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id} className="text-black">
              {c.icon} {c.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full p-2 mb-2 rounded bg-black/40 text-white border border-white/10"
        />

        {/* ================= AMOUNT ================= */}
        <input
          placeholder="Amount (VD: 200000)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full p-2 mb-2 rounded bg-black/40 text-white border border-white/10"
        />

        <div className="text-green-400 text-sm mt-1">
          {form.amount > 0 && formatVND(form.amount)}
        </div>

        {/* ================= NOTE ================= */}
        <textarea
          placeholder="Note"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-black/40 text-white border border-white/10"
        />

        {/* ================= BUTTONS ================= */}
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-orange-400 text-black py-2 rounded-xl hover:scale-105 transition"
          >
            {editItem ? '🥕 Update' : '🥕 Add'}
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-white/10 text-white py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
