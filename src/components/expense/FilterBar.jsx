const filters = ['Tất cả', 'Food', 'Shopping'];

export default function FilterBar({ setFilter }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className="glass px-4 py-2 rounded-full text-sm hover:scale-105 transition"
        >
          {f}
        </button>
      ))}
    </div>
  );
}
