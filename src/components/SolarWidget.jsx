// SolarWidget.jsx — Widget dati meteo-energetici in tempo reale
// Icone sostituite con SVG inline (Sun, Wind, Thermometer, CloudLightning)
import { useAppStore } from "../store/useAppStore";

// ─── Icone SVG inline (sostituzione lucide-react) ────────────────────────────

// Icona Sole — analoga a lucide-react Sun
const IconSun = ({ size = 14, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

// Icona Vento — analoga a lucide-react Wind
const IconWind = ({ size = 14, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
);

// Icona Termometro — analoga a lucide-react Thermometer
const IconThermometer = ({ size = 14, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);

// Icona Fulmine/Nuvola (CO2) — analoga a lucide-react CloudLightning
const IconCloudLightning = ({ size = 14, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
    <path d="m13 12-3 5h4l-3 5" />
  </svg>
);

// ─── Componente Singolo Dato ─────────────────────────────────────────────────

function DataItem({ label, value, unit, sub, color, icon }) {
  const theme = useAppStore((s) => s.theme);
  const dk    = theme === "dark";
  return (
    // Card con bordo, sfondo differente in base alla modalità scura/clara
    <div className={`rounded-xl p-3 text-center border
      ${dk ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
      {/* Icona decorativa sopra il dato */}
      <div className={`flex justify-center mb-1 ${dk ? "text-gray-500" : "text-gray-400"}`}>
        {icon}
      </div>
      <p className={`text-xs mb-1 ${dk ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
      {/* Valore principale + unità di misura */}
      <p className={`text-lg font-black leading-none ${color}`}>
        {value}<span className="text-xs font-normal ml-0.5">{unit}</span>
      </p>
      {/* Sottodato (percentuale / indicatore qualitativo) */}
      <p className={`text-xs mt-1 ${dk ? "text-gray-500" : "text-gray-400"}`}>{sub}</p>
    </div>
  );
}

// ─── Skeleton di caricamento ─────────────────────────────────────────────────

function Skel() {
  return (
    // Griglia 2x2 (mobile) / 4 colonne (desktop) con placeholder animati
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[1,2,3,4].map(i => (
        <div key={i} className="h-20 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
      ))}
    </div>
  );
}

// ─── Widget principale ───────────────────────────────────────────────────────

export default function SolarWidget({ currentData: cur, cityName, loading }) {
  const theme = useAppStore((s) => s.theme);
  const dk    = theme === "dark";

  // Durante il caricamento mostra lo skeleton
  if (loading || !cur) return <Skel />;

  // Messaggio qualitativo sullo stato solare basato su irraggiamento e ora del giorno
  const solarMsg = !cur.isDay            ? "🌙 Notte — pannelli inattivi"
    : cur.solarNow < 50                   ? "☁️ Nuvolosità elevata"
    : cur.solarNow < 300                  ? "⛅ Produzione parziale"
    :                                       "☀️ Ottima produzione solare";

  return (
    <div>
      {/* Intestazione con emoji e nome città */}
      <p className="text-xs font-bold text-emerald-500 mb-3">
        🌞 Dati in tempo reale — {cityName}
      </p>
      {/* Griglia 2x2 delle metriche */}
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
      {/* Messaggio di stato solare */}
      <p className={`text-center text-xs italic mt-3
        ${dk ? "text-gray-500" : "text-gray-400"}`}>
        {solarMsg}
      </p>
    </div>
  );
}
