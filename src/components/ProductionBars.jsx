export default function ProductionBars({ data, dk }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(p => p.value));
  return (
    <div className="space-y-2">
      {data.map(p => {
        const pct = max > 0 ? (p.value / max) * 100 : 0;
        const isRen = p.type === "renewable";
        return (
          <div key={p.source} className="flex items-center gap-3">
            <span className="text-sm w-6 text-center shrink-0">{p.icon}</span>
            <span className={`text-xs w-32 shrink-0 ${dk ? "text-gray-300" : "text-gray-700"}`}>
              {p.short}
            </span>
            <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
              <div
                className={`h-2 rounded-full transition-all duration-700 ${isRen ? "bg-emerald-500" : "bg-orange-400"}`}
                style={{ width: `${Math.max(2, pct)}%` }}
              />
            </div>
            <span className={`text-xs font-bold w-20 text-right tabular-nums ${isRen ? "text-emerald-500" : "text-orange-500"}`}>
              {p.value.toLocaleString(undefined, { maximumFractionDigits: 0 })} GWh
            </span>
            {p.yoYPercentage != null && (
              <span className={`text-[10px] w-12 text-right tabular-nums
                ${p.yoYValue > 0 ? "text-emerald-500" : p.yoYValue < 0 ? "text-red-500" : "text-gray-400"}`}>
                {p.yoYValue > 0 ? "▲" : p.yoYValue < 0 ? "▼" : "·"} {Math.abs(p.yoYValue).toFixed(1)}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
