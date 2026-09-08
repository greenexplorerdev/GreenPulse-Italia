import { useAppStore } from "../store/useAppStore";
import { IconSun, IconWind, IconThermometer, IconCloudLightning } from "./icons";

function DataItem({ label, value, unit, sub, color, icon }) {
  const theme = useAppStore((s) => s.theme);
  const dk    = theme === "dark";
  return (
    <div className={`rounded-xl p-3 text-center border
      ${dk ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
      <div className={`flex justify-center mb-1 ${dk ? "text-gray-500" : "text-gray-400"}`}>
        {icon}
      </div>
      <p className={`text-xs mb-1 ${dk ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
      <p className={`text-lg font-black leading-none ${color}`}>
        {value}<span className="text-xs font-normal ml-0.5">{unit}</span>
      </p>
      <p className={`text-xs mt-1 ${dk ? "text-gray-500" : "text-gray-400"}`}>{sub}</p>
    </div>
  );
}

function Skel() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[1,2,3,4].map(i => (
        <div key={i} className="h-20 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
      ))}
    </div>
  );
}

export default function SolarWidget({ currentData: cur, cityName, loading }) {
  const theme = useAppStore((s) => s.theme);
  const dk    = theme === "dark";

  if (loading || !cur) return <Skel />;

  const solarMsg = !cur.isDay            ? "🌙 Notte — pannelli inattivi"
    : cur.solarNow < 50                   ? "☁️ Nuvolosità elevata"
    : cur.solarNow < 300                  ? "⛅ Produzione parziale"
    :                                       "☀️ Ottima produzione solare";

  return (
    <div>
      <p className="text-xs font-bold text-emerald-500 mb-3">
        🌞 Dati in tempo reale — {cityName}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <DataItem
          label="Irraggiamento" value={cur.solarNow} unit="W/m²"
          sub={`${cur.solarPct}% del max`}
          color="text-amber-500" icon={<IconSun size={14} />} />
        <DataItem
          label="Vento" value={cur.windNow} unit="km/h"
          sub={`${cur.windPct}% eolico`}
          color="text-blue-500" icon={<IconWind size={14} />} />
        <DataItem
          label="Temperatura" value={cur.tempNow} unit="°C"
          sub={`Nuv. ${cur.cloudNow}%`}
          color="text-orange-400" icon={<IconThermometer size={14} />} />
        <DataItem
          label="CO₂ stimata" value={cur.co2Now} unit="g/kWh"
          sub={cur.co2Now < 250 ? "✅ Bassa" : cur.co2Now < 350 ? "⚠️ Media" : "🔴 Alta"}
          color={cur.co2Now < 250 ? "text-emerald-500" : cur.co2Now < 350 ? "text-amber-500" : "text-red-500"}
          icon={<IconCloudLightning size={14} />} />
      </div>
      <p className={`text-center text-xs italic mt-3
        ${dk ? "text-gray-500" : "text-gray-400"}`}>
        {solarMsg}
      </p>
    </div>
  );
}
