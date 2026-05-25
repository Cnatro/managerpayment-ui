import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { apiBudgets } from '../services/api';
import Loader from '../components/ui/Loader';
import { formatVND } from '../shared/utils/format';

const months = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export default function Budget() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [weekView, setWeekView] = useState(null);
  const [budgetDetail, setBudgetDetail] = useState(null);

  const [weeks, setWeeks] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [editWeek, setEditWeek] = useState(null);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    limitAmount: 0,
  });

  const currentBudgets = budgetDetail?.expenses || [];

  const totalLimit = budgetDetail?.limitAmount || 0;

  const totalUsed = budgetDetail?.used || 0;

  const percent = totalLimit ? (totalUsed / totalLimit) * 100 : 0;

  // ================= FETCH LIST =================
  const fetchBudgetInCurrentMonth = async () => {
    try {
      setLoading(true);

      const filter = {
        month,
      };

      const res = await apiBudgets.get(filter);

      setWeeks(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH DETAIL =================
  const fetchBudgetDetail = async (budgetId) => {
    try {
      setLoading(true);

      const res = await apiBudgets.getDetail(budgetId);

      setBudgetDetail(res.data);
      setWeekView(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetInCurrentMonth();
  }, [month]);

  // ================= SAVE =================
  const handleSave = async () => {
    if (!form.name || !form.startDate || !form.endDate) return;

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        startDate: form.startDate,
        endDate: form.endDate,
        limitAmount: Number(form.limitAmount),
      };

      if (editWeek) {
        // update week
        await apiBudgets.update(editWeek.id, payload);
      } else {
        // create week
        await apiBudgets.create(payload);
      }

      // fetch lại danh sách tuần mới nhất
      await fetchBudgetInCurrentMonth();

      // đóng modal + reset form
      setOpenModal(false);
      setEditWeek(null);

      setForm({
        name: '',
        startDate: '',
        endDate: '',
        limitAmount: 0,
      });
    } catch (error) {
      console.log(error);
      alert('Có lỗi xảy ra khi lưu ngân sách');
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await apiBudgets.delete(id);

      setWeeks((prev) => prev.filter((w) => w.id !== id));

      if (weekView?.id === id) {
        setWeekView(null);
        setBudgetDetail(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (w, e) => {
    e.stopPropagation();

    setEditWeek(w);

    setForm({
      name: w.name,
      startDate: w.startDate,
      endDate: w.endDate,
      limitAmount: w.limitAmount,
    });

    setOpenModal(true);
  };

  // ================= CANCEL =================
  const handleCancel = () => {
    setOpenModal(false);

    setEditWeek(null);

    setForm({
      name: '',
      startDate: '',
      endDate: '',
    });
  };

  // ================= PROGRESS =================
  const getProgress = (used, limit) => {
    if (!limit) return 0;

    return (used / limit) * 100;
  };

  if (loading) {
    return <Loader className="mt-20" />;
  }

  return (
    <div className="p-6 text-white bg-[#0B0F1A] min-h-screen space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-bold">
            🥕 {weekView ? 'Chi tiết ngân sách' : 'Ngân sách theo tuần'}
          </h1>

          <p className="text-gray-400 text-sm">
            {weekView
              ? `${weekView.startDate} → ${weekView.endDate}`
              : 'Chọn tuần để xem chi tiêu'}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="bg-[#1f2937] text-white px-4 py-2 rounded-xl border border-white/10 outline-none"
          >
            {months.map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

          {!weekView && (
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 hover:scale-105 transition"
            >
              <Plus size={16} />
              Tạo tuần
            </button>
          )}
        </div>
      </div>

      {/* ================= BACK ================= */}
      {weekView && (
        <button
          onClick={() => {
            setWeekView(null);
            setBudgetDetail(null);
          }}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách tuần
        </button>
      )}

      {/* ================= STATS ================= */}
      {weekView && (
        <div className="bg-white/10 p-5 rounded-2xl">
          <h2 className="font-semibold">🐰 Tổng quan tuần</h2>

          <p className="text-sm text-gray-300 mt-2">
            Đã chi <b>{Number(totalUsed).toLocaleString()}</b> /{' '}
            {Number(totalLimit).toLocaleString()}
          </p>

          <div className="w-full bg-white/10 h-3 rounded-full mt-3">
            <motion.div
              className={`h-full ${
                percent > 100 ? 'bg-red-400' : 'bg-orange-400'
              }`}
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(percent, 100)}%`,
              }}
            />
          </div>

          <p className="text-xs mt-2 text-gray-400">
            {percent > 100
              ? '🐰 Bạn đã vượt ngân sách!'
              : `🐰 Đã sử dụng ${percent.toFixed(1)}% ngân sách`}
          </p>
        </div>
      )}

      {/* ================= LIST ================= */}
      {!weekView && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {weeks.length === 0 ? (
            <div className="text-gray-400 col-span-full text-center">
              Chưa có tuần nào 🐰
            </div>
          ) : (
            weeks.map((w, index) => {
              const processing = getProgress(w.used, w.limitAmount);

              return (
                <motion.div
                  key={w.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0px 10px 30px rgba(255, 165, 0, 0.15)',
                  }}
                  onClick={() => fetchBudgetDetail(w.id)}
                  className="relative cursor-pointer rounded-3xl p-5 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-orange-400/20 to-pink-400/10 blur-2xl" />

                  <div className="relative z-10 flex justify-between items-startDate">
                    <div>
                      <p className="text-lg font-bold text-white">
                        🥕 {w.name}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {w.startDate} → {w.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                    <motion.button
                      onClick={(e) => handleEdit(w, e)}
                      whileHover={{
                        scale: 1.15,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      className="p-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-blue-500/20 transition"
                    >
                      <Pencil size={14} className="text-blue-400" />
                    </motion.button>

                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(w.id);
                      }}
                      whileHover={{
                        scale: 1.15,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      className="p-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-red-500/20 transition"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </motion.button>
                  </div>

                  <div className="relative z-10 mt-4">
                    <p className="text-sm text-gray-300">Ngân sách tuần</p>

                    <p className="text-lg font-semibold text-white mt-1">
                      {Number(w.limitAmount).toLocaleString()} ₫
                    </p>
                  </div>

                  <div className="relative z-10 mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Tiến độ</span>

                      <span>{processing.toFixed(0)}%</span>
                    </div>

                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          processing > 100
                            ? 'bg-red-400'
                            : processing > 70
                              ? 'bg-yellow-400'
                              : 'bg-green-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(processing, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      Click để mở chi tiết
                    </span>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-orange-300 text-sm font-medium"
                    >
                      →
                    </motion.div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#111827] p-5 rounded-2xl w-[320px] space-y-3">
            <h2 className="text-lg font-semibold">
              {editWeek ? 'Sửa tuần' : 'Tạo tuần'}
            </h2>

            <input
              placeholder="Tên tuần"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full p-2 bg-black/40 rounded"
            />

            <input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  startDate: e.target.value,
                })
              }
              className="w-full p-2 bg-black/40 rounded"
            />

            <input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  endDate: e.target.value,
                })
              }
              className="w-full p-2 bg-black/40 rounded"
            />

            <input
              placeholder="Ngân sách tối đa"
              value={form.limitAmount}
              onChange={(e) =>
                setForm({
                  ...form,
                  limitAmount: e.target.value,
                })
              }
              className="w-full p-2 bg-black/40 rounded"
            />

            <div className="text-green-400 text-sm mt-1">
              {form.limitAmount > 0 && formatVND(form.limitAmount)}
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-orange-400 py-2 rounded-xl"
            >
              Lưu
            </button>

            <button
              onClick={handleCancel}
              className="w-full text-sm text-gray-400"
            >
              Huỷ
            </button>
          </div>
        </div>
      )}

      {/* ================= DETAIL ================= */}
      {weekView && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {currentBudgets.length === 0 ? (
              <div className="text-gray-400 col-span-full text-center">
                Chưa có dữ liệu tuần này 🐰
              </div>
            ) : (
              currentBudgets.map((b) => {
                const percent = totalLimit ? (b.amount / totalLimit) * 100 : 0;

                return (
                  <motion.div
                    key={b.expenseId}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      scale: 1.03,
                    }}
                    className="bg-white/10 p-4 rounded-2xl"
                  >
                    <div className="flex justify-between">
                      <p className="text-xl">💸 {b.categoryName}</p>
                    </div>

                    <p className="text-sm mt-2">
                      {Number(b.amount).toLocaleString()} ₫
                    </p>

                    <div className="w-full bg-white/10 h-2 rounded-full mt-2">
                      <div
                        className={`h-full rounded-full ${
                          percent > 100 ? 'bg-red-400' : 'bg-green-400'
                        }`}
                        style={{
                          width: `${Math.min(percent, 100)}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3 text-xs text-gray-400 space-y-1">
                      <p>📅 {b.date}</p>

                      <p>📝 {b.note || 'Không có ghi chú'}</p>
                    </div>

                    <div className="flex justify-endDate gap-2 mt-3">
                      <button className="text-blue-400">
                        <Pencil size={16} />
                      </button>

                      <button className="text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
