export default function ProfileStats() {
  const stats = [
    {
      title: 'Số dư hiện tại',
      value: '120,000,000đ',
    },
    {
      title: 'Tổng tiết kiệm',
      value: '75,000,000đ',
    },
    {
      title: 'Chuỗi ngày',
      value: '18 ngày',
    },
  ];

  return (
    <>
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-6"
        >
          <p className="text-purple-200">{item.title}</p>

          <h2 className="text-2xl font-bold mt-2 text-cyan-400">
            {item.value}
          </h2>
        </div>
      ))}
    </>
  );
}
