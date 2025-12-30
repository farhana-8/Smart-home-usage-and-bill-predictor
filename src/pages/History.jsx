import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../store";

export default function History() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.energy.history);

  const [predictedBill, setPredictedBill] = useState(null);

  // 1️⃣ Fetch history from DB
  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  // 2️⃣ Calculate predicted bill AFTER history loads
  useEffect(() => {
    if (!history || history.length === 0) return;

    const totalUnits = history.reduce(
      (sum, record) => sum + record.unitsConsumed,
      0
    );

    const averageUnits = totalUnits / history.length;
    const RATE_PER_UNIT = 5;

    const predicted = Math.round(averageUnits * RATE_PER_UNIT);
    setPredictedBill(predicted);
  }, [history]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto p-6 text-gray-900 dark:text-white">

        <h2 className="text-2xl font-bold mb-6">📜 My History</h2>

        {/* 🔮 Predicted Bill */}
        {predictedBill !== null && (
          <div className="mb-6 p-4 rounded-lg bg-blue-100 dark:bg-blue-900 text-center">
            🔮 <strong>Predicted Next Bill:</strong> ₹{predictedBill}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Units</th>
                <th className="p-3 text-center">Bill</th>
                <th className="p-3 text-center">PDF</th> {/* Added header for PDF */}
              </tr>
            </thead>

            <tbody>
              {history.map((h) => (
                <tr
                  key={h.id}
                  className="border-t border-gray-200 dark:border-gray-700
                             hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{h.date}</td>
                  <td className="p-3 text-center">{h.unitsConsumed}</td>
                  <td className="p-3 text-center">₹{h.billAmount}</td>
                  <td className="p-3 text-center">
                    <a
                      href={`http://localhost:8080/api/bill/download/${h.id}`}
                      className="text-blue-500 underline"
                    >
                      Download PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
