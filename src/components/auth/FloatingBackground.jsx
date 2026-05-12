import { motion } from 'framer-motion';

const FloatingBackground = () => {
  return (
    <>
      <motion.div
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 left-10 text-6xl"
      >
        ☁️
      </motion.div>

      <motion.div
        animate={{ x: [0, -60, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-32 right-20 text-7xl"
      >
        ☁️
      </motion.div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 5}%`,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 2 + i,
            repeat: Infinity,
          }}
        >
          🥕
        </motion.div>
      ))}
    </>
  );
};

export default FloatingBackground;
