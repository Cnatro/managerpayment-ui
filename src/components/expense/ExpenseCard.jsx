import { motion } from 'framer-motion';

export default function ExpenseCard({ item, onDelete }) {
  const carrots = Math.floor(item.Amount / 10000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="glass p-4 flex justify-between items-center shadow-lg"
    >
      <div>
        <p className="font-bold">{item.Category}</p>
        <p className="text-xs text-gray-600">{item.Note}</p>
        <p className="text-xs mt-1">
          {item.Amount.toLocaleString()}đ = {carrots} 🥕
        </p>
      </div>

      <button
        onClick={() => onDelete(item.id, carrots)}
        className="text-red-400 hover:scale-110 transition"
      >
        ❌
      </button>
    </motion.div>
  );
}
