// src/components/charts/CO2LineChart.jsx
//
// Grafico a linea: intensità CO₂ stimata nelle 24 ore.
// I dati vengono da energyApi.js che calcola la CO₂ inversamente
// all'irraggiamento solare (più sole = meno CO₂).
// Valori tipici: 180-450 g/kWh per la rete italiana.
//
// Props:
//   hourlyData : { times: string[], co2Hourly: number[] } | null
//   loading    : boolean

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from "recharts";

export default function CO2LineChart({ hourlyData, loading }) {

  if (loading || !hourlyData) {
    return <ChartSkeleton />;
  }

  const { times, co2Hourly } = hourlyData;

  const chartData = times
    .map((ora, i) => ({ ora, co2: co2Hourly[i] }))
    .filter((_, i) => i % 2 === 0);

  // Soglia "buona" per la CO₂ italiana
  const SOGLIA_BUONA = 300;

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const val = payload[0].value;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-xs shadow">
        <p className="font-medium text-gray-700 dark:text-gray-200">{label}</p>
        <p className={val < SOGLIA_BUONA ? "text-emerald-500" : "text-red-400"}>
          {val} g/kWh
          {val < SOGLIA_BUONA ? " ✅" : " ⚠️"}
        </p>
      </div>
    );
  };

  return (
    // Usiamo AreaChart per riempire l'area sotto la linea
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          {/* Gradiente: verde in basso (CO₂ bassa = buona), rosso in alto */}
          <linearGradient id="co2gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
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
          domain={[150, 480]}
          unit="g"
        />
        <Tooltip content={<CustomTooltip />} />
        {/* Linea di riferimento alla soglia "buona" */}
        <ReferenceLine
          y={SOGLIA_BUONA}
          stroke="#10b981"
          strokeDasharray="4 4"
          strokeWidth={1}
          label={{ value: "soglia", fontSize: 9, fill: "#10b981", position: "insideTopRight" }}
        />
        <Area
          type="monotone"
          dataKey="co2"
          stroke="#ef4444"
          strokeWidth={2}
          fill="url(#co2gradient)"
          dot={false}
          activeDot={{ r: 4, fill: "#ef4444" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-[200px] animate-pulse flex items-center justify-center">
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
}
