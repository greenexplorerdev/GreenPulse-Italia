 import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

  const data = [
    { ora: "00:00", co2: 280 },
    { ora: "03:00", co2: 310 },
    { ora: "06:00", co2: 260 },
    { ora: "09:00", co2: 180 },
    { ora: "12:00", co2: 140 },
    { ora: "15:00", co2: 160 },
    { ora: "18:00", co2: 220 },
    { ora: "21:00", co2: 270 },
  ];

  export default function CO2LineChart() {
    return (
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="ora" />
          <YAxis />
          <Tooltip />
          <Line dataKey="co2" stroke="#ef4444" dot={true} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
