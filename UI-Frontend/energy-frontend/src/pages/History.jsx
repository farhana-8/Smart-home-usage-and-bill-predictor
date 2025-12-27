import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../store";

export default function History() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.energy.history);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  return (
    // 🔥 FULL PAGE DARK BACKGROUND
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

      <div className="max-w-5xl mx-auto p-6 text-gray-900 dark:text-white">

        <h2 className="text-2xl font-bold mb-6">
          📜 My History
        </h2>

        <div className="overflow-x-auto rounded-lg shadow">

          <table className="w-full bg-white dark:bg-gray-800">

            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Units</th>
                <th className="p-3 text-center">Bill</th>
              </tr>
            </thead>

            <tbody>
              {history.map((h) => (
                <tr
                  key={h.id}
                  className="
                    border-t border-gray-200 dark:border-gray-700
                    hover:bg-gray-50 dark:hover:bg-gray-700
                    transition
                  "
                >
                  <td className="p-3">{h.date}</td>
                  <td className="p-3 text-center">{h.unitsConsumed}</td>
                  <td className="p-3 text-center">₹{h.billAmount}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}
