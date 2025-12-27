import { useEffect, useState } from "react";
import { fetchTips } from "../services/tipService";
import { Lightbulb, Leaf, Zap } from "lucide-react";

export default function Tips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTips()
      .then(setTips)
      .finally(() => setLoading(false));
  }, []);

  return (
    // 🔥 FULL SCREEN DARK BACKGROUND
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

      <div className="max-w-7xl mx-auto px-6 py-10 text-gray-900 dark:text-white">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
            <Lightbulb className="text-yellow-400" />
            Energy Saving Tips
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Small habits today save big energy tomorrow ⚡
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Tips Cards */}
        {!loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {tips.map((tip, i) => (
              <div
                key={tip.id}
                className="
                  bg-white dark:bg-gray-800
                  rounded-xl shadow p-6
                  hover:shadow-xl transition
                "
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-full
                    bg-green-100 dark:bg-green-900
                    text-green-600 dark:text-green-400">
                    {i % 3 === 0 && <Zap />}
                    {i % 3 === 1 && <Leaf />}
                    {i % 3 === 2 && <Lightbulb />}
                  </div>
                  <h3 className="font-semibold">
                    {tip.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
