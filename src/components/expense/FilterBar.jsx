export default function FilterBar({ setFilter, categories }) {
  return (
    <div className="w-full">
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-3 rounded-lg bg-[#1f2937] text-white border border-white/10 outline-none focus:border-orange-400 transition"
      >
        <option value="Tất cả">🐰 Tất cả</option>

        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.icon} {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
