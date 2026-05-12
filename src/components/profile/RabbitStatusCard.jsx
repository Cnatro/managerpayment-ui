export default function RabbitStatusCard() {
  return (
    <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold mb-4">Trạng thái thỏ</h2>

      <div className="text-7xl text-center">🐰</div>

      <div className="mt-4 space-y-3">
        <p>❤️ Hạnh phúc: 92%</p>
        <p>🥕 Đói: 15%</p>
        <p>⚡ Năng lượng: 87%</p>
      </div>
    </div>
  );
}
