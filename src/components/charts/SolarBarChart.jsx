// src/components/charts/SolarBarChart.jsx
//
// Grafico a barre: irraggiamento solare nelle 24 ore del giorno.
// Riceve i dati orari REALI da Dashboard tramite prop "hourlyData".
// Se i dati non sono ancora arrivati, mostra un placeholder animato.
//
// Props:
//   hourlyData : { times: string[], solarHourly: number[] } | null
//   loading    : boolean

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";

export default function SolarBarChart({ hourlyData, loading }) {

  // ── Placeholder durante il caricamento ───────────────────────────────────
  if (loading || !hourlyData) {
    return <ChartSkeleton />;
  }

  const { times, solarHourly } = hourlyData;

  // Costruiamo l'array di oggetti per Recharts
  // Filtriamo solo le ore pari (0, 2, 4...) per non affollare l'asse X
  const chartData = times
    .map((ora, i) => ({ ora, valore: solarHourly[i] }))
    .filter((_, i) => i % 2 === 0); // ogni 2 ore

  // Valore massimo per colorare la barra di picco
  const maxVal = Math.max(...solarHourly);

  // Tooltip personalizzato
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-xs shadow">
        <p className="font-medium text-gray-700 dark:text-gray-200">{label}</p>
        <p className="text-amber-500">{payload[0].value} W/m²</p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="ora"
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          unit=" W"
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
        {/* Linea di riferimento al "buon livello" (400 W/m²) */}
        <ReferenceLine y={400} stroke="#fbbf24" strokeDasharray="4 4" strokeWidth={1} />
        <Bar dataKey="valore" radius={[4, 4, 0, 0]} maxBarSize={24}>
          {chartData.map((entry, i) => (
            <Cell
              key={i}
              // Barra di picco in arancione brillante, le altre in verde/grigio
              fill={
                entry.valore === maxVal && maxVal > 0
                  ? "#f59e0b"
                  : entry.valore > 200
                  ? "#10b981"
                  : entry.valore > 0
                  ? "#6ee7b7"
                  : "#e5e7eb"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-[200px] flex items-end gap-1 px-2 animate-pulse">
      {[30, 0, 0, 20, 60, 90, 100, 80, 50, 20, 5, 0].map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-t"
          style={{ height: `${Math.max(4, h)}%` }}
        />
      ))}
    </div>
  );
}
