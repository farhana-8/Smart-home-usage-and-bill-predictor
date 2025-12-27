import { useEffect, useState } from "react";
import { fetchTipOfTheDay } from "../services/tipService";

export default function DailyTipBanner() {
  const [tip, setTip] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show banner once per session
    const isDismissed = sessionStorage.getItem("tipDismissed");
    if (isDismissed) {
      setDismissed(true);
      return;
    }

    fetchTipOfTheDay().then(setTip);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("tipDismissed", "true");
    setDismissed(true);
  };

  if (!tip || dismissed) return null;

  return (
    <div className="mb-6 bg-yellow-100 border border-yellow-300 text-yellow-900 px-6 py-4 rounded-lg flex justify-between items-start">
      <div>
        <h3 className="font-semibold mb-1">💡 Energy Tip of the Day</h3>
        <p className="text-sm">{tip.description}</p>
      </div>

      <button
        onClick={handleDismiss}
        className="text-sm font-bold text-yellow-700 hover:text-yellow-900"
      >
        ✖
      </button>
    </div>
  );
}
