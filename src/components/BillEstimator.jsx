// components/BillEstimator.jsx
export default function BillEstimator({ units }) {
  const rate = 5; // ₹ per unit
  const bill = units * rate;

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-semibold mb-2">Estimated Bill</h3>
      <p className="text-xl font-bold text-blue-600">₹ {bill}</p>
    </div>
  );
}
