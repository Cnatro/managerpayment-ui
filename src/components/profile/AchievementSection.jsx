const achievements = [
  'First Save',
  'No Spending 7 Days',
  'Millionaire Bunny',
  'Carrot Master',
];

export default function AchievementSection() {
  return (
    <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold mb-6">Thành tựu</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((item) => (
          <div
            key={item}
            className="bg-yellow-400/20 border border-yellow-300/20 rounded-2xl p-4 text-center hover:scale-105 transition"
          >
            🏆
            <p className="mt-2">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
