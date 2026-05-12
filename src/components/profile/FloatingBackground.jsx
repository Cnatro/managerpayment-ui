import { motion } from 'framer-motion';

export default function FloatingBackground() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          initial={{
            y: '100vh',
            x: Math.random() * window.innerWidth,
          }}
          animate={{
            y: '-10vh',
          }}
          transition={{
            repeat: Infinity,
            duration: 15 + Math.random() * 10,
          }}
        >
          🥕
        </motion.div>
      ))}
    </>
  );
}
