import { useState } from 'react';
import { motion } from 'framer-motion';

const LoginForm = ({ onLogin, setIsPasswordFocus, loginFail, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="backdrop-blur-lg bg-white/30 rounded-3xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>

      <input
        type="email"
        placeholder="Nhập email"
        className="w-full p-4 rounded-xl mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Nhập mật khẩu"
        className="w-full p-4 rounded-xl mb-4"
        onFocus={() => setIsPasswordFocus(true)}
        onBlur={() => setIsPasswordFocus(false)}
        onChange={(e) => setPassword(e.target.value)}
      />

      {loginFail && (
        <p className="text-red-500 text-center mb-4">
          Bé thỏ đang buồn vì sai mật khẩu 🥺
        </p>
      )}

      {loginFail && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onLogin(email, password)}
        className="w-full bg-green-500 text-white py-4 rounded-xl"
      >
        Bắt đầu hành trình
      </motion.button>
    </div>
  );
};

export default LoginForm;
