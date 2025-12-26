export default function RewardBadge({ points }) {
  return (
    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow">
      🌱 <span className="font-medium">Reward Points:</span>
      <b>{points}</b>
    </div>
  );
}
