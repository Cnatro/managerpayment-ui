import { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  Trash2,
  Pencil,
  Search,
  WalletCards,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';

import { apiCategories, apiDeductions } from '../services/api';
import { formatVND } from '../shared/utils/format';

export default function Deductions() {
  const [loading, setLoading] = useState(true);

  const [deductions, setDeductions] = useState([]);

  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [editing, setEditing] = useState(null);

  // PAGINATION
  const [page, setPage] = useState(1);

  const [size, setSize] = useState(5);

  const [totalPages, setTotalPages] = useState(1);

  const [totalItems, setTotalItems] = useState(0);

  const [form, setForm] = useState({
    categoryId: 0,
    month: new Date().getMonth() + 1,
    amount: '',
    note: '',
  });

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [deductionRes, categoryRes] = await Promise.all([
        apiDeductions.get({
          page,
          size,
        }),

        apiCategories.get(),
      ]);

      setDeductions(deductionRes.data?.data || []);

      setTotalItems(deductionRes.data?.total || 0);

      setTotalPages(deductionRes.data?.totalPages || 1);

      setCategories(categoryRes.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return deductions.filter((item) =>
      item.category?.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [deductions, search]);

  const totalDeduction = useMemo(() => {
    return deductions.reduce((sum, item) => {
      return sum + Number(item.amount || 0);
    }, 0);
  }, [deductions]);

  const deductionCategories = useMemo(() => {
    return categories.filter(
      (item) =>
        item.type === 'deduction' || item.type === 'expense' || !item.type,
    );
  }, [categories]);

  const resetForm = () => {
    setForm({
      categoryId: 0,
      month: new Date().getMonth() + 1,
      amount: '',
      note: '',
    });

    setEditing(null);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        categoryId: Number(form.categoryId),
        month: Number(form.month),
        amount: Number(form.amount),
        note: form.note,
      };

      if (editing) {
        await apiDeductions.update({
          ...payload,
          id: editing.id,
        });
      } else {
        await apiDeductions.create(payload);
      }

      setShowModal(false);

      resetForm();

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiDeductions.delete(id);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);

    setForm({
      categoryId: item.categoryId || 0,
      month: item.month || 1,
      amount: item.amount || '',
      note: item.note || '',
    });

    setShowModal(true);
  };

  if (loading) return <Loader className="mt-20" />;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Khấu trừ</h1>

          <p className="text-[#98989D] mt-3 text-lg">
            Quản lý các khoản khấu trừ tài chính
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="
            bg-primary
            hover:opacity-90
            transition
            text-white
            px-5
            py-3
            rounded-2xl
            flex
            items-center
            gap-2
            font-medium
            cursor-pointer
          "
        >
          <Plus size={20} />
          Thêm khấu trừ
        </button>
      </div>

      {/* OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#98989D] text-sm mb-2">Tổng khấu trừ</p>

              <h2 className="text-3xl font-bold text-red-400">
                {formatVND(totalDeduction)}
              </h2>
            </div>

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-red-500/10
                flex
                items-center
                justify-center
              "
            >
              <WalletCards className="text-red-400" size={28} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-[#98989D] text-sm mb-2">Số khoản khấu trừ</p>

          <h2 className="text-3xl font-bold text-white">{totalItems}</h2>
        </Card>

        <Card className="p-6">
          <p className="text-[#98989D] text-sm mb-2">Trang hiện tại</p>

          <h2 className="text-3xl font-bold text-cyan-400">
            {page}/{totalPages}
          </h2>
        </Card>
      </div>

      {/* SEARCH */}
      <Card className="p-5">
        <div
          className="
            flex
            items-center
            gap-3
            bg-[#1E1E1E]
            border
            border-[#2C2C2E]
            rounded-2xl
            px-4
            py-3
          "
        >
          <Search size={18} className="text-[#98989D]" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo danh mục..."
            className="
              bg-transparent
              outline-none
              text-white
              flex-1
              placeholder:text-[#98989D]
            "
          />
        </div>
      </Card>

      {/* LIST */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Danh sách khấu trừ</h2>

          <p className="text-[#98989D] mt-1">Tất cả khoản khấu trừ hiện có</p>
        </div>

        {loading ? (
          <Loader />
        ) : filteredData.length === 0 ? (
          <EmptyState message="Chưa có khoản khấu trừ nào" />
        ) : (
          <>
            <div className="space-y-4">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-[#1E1E1E]
                    border
                    border-[#2C2C2E]
                    rounded-3xl
                    p-5
                  "
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-semibold text-white">
                          {item.category?.name || 'Không có danh mục'}
                        </h3>

                        <span
                          className="
                            px-3
                            py-1
                            rounded-full
                            bg-red-500/10
                            text-red-400
                            text-xs
                            font-medium
                          "
                        >
                          Tháng {item.month}
                        </span>
                      </div>

                      <p className="text-[#98989D] mt-3">
                        {item.note || 'Không có ghi chú'}
                      </p>

                      {item.created_at && (
                        <p className="text-sm text-[#666] mt-3">
                          Tạo lúc:{' '}
                          {new Date(item.created_at).toLocaleDateString(
                            'vi-VN',
                          )}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="text-right">
                        <p className="text-[#98989D] text-sm">Số tiền</p>

                        <h3 className="text-2xl font-bold text-red-400">
                          {formatVND(item.amount)}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="
                            w-11 h-11
                            rounded-2xl
                            bg-cyan-500/10
                            hover:bg-cyan-500/20
                            transition
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                          "
                        >
                          <Pencil size={18} className="text-cyan-400" />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="
                            w-11 h-11
                            rounded-2xl
                            bg-red-500/10
                            hover:bg-red-500/20
                            transition
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                          "
                        >
                          <Trash2 size={18} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MODAL */}
            {showModal && (
              <div
                className="
            fixed inset-0
            bg-black/60
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            p-4
          "
              >
                <div
                  className="
              bg-[#121212]
              border
              border-[#2C2C2E]
              rounded-[32px]
              p-7
              w-full
              max-w-lg
            "
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {editing ? 'Cập nhật khấu trừ' : 'Thêm khấu trừ'}
                      </h2>

                      <p className="text-[#98989D] mt-1">
                        Nhập thông tin khoản khấu trừ
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="
                  w-10 h-10
                  rounded-xl
                  bg-[#1E1E1E]
                  text-white
                "
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-5">
                    {/* CATEGORY */}
                    <select
                      value={form.categoryId}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          categoryId: e.target.value,
                        })
                      }
                      className="
                  w-full
                  bg-[#1E1E1E]
                  border
                  border-[#2C2C2E]
                  rounded-2xl
                  px-4
                  py-4
                  text-white
                  outline-none
                "
                    >
                      <option value="" className="bg-[#1E1E1E]">
                        Chọn danh mục khấu trừ
                      </option>

                      {deductionCategories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          className="bg-[#1E1E1E]"
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>

                    {/* MONTH */}
                    <select
                      value={form.month}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          month: e.target.value,
                        })
                      }
                      className="
                  w-full
                  bg-[#1E1E1E]
                  border
                  border-[#2C2C2E]
                  rounded-2xl
                  px-4
                  py-4
                  text-white
                  outline-none
                "
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option
                          key={i + 1}
                          value={i + 1}
                          className="bg-[#1E1E1E]"
                        >
                          Tháng {i + 1}
                        </option>
                      ))}
                    </select>

                    {/* AMOUNT */}
                    <div className="space-y-2">
                      <div className="relative">
                        <span
                          className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-green-400
                      font-semibold
                      text-lg
                    "
                        >
                          ₫
                        </span>

                        <input
                          type="number"
                          value={form.amount}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              amount: e.target.value,
                            })
                          }
                          placeholder="Nhập số tiền"
                          className="
                      w-full
                      bg-[#1E1E1E]
                      border
                      border-[#2C2C2E]
                      rounded-2xl
                      pl-10
                      pr-4
                      py-4
                      text-white
                      text-lg
                      font-semibold
                      outline-none
                      transition
                      focus:border-green-400
                      focus:ring-2
                      focus:ring-green-400/20
                    "
                        />
                      </div>

                      {form.amount > 0 && (
                        <div
                          className="
                      bg-green-500/10
                      border
                      border-green-500/20
                      rounded-2xl
                      px-4
                      py-3
                      flex
                      items-center
                      justify-between
                    "
                        >
                          <span className="text-[#98989D] text-sm">
                            Số tiền hiển thị
                          </span>

                          <span className="text-green-400 font-bold text-lg">
                            {formatVND(form.amount)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* NOTE */}
                    <textarea
                      rows={4}
                      value={form.note}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          note: e.target.value,
                        })
                      }
                      placeholder="Ghi chú"
                      className="
                  w-full
                  bg-[#1E1E1E]
                  border
                  border-[#2C2C2E]
                  rounded-2xl
                  px-4
                  py-4
                  text-white
                  outline-none
                  resize-none
                "
                    />

                    {/* BUTTON */}
                    <button
                      onClick={handleSubmit}
                      className="
                  w-full
                  bg-primary
                  hover:opacity-90
                  transition
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  cursor-pointer
                "
                    >
                      {editing ? 'Cập nhật khấu trừ' : 'Lưu khấu trừ'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PAGINATION */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-5 mt-8">
              <div className="text-sm text-[#98989D]">
                Hiển thị{' '}
                <span className="text-white font-semibold">
                  {(page - 1) * size + 1}
                </span>{' '}
                -{' '}
                <span className="text-white font-semibold">
                  {Math.min(page * size, totalItems)}
                </span>{' '}
                / <span className="text-white font-semibold">{totalItems}</span>{' '}
                khoản khấu trừ
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#98989D]">Hiển thị</span>

                  <select
                    value={size}
                    onChange={(e) => {
                      setSize(Number(e.target.value));
                      setPage(1);
                    }}
                    className="
                      bg-[#1E1E1E]
                      border
                      border-[#2C2C2E]
                      rounded-xl
                      px-3
                      py-2
                      text-white
                      outline-none
                    "
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="
                      w-11
                      h-11
                      rounded-2xl
                      bg-[#1E1E1E]
                      border
                      border-[#2C2C2E]
                      flex
                      items-center
                      justify-center
                      text-white
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                    "
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div
                    className="
                      min-w-[44px]
                      h-11
                      px-4
                      rounded-2xl
                      bg-primary
                      flex
                      items-center
                      justify-center
                      text-white
                      font-semibold
                    "
                  >
                    {page}
                  </div>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="
                      w-11
                      h-11
                      rounded-2xl
                      bg-[#1E1E1E]
                      border
                      border-[#2C2C2E]
                      flex
                      items-center
                      justify-center
                      text-white
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                    "
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
