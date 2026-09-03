// src/components/charts/HistoryChart.jsx
// Grafico serie storica nazionale produzione GWh per anno (rinnovabili vs fossili).
// Fonte: TERNA produzionePerFonteAnnuale

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

function CT({ active, payload, label, dk }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`rounded-lg px-3 py-2 text-xs shadow-lg border
      ${dk ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}`}>
      <p className="font-semibold mb-0.5">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString(undefined, { maximumFractionDigits: 0 })} GWh
        </p>
      ))}
    </div>
  );
}

export default function HistoryChart({ data, loading }) {
  const dk = document.documentElement.classList.contains("dark");
  if (loading || !data?.length) {
    return <div className="h-44 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />;
  }
  return (
    <ResponsiveContainer width="100%" height={176}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -22, bottom: 0 }} isAnimationActive={false}>
        <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
        <Tooltip content={(p) => <CT {...p} dk={dk} />} />
        <Legend wrapperStyle={{ fontSize: 10 }} />
        <Bar dataKey="renewable" stackId="a" name="Rinnovabili" fill="#10b981" />
        <Bar dataKey="fossil"    stackId="a" name="Fossili"    fill="#fb923c" />
      </BarChart>
    </ResponsiveContainer>
  );
}
