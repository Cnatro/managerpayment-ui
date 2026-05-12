import { motion } from 'framer-motion';
import { Crown, Coins, Sparkles } from 'lucide-react';

export default function ProfileHero({ user, rabbit, financialStats }) {
  const balance = financialStats?.currentBalance || 0;

  return (
    <div className="relative overflow-hidden rounded-[32px] p-8 bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl">
      {/* glow background */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/20 blur-[120px]" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left info */}
        <div>
          <p className="text-cyan-300 text-sm mb-2">Welcome back 🥕</p>

          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            {user?.name}
          </h1>

          <p className="text-purple-200 mt-2">{user?.email}</p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-white/10 px-4 py-3 rounded-2xl">
              <p className="text-sm text-gray-300">Số dư hiện tại</p>

              <h2 className="text-cyan-400 font-bold text-2xl">
                {balance.toLocaleString()}đ
              </h2>
            </div>

            <div className="bg-white/10 px-4 py-3 rounded-2xl">
              <p className="text-sm text-gray-300">Danh hiệu</p>

              <h2 className="text-yellow-300 font-bold">{rabbit?.title}</h2>
            </div>
          </div>

          {/* exp bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-300">
                Level {rabbit?.level}
              </span>

              <span className="text-sm text-cyan-300">{rabbit?.exp}%</span>
            </div>

            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${rabbit?.exp}%`,
                }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Rabbit */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="text-[180px] cursor-pointer"
          >
            🐰
          </motion.div>

          <div className="mt-4 flex gap-3">
            <div className="px-4 py-2 bg-yellow-400/20 rounded-2xl flex items-center gap-2">
              <Crown size={18} className="text-yellow-300" />
              <span>{rabbit?.title}</span>
            </div>

            <div className="px-4 py-2 bg-green-400/20 rounded-2xl flex items-center gap-2">
              <Coins size={18} className="text-green-300" />
              <span>{financialStats?.totalSaving?.toLocaleString()}đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* floating particles */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="absolute bottom-6 right-6 text-yellow-300"
      >
        <Sparkles size={30} />
      </motion.div>
    </div>
  );
}
