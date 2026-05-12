import { motion } from 'framer-motion';

const RabbitCharacter = ({ isPasswordFocus, loginFail, loginSuccess }) => {
  return (
    <motion.div
      animate={
        loginFail
          ? { x: [-10, 10, -10, 10, 0] }
          : loginSuccess
            ? { y: [-20, 0, -20] }
            : { y: [0, -10, 0] }
      }
      transition={{
        duration: 1.5,
        repeat: loginSuccess ? Infinity : 0,
      }}
      className="text-[180px]"
    >
      {isPasswordFocus ? '🙈🐰' : loginFail ? '🥺🐰' : '🐰'}
    </motion.div>
  );
};

export default RabbitCharacter;
