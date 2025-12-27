import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory, fetchRewards, submitUnits } from "../store";
import DailyTipBanner from "../components/DailyTipBanner";
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

  useEffect(() => {
    dispatch(fetchHistory());
    dispatch(fetchRewards());
  }, [dispatch]);

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(submitUnits(units));
    setMsg("✅ Units submitted successfully!");
    setUnits("");
  };

  return (
    // 🔥 FULL PAGE DARK BACKGROUND
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

      <div className="max-w-7xl mx-auto px-6 py-6 text-gray-900 dark:text-white">

        <DailyTipBanner />

        <h2 className="text-3xl font-bold mb-6">
          Dashboard
        </h2>

        {/* ===== Top Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Input Card */}
          <form
            onSubmit={submit}
            className="
              bg-white dark:bg-gray-800
              rounded-lg shadow p-5 space-y-4
            "
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

          {/* Rewards Card */}
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
              <CountUp end={rewards} duration={1.2} separator="," />
            </h1>

            <p className="text-xs opacity-80 mt-1">
              Earn more by saving energy
            </p>
          </div>

        </div>

        {/* ===== Chart ===== */}
        <div className="bg-white dark:bg-gray-800 mt-8 p-6 rounded-lg shadow">
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
              />
              <Line
                type="monotone"
                dataKey="billAmount"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                name="Bill"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
