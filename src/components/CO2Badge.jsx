const LEVELS = [
  { limit: 250, label: "🟢 Emissioni basse",      text: "text-emerald-500" },
  { limit: 350, label: "🟡 Emissioni moderate",   text: "text-amber-500"   },
  { limit: Infinity, label: "🔴 Alta intensità carbonica", text: "text-red-500" },
];

const LEVEL_BG = (dk, level) => dk
  ? (level === 0 ? "bg-emerald-950 border-emerald-900" : level === 1 ? "bg-amber-950 border-amber-900" : "bg-red-950 border-red-900")
  : (level === 0 ? "bg-emerald-50 border-emerald-200" : level === 1 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200");

const LEVEL_TEXT = (dk, level) => dk
  ? (level === 0 ? "text-emerald-400" : level === 1 ? "text-amber-400" : "text-red-400")
  : (level === 0 ? "text-emerald-700" : level === 1 ? "text-amber-700" : "text-red-700");

export default function CO2Badge({ value, dk }) {
  if (value == null) return null;
  const level = LEVELS.findIndex(L => value < L.limit);
  return (
    <div className={`rounded-xl px-5 py-3 flex items-center justify-between flex-wrap gap-3 border ${LEVEL_BG(dk, level)}`}>
      <p className={`text-sm font-semibold ${LEVEL_TEXT(dk, level)}`}>{LEVELS[level].label}</p>
      <p className={`text-lg font-black ${LEVELS[level].text}`}>{value} g/kWh CO₂</p>
    </div>
  );
}
