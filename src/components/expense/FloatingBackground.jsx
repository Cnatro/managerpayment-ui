import { motion } from 'framer-motion';

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute w-[400px] h-[400px] bg-orange-300 blur-[120px] opacity-40"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-200 blur-[120px] opacity-40"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
    </div>
  );
}
