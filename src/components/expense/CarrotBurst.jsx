import { motion } from 'framer-motion';

export function CarrotBurst({ show }) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0.8],
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
            opacity: [1, 1, 0],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 0.9,
            ease: 'easeOut',
          }}
          className="absolute left-1/2 top-1/2 text-2xl"
        >
          🥕
        </motion.div>
      ))}
    </div>
  );
}
