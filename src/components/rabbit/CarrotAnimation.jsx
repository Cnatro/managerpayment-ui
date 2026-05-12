import { motion } from 'framer-motion';

export default function CarrotAnimation() {
  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute left-1/2 bottom-10 text-5xl z-20"
    >
      🥕
    </motion.div>
  );
}
