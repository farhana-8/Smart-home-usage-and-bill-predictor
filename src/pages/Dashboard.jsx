import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory, fetchRewards, submitUnits } from "../store";

import DailyTipBanner from "../components/DailyTipBanner";
import EnergyAlert from "../components/EnergyAlert";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Zap } from "lucide-react";
import CountUp from "react-countup";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { history, rewards } = useSelector((state) => state.energy);

  const [units, setUnits] = useState("");
  const [msg, setMsg] = useState("");
  const [alertKey, setAlertKey] = useState(0);
  const [predictedBill, setPredictedBill] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  const email = localStorage.getItem("email");

  // 🔹 Fetch history & rewards
  useEffect(() => {
    dispatch(fetchHistory());
    dispatch(fetchRewards());
  }, [dispatch]);

  // 🔮 Predict next month bill & calculate totals
useEffect(() => {
  if (!history || history.length === 0) {
    setPredictedBill(0);
    setTotalUnits(0);
    setTotalBill(0);
    return;
  }

  const totalU = history.reduce((sum, h) => sum + Number(h.unitsConsumed), 0);
  const totalB = history.reduce((sum, h) => sum + Number(h.billAmount), 0);
  setTotalUnits(totalU);
  setTotalBill(totalB);

  if (history.length < 2) {
    setPredictedBill(0);
    return;
  }

  const last = history[history.length - 1];
  const previous = history[history.length - 2];

  const avgUnits =
    (Number(last.unitsConsumed) + Number(previous.unitsConsumed)) / 2;

  const RATE_PER_UNIT = 4;

  setPredictedBill(Math.round(avgUnits * RATE_PER_UNIT));
}, [history]);


  // 🔹 Submit usage
  const submit = async (e) => {
    e.preventDefault();

    await dispatch(submitUnits(units));

    setMsg("✅ Units submitted successfully!");
    setUnits("");
    setAlertKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-6 text-gray-900 dark:text-white">

        {/* 🌱 Daily Tip */}
        <DailyTipBanner />

        {/* ⚠️ Energy Alert */}
        <EnergyAlert email={email} refresh={alertKey} />

        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {/* ===== Usage Chart ===== */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
            📈 Usage History
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="unitsConsumed"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                name="Units"
                animationDuration={1500}
                animationEasing="ease-in-out"
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="billAmount"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                name="Bill"
                animationDuration={1500}
                animationEasing="ease-in-out"
                activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ===== Top Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* ===== Energy Input Card ===== */}
          <form
            onSubmit={submit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-4"
          >
            <h3 className="text-base font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <Zap size={18} className="text-green-500" />
              Enter Energy Usage
            </h3>

            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                Units Consumed (kWh)
              </label>
              <input
                type="number"
                placeholder="120"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                required
                className="
                  w-full h-10 rounded-md px-3 text-sm
                  bg-gray-50 dark:bg-gray-700
                  border border-gray-300 dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-green-500
                "
              />
            </div>

            <button
              type="submit"
              className="
                w-full h-10 rounded-md font-medium text-white
                bg-gradient-to-r from-green-600 to-emerald-500
                hover:opacity-95 transition
              "
            >
              Submit Usage
            </button>

            {msg && (
              <p className="text-xs text-green-500 font-medium">{msg}</p>
            )}
          </form>

          {/* ===== Rewards Card ===== */}
          <div
            className="
              rounded-lg shadow p-6 flex flex-col justify-center items-center
              bg-gradient-to-br from-green-500 to-blue-500
              dark:from-gray-800 dark:to-gray-900
              text-white
            "
          >
            <p className="text-sm opacity-90">🎁 Reward Points</p>

            <h1 className="text-4xl font-bold mt-1">
              <CountUp end={rewards || 0} duration={1.2} />
            </h1>

            <p className="text-xs opacity-80 mt-1">
              Earn more by saving energy
            </p>
          </div>
        </div>

        {/* ===== Stats Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Units */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Units</h4>
            <p className="text-2xl font-bold text-blue-600 mt-2">{totalUnits}</p>
            <p className="text-xs text-gray-500">kWh consumed</p>
          </div>

          {/* Total Bill */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Bill</h4>
            <p className="text-2xl font-bold text-green-600 mt-2">₹{totalBill}</p>
            <p className="text-xs text-gray-500">Paid so far</p>
          </div>

          {/* Predicted Bill */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Predicted Bill</h4>
            <p className="text-2xl font-bold text-orange-600 mt-2">₹{predictedBill}</p>
            <p className="text-xs text-gray-500">Next month</p>
          </div>
        </div>

      </div>
    </div>
  );
}
