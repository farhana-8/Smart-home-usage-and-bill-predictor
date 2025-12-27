import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRewards } from "../store";

export default function Rewards() {
  const dispatch = useDispatch();
  const rewards = useSelector((state) => state.energy.rewards);

  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch]);

  return (
    <div className="
      min-h-screen flex items-center justify-center p-6
      bg-gradient-to-br from-green-400 to-blue-500
      dark:from-gray-900 dark:to-gray-800
    ">
      <div className="
        bg-white dark:bg-gray-900
        rounded-3xl shadow-2xl p-10 max-w-md w-full text-center
      ">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          🎁 My Rewards
        </h2>


        <div className="
          bg-gradient-to-r from-green-500 to-emerald-600
          text-white rounded-2xl p-8 shadow-lg
        ">
          <p>Total Reward Points</p>
          <h1 className="text-6xl font-extrabold my-4">{rewards}</h1>
          <p className="text-sm opacity-80">🌱 Saving energy saves the planet</p>
        </div>
      </div>
    </div>
  );
}
