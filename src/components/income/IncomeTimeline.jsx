import { Wallet, PiggyBank, TrendingUp } from 'lucide-react';

export default function IncomeTimeline({ data = [] }) {
  const formatVND = (v) => new Intl.NumberFormat('vi-VN').format(v) + 'đ';

  const logs = data.map((item) => {
    let Icon = Wallet;

    if (item.note?.toLowerCase().includes('save')) {
      Icon = PiggyBank;
    } else if (item.amount > 5000000) {
      Icon = TrendingUp;
    }

    return {
      id: item.id,
      icon: Icon,
      text: `${item.note} +${formatVND(item.amount)}`,
      date: new Date(item.date).toLocaleDateString('vi-VN'),
    };
  });

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-5 space-y-4">
      <h2 className="text-xl font-bold">Hoạt động gần đây</h2>

      {logs.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Icon className="text-[#00E5FF]" size={18} />
              <span className="text-sm">{item.text}</span>
            </div>

            <span className="text-xs text-gray-400">{item.date}</span>
          </div>
        );
      })}
    </div>
  );
}
