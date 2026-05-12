import React, { useEffect, useState } from 'react';

import RabbitBackground from '../components/rabbit/RabbitBackground';
import RabbitPet from '../components/rabbit/RabbitPet';
import RabbitLevel from '../components/rabbit/RabbitLevel';
import CarrotAnimation from '../components/rabbit/CarrotAnimation';

import IncomeStats from '../components/income/IncomeStats';
import IncomeTimeline from '../components/income/IncomeTimeline';
import IncomeChart from '../components/income/IncomeChart';
import Button from '../components/ui/Button';
import { apiIncome } from '../services/api';
import Loader from '../components/ui/Loader';

const Income = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [carrots, setCarrots] = useState(0);

  const [chartData, setChartData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  const [triggerCarrot, setTriggerCarrot] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const [showModal, setShowModal] = useState(false);
  const [incomeInput, setIncomeInput] = useState(0);

  const [feeding, setFeeding] = useState(false);
  const [feedAmount, setFeedAmount] = useState(0);
  const [note, setNote] = useState('');

  const [loading, setLoading] = useState(true);

  const fetchIncome = async () => {
    try {
      setLoading(true);

      const res = await apiIncome.get();

      const data = res.data;

      // map đúng backend response
      setBalance(data.balance);
      setIncome(data.income);
      setExpense(data.expense);
      setCarrots(data.carrots);

      setChartData(data.chart);

      setTimelineData(data.timeline);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  // reset month UI (local only)
  useEffect(() => {
    const interval = setInterval(() => {
      const newMonth = new Date().getMonth();

      if (newMonth !== currentMonth) {
        setCurrentMonth(newMonth);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [currentMonth]);

  // =========================
  // ADD INCOME
  // =========================
  const handleAddIncome = async () => {
    const today = new Date();

    const payload = {
      amount: incomeInput,
      note,
      month: today.getMonth() + 1,
      date: today.toISOString().split('T')[0],
    };

    try {
      setLoading(true);
      const res = await apiIncome.create(payload);

      if (res.status === 201) {
        setShowModal(false);

        setIncomeInput(0);
        setNote('');

        // reload data instead of manual update
        fetchIncome();

        setTriggerCarrot(true);
        setTimeout(() => setTriggerCarrot(false), 1500);

        setFeedAmount(incomeInput);
        setFeeding(true);

        setTimeout(() => {
          setFeeding(false);
          setFeedAmount(0);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatVND = (value) =>
    new Intl.NumberFormat('vi-VN').format(value) + 'đ';

  // =========================
  // LOADING
  // =========================
  if (loading) return <Loader className="mt-20" />;

  return (
    <div className="min-h-screen bg-[#121212] text-white relative overflow-hidden p-6">
      <RabbitBackground />
      {triggerCarrot && <CarrotAnimation />}

      {/* POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl w-[320px]">
            <h2 className="text-lg mb-4">Nhập thu nhập</h2>

            <input
              type="text"
              className="w-full p-2 rounded bg-black border border-gray-600 mb-3"
              placeholder="Số tiền"
              value={incomeInput === 0 ? '' : incomeInput}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '');
                setIncomeInput(raw ? Number(raw) : 0);
              }}
            />

            <div className="text-green-400 text-sm mt-1">
              {incomeInput > 0 && formatVND(incomeInput)}
            </div>

            <input
              type="text"
              className="w-full p-2 rounded bg-black border border-gray-600 mt-2"
              placeholder="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex gap-2 mt-4">
              <Button
                className="bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </Button>

              <Button onClick={handleAddIncome}>Xác nhận</Button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        <div className="lg:col-span-3">
          <IncomeStats
            balance={balance}
            income={income}
            expense={expense}
            carrots={carrots}
          />
        </div>

        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <RabbitPet
            balance={balance}
            feeding={feeding}
            feedAmount={feedAmount}
          />

          <RabbitLevel balance={balance} />

          <div className="flex gap-4 mt-6">
            <Button onClick={() => setShowModal(true)}>+ Thêm thu nhập</Button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <IncomeTimeline data={timelineData} />
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <IncomeChart data={chartData} />
      </div>
    </div>
  );
};

export default Income;
