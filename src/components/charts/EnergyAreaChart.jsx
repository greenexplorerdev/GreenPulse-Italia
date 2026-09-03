import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useAppStore } from "../../store/useAppStore";

function CT({ active, payload, label, dk }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`rounded-lg px-3 py-2 text-xs shadow-lg border
      ${dk ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}`}>
      <p className="font-semibold mb-0.5">{label}</p>
      <p className="text-blue-400">{payload[0].value} km/h</p>
    </div>
  );
}

export default function EnergyAreaChart({ hourlyData, loading }) {
  const dk = useAppStore((s) => s.theme) === "dark";

  if (loading || !hourlyData) {
    return <div className="h-44 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />;
  }

  const { times, windHourly } = hourlyData;
  const data = times
    .map((ora, i) => ({ ora, vento: windHourly[i] }))
    .filter((_, i) => i % 2 === 0);

  return (
    <ResponsiveContainer width="100%" height={176}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -26, bottom: 0 }} isAnimationActive={false}>
        <defs>
          <linearGradient id="windgrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <XAxis dataKey="ora" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
        <Tooltip content={(p) => <CT {...p} dk={dk} />} />
        <ReferenceLine y={15} stroke="#60a5fa" strokeDasharray="3 3" strokeWidth={1} />
        <Area type="monotone" dataKey="vento"
          stroke="#3b82f6" strokeWidth={2}
          fill="url(#windgrad)"
          dot={false} activeDot={{ r: 4, fill: "#3b82f6" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
