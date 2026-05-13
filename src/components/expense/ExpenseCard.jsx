import { motion } from 'framer-motion';

export default function ExpenseCard({ item, category, onDelete, onEdit }) {
  const carrots = Math.floor(item.amount / 10000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="glass p-4 flex justify-between items-center shadow-lg"
    >
      {/* LEFT */}
      <div>
        <p className="font-bold">{category?.name || 'Unknown'}</p>

        <p className="text-xs text-gray-600">{item.note}</p>

        <p className="text-xs mt-1">
          {item.amount.toLocaleString()}đ = {carrots} 🥕
        </p>

        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(item)}
          className="text-blue-400 hover:scale-110 transition cursor-pointer"
        >
          ✏️
        </button>

        <button
          onClick={() => onDelete(item.id, carrots)}
          className="text-red-400 hover:scale-110 transition cursor-pointer"
        >
          ❌
        </button>
      </div>
    </motion.div>
  );
}
