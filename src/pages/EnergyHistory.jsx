import { useEffect, useState } from "react";
import { getEnergyHistory } from "../services/energyService";
import EnergyChart from "../components/EnergyChart";

export default function EnergyHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEnergyHistory()
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (data.length === 0) return <p className="text-center">No data available</p>;

  return <EnergyChart data={data} />;
}
