import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { ora: "06:00", valore: 0 },
  { ora: "08:00", valore: 120 },
  { ora: "10:00", valore: 340 },
  { ora: "12:00", valore: 520 },
  { ora: "14:00", valore: 480 },
  { ora: "16:00", valore: 280 },
  { ora: "18:00", valore: 80 },
  { ora: "20:00", valore: 0 },
];

export default function SolarBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="ora" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="valore" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
