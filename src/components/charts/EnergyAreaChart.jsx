  import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

  const data = [
    { giorno: "Lun", kwh: 42 },
    { giorno: "Mar", kwh: 38 },
    { giorno: "Mer", kwh: 55 },
    { giorno: "Gio", kwh: 61 },
    { giorno: "Ven", kwh: 48 },
    { giorno: "Sab", kwh: 70 },
    { giorno: "Dom", kwh: 65 },
  ];

  export default function EnergyAreaChart() {
    return (
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <XAxis dataKey="giorno" />
          <YAxis />
          <Tooltip />
          <Area dataKey="kwh" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }