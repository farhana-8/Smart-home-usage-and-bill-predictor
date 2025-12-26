import SummaryCard from "../components/SummaryCard";
import EnergyChart from "../components/EnergyChart";
import BillEstimator from "../components/BillEstimator";
import Tips from "../components/Tips";

export default function Dashboard() {
  const usageData = [
    { day: "Mon", usage: 12 },
    { day: "Tue", usage: 18 },
    { day: "Wed", usage: 10 },
    { day: "Thu", usage: 22 },
    { day: "Fri", usage: 15 },
  ];

  const totalUnits = usageData.reduce((sum, d) => sum + d.usage, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Units Consumed" value={`${totalUnits} kWh`} />
        <SummaryCard title="Estimated Bill" value={`₹ ${totalUnits * 5}`} />
        <SummaryCard title="Reward Points" value="40" />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <EnergyChart data={usageData} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BillEstimator units={totalUnits} />
        <Tips />
      </div>
    </div>
  );
}
