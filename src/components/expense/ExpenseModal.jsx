import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExpenseModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    Category: '',
    Amount: '',
    Note: '',
  });

  const handleSubmit = () => {
    // 🚨 VALIDATION (QUAN TRỌNG)
    if (!form.Category || !form.Amount) {
      alert('Nhập Category + Amount đi đã 🐰');
      return;
    }

    onAdd({
      id: Date.now(),
      Category: form.Category,
      Amount: Number(form.Amount),
      Month: 'May',
      WeekDate: new Date().toISOString().slice(0, 10),
      Note: form.Note || '',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111827] p-6 rounded-2xl w-[320px] border border-white/10"
      >
        <h2 className="text-white text-lg mb-4">➕ Thêm Expense</h2>

        {/* CATEGORY */}
        <input
          placeholder="Category (Food, Shopping...)"
          value={form.Category}
          onChange={(e) => setForm({ ...form, Category: e.target.value })}
          className="w-full p-2 mb-2 rounded bg-black/40 text-white border border-white/10"
        />

        {/* AMOUNT */}
        <input
          placeholder="Amount (VD: 200000)"
          value={form.Amount}
          onChange={(e) => setForm({ ...form, Amount: e.target.value })}
          className="w-full p-2 mb-2 rounded bg-black/40 text-white border border-white/10"
        />

        {/* NOTE */}
        <input
          placeholder="Note"
          value={form.Note}
          onChange={(e) => setForm({ ...form, Note: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-black/40 text-white border border-white/10"
        />

        {/* BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-orange-400 text-black py-2 rounded-xl hover:scale-105 transition"
          >
            🥕 Add
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
