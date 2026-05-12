export default function GoalSection() {
  return (
    <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold mb-4">Mục tiêu cá nhân</h2>

      <div className="space-y-5">
        <div>
          <p>Mua xe mới</p>
          <div className="w-full bg-white/10 h-3 rounded-full mt-2">
            <div className="w-3/4 bg-green-400 h-full rounded-full"></div>
          </div>
        </div>

        <div>
          <p>Quỹ du lịch</p>
          <div className="w-full bg-white/10 h-3 rounded-full mt-2">
            <div className="w-1/2 bg-pink-400 h-full rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
