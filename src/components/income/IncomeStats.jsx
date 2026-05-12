import Card from '../ui/Card';

export default function IncomeStats({ balance, income, expense, carrots }) {
  return (
    <Card className="bg-[#1E1E1E] p-5 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold">Thống kê tài chính</h2>

      <div>
        <p className="text-gray-400">Số dư</p>
        <h3 className="text-[#00E5FF] text-2xl font-bold">
          {balance.toLocaleString()}đ
        </h3>
      </div>

      <div>
        <p className="text-gray-400">Thu nhập</p>
        <h3 className="text-green-400">{income.toLocaleString()}đ</h3>
      </div>

      <div>
        <p className="text-gray-400">Chi tiêu</p>
        <h3 className="text-red-400">{expense.toLocaleString()}đ</h3>
      </div>

      <div>
        <p className="text-gray-400">Cà rốt đã kiếm</p>
        <h3 className="text-orange-400">🥕 {carrots}</h3>
      </div>
    </Card>
  );
}
