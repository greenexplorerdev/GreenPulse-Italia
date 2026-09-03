import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useAppStore } from "../../store/useAppStore";

function CT({ active, payload, label, dk }) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  return (
    <div className={`rounded-lg px-3 py-2 text-xs shadow-lg border
      ${dk ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}`}>
      <p className="font-semibold mb-0.5">{label}</p>
      <p className={v < 300 ? "text-emerald-500" : "text-red-400"}>{v} g/kWh</p>
    </div>
  );
}

export default function CO2LineChart({ hourlyData, loading }) {
  const dk = useAppStore((s) => s.theme) === "dark";

  if (loading || !hourlyData) {
    return <div className="h-44 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />;
  }

  const { times, co2Hourly } = hourlyData;
  const data = times
    .map((ora, i) => ({ ora, co2: co2Hourly[i] }))
    .filter((_, i) => i % 2 === 0);

  return (
    <ResponsiveContainer width="100%" height={176}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -26, bottom: 0 }} isAnimationActive={false}>
        <defs>
          <linearGradient id="co2grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <XAxis dataKey="ora" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} domain={[150, 480]} />
        <Tooltip content={(p) => <CT {...p} dk={dk} />} />
        <ReferenceLine y={300} stroke="#10b981" strokeDasharray="3 3" strokeWidth={1} />
        <Area type="monotone" dataKey="co2"
          stroke="#ef4444" strokeWidth={2}
          fill="url(#co2grad)"
          dot={false} activeDot={{ r: 4, fill: "#ef4444" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
