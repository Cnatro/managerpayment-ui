import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import Loader from '../components/ui/Loader';
import { apiCategories } from '../services/api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');

  const [form, setForm] = useState({
    id: null,
    name: '',
    color: '#00E5FF',
    icon: '',
  });

  const isEdit = !!form.id;

  // GET
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await apiCategories.get();
      setCategories(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // FILTER + SORT
  const filtered = useMemo(() => {
    let data = [...categories];

    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    data.sort((a, b) =>
      sort === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );

    return data;
  }, [categories, search, sort]);

  // SAVE (ADD / UPDATE)
  const handleSave = async () => {
    if (!form.name) return;

    try {
      setLoading(true);

      if (isEdit) {
        const res = await apiCategories.update(form.id, form);

        if (res.status === 200) {
          alert('Chỉnh sửa danh mục thành công');
        }
      } else {
        const { id, ...payload } = form;

        const res = await apiCategories.create(payload);

        if (res.status === 201) {
          alert('Thêm danh mục mới thành công');
        }
      }

      setForm({
        id: null,
        name: '',
        color: '#00E5FF',
        icon: '',
      });

      await fetchCategories();
    } catch (error) {
      console.error(error);
      alert('Lưu danh mục thất bại');
    } finally {
      setLoading(false);
    }
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      setLoading(true);

      const res = await apiCategories.delete(id);

      if (res.status === 200) {
        alert('Đã xóa thành công');
        await fetchCategories();
      }
    } catch (error) {
      console.error(error);
      alert('Xóa danh mục thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader className="mt-20" />;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white">Categories</h1>
        <p className="text-[#98989D]">Quản lý danh mục chi tiêu</p>
      </div>

      {/* FORM */}
      <Card title={isEdit ? 'Edit Category' : 'Add Category'}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="px-3 py-2 rounded-xl bg-[#1E1E1E] border border-[#2C2C2E] text-white"
          />

          <input
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            placeholder="Color"
            className="px-3 py-2 rounded-xl bg-[#1E1E1E] border border-[#2C2C2E] text-white"
          />

          <input
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            placeholder="Icon"
            className="px-3 py-2 rounded-xl bg-[#1E1E1E] border border-[#2C2C2E] text-white"
          />

          <button
            onClick={handleSave}
            className="bg-[#00E5FF] text-black font-semibold rounded-xl px-4 py-2 cursor-pointer"
          >
            {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </Card>

      {/* FILTER */}
      <div className="flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search category..."
          className="flex-1 px-4 py-2 rounded-xl bg-[#1E1E1E] border border-[#2C2C2E] text-white"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-xl bg-[#1E1E1E] border border-[#2C2C2E] text-white"
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>

      {/* TABLE */}
      <Card title="Category List">
        {loading ? (
          <p className="text-[#98989D]">Loading...</p>
        ) : filtered.length === 0 ? (
          <EmptyState message="No categories found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[#98989D] border-b border-[#2C2C2E]">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Color</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-[#2C2C2E] hover:bg-[#1E1E1E]"
                  >
                    <td className="text-[#00E5FF]">#{c.id}</td>
                    <td className="py-3 text-white">{c.name}</td>

                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ background: c.color }}
                        />
                        <span className="text-[#98989D]">{c.color}</span>
                      </div>
                    </td>

                    <td className="text-right space-x-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="text-[#32D74B] cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-[#FF453A] cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
