import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function RabbitSection({
  carrots,
  totalSpent,
  lastAction, // "add" | "delete" | "update"
}) {
  const [emotion, setEmotion] = useState('idle');
  const [floatingText, setFloatingText] = useState(null);

  // 🧠 emotion engine
  useEffect(() => {
    if (lastAction === 'add') {
      setEmotion('eat');
      setFloatingText('-🥕');
    }

    if (lastAction === 'delete') {
      setEmotion('happy');
      setFloatingText('+🥕');
    }

    if (carrots === 0) setEmotion('sad');
    else if (carrots > 50) setEmotion('excited');
    else setEmotion('idle');

    const t = setTimeout(() => setFloatingText(null), 1200);
    return () => clearTimeout(t);
  }, [lastAction, carrots]);

  const rabbitEmojis = {
    idle: '🐰🐵',
    happy: '🐰🐵✨',
    excited: '🐰🐵🤩',
    sad: '🐰🐵🥺',
    eat: '🐰🐵😋',
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 text-center bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
      {/* 🌈 BACKGROUND GLOW (FIXED - không che text) */}
      <motion.div
        animate={{
          scale: emotion === 'sad' ? 1.05 : 1,
          opacity: emotion === 'excited' ? 0.25 : 0.15,
        }}
        className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-300/10 blur-3xl pointer-events-none z-0"
      />

      {/* 🐰 RABBIT */}
      <motion.div
        key={emotion}
        initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
        animate={{
          scale: 1,
          rotate: emotion === 'eat' ? [0, -10, 10, 0] : 0,
          y: emotion === 'excited' ? [0, -10, 0] : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.6 }}
        className="text-6xl relative z-20 drop-shadow-lg"
      >
        {rabbitEmojis[emotion]}
      </motion.div>

      {/* 🥕 CARROT INFO (FIX TEXT READABILITY) */}
      <div className="mt-3 text-sm text-white/90 relative z-20 font-medium">
        Carrot: <b className="text-orange-300">{carrots} 🥕</b>
      </div>

      <div className="text-xs text-white/60 relative z-20">
        Chi tiêu:{' '}
        <span className="text-white/90 font-semibold">
          {totalSpent.toLocaleString()}đ
        </span>
      </div>

      {/* 💥 FLOATING FEEDBACK TEXT (GAME STYLE) */}
      <AnimatePresence>
        {floatingText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1.2 }}
            exit={{ opacity: 0, y: -60 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 text-xl font-extrabold text-orange-300 drop-shadow-lg z-30"
          >
            {floatingText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🥕 FLOATING CARROT ICON */}
      <motion.div
        className="absolute top-3 right-3 text-2xl z-20 drop-shadow"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
      >
        🥕
      </motion.div>
    </div>
  );
}
