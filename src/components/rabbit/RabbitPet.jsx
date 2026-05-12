import { motion } from 'framer-motion';

export default function RabbitPet({ balance, feeding, feedAmount = 0 }) {
  let baseScale = 0.5;

  if (balance > 50000000) baseScale = 1.8;
  else if (balance > 20000000) baseScale = 1.5;
  else if (balance > 10000000) baseScale = 1.1;

  // 🎯 growth khi feed
  const feedBoost = feeding ? feedAmount / 10000000 : 0;

  const scale = baseScale + feedBoost;

  return (
    <div className="relative flex items-center justify-center">
      {/* 🥕 feeding effect */}
      {feeding && (
        <div className="absolute text-3xl animate-bounce">🥕 🥕 🥕</div>
      )}

      <motion.div
        animate={{ scale }}
        transition={{ duration: 1 }}
        className="text-8xl"
      >
        🐰
      </motion.div>
    </div>
  );
}
