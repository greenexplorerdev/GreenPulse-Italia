// src/components/charts/EnergyAreaChart.jsx
//
// Grafico ad area: velocità del vento nelle 24 ore.
// Cambiato rispetto alla versione precedente: invece di mostrare
// produzione solare settimanale (dati inventati), ora mostra
// il vento reale di oggi per la città selezionata.
//
// Props:
//   hourlyData : { times: string[], windHourly: number[] } | null
//   loading    : boolean

import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";

export default function EnergyAreaChart({ hourlyData, loading }) {

  if (loading || !hourlyData) {
    return <ChartSkeleton />;
  }

  const { times, windHourly } = hourlyData;

  // Ogni 2 ore per non affollare
  const chartData = times
    .map((ora, i) => ({ ora, vento: windHourly[i] }))
    .filter((_, i) => i % 2 === 0);

  // Soglia buona per le turbine eoliche di piccola taglia
  const SOGLIA_EOLICO = 15;

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const val = payload[0].value;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-xs shadow">
        <p className="font-medium text-gray-700 dark:text-gray-200">{label}</p>
        <p className="text-blue-500">{val} km/h</p>
        <p className="text-gray-400">
          {val < 10 ? "Calma piatta" : val < 20 ? "Brezza leggera" : val < 40 ? "Vento moderato" : "Vento forte"}
        </p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="windgradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>
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
          unit="km"
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={SOGLIA_EOLICO}
          stroke="#60a5fa"
          strokeDasharray="4 4"
          strokeWidth={1}
          label={{ value: "min turbine", fontSize: 9, fill: "#60a5fa", position: "insideTopRight" }}
        />
        <Area
          type="monotone"
          dataKey="vento"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#windgradient)"
          dot={false}
          activeDot={{ r: 4, fill: "#3b82f6" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-[200px] animate-pulse">
      <div className="h-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 rounded-lg" />
    </div>
  );
}
