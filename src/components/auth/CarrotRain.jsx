import { motion } from 'framer-motion';

const CarrotRain = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: 3,
            delay: i * 0.1,
          }}
        >
          🥕
        </motion.div>
      ))}
    </div>
  );
};

export default CarrotRain;
