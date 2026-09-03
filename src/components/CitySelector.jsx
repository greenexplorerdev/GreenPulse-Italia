// CitySelector.jsx — Selettore città con chip emoji
// Sostituita icona lucide-react MapPin con SVG inline per eliminare dipendenza esterna
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { CITIES }      from "../data/cities";

// Icona SVG: map-punch (puntina di posizione) — sostituzione diretta di lucide-react MapPin
const IconMapPin = ({ size = 12, className = "" }) => (
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
    {/* Cerchio superiore */}
    <circle cx="12" cy="11" r="3" />
    {/* Forma a lacrima / puntina */}
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);

export default function CitySelector() {
  // Stati globali da Zustand store
  const setCity  = useAppStore((s) => s.setCity);
  const setRegion= useAppStore((s) => s.setRegion);
  const selected = useAppStore((s) => s.selectedCity);
  const theme    = useAppStore((s) => s.theme);
  // dk = dark mode flag
  const dk       = theme === "dark";

  // Seleziona città: aggiorna store + regione associata
  function handleSelect(city) {
    setCity(city);
    setRegion(city.region);
  }

  return (
    <div className="w-full">
      {/* Etichetta con icona puntina */}
      <p className={`flex items-center gap-1.5 text-xs font-semibold mb-2
        ${dk ? "text-gray-400" : "text-gray-500"}`}>
        <IconMapPin size={12} className="text-emerald-500" />
        Città
      </p>
      <div className="flex flex-wrap gap-2">
        {CITIES.map(city => {
          const active = selected?.id === city.id;
          return (
            <button
              key={city.id}
              onClick={() => handleSelect(city)}
              aria-pressed={active}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                text-xs font-medium border transition-all duration-200
                ${active
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105"
                  : dk
                    ? "bg-gray-800 text-gray-300 border-gray-700 hover:border-emerald-600 hover:text-emerald-400"
                    : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600"
                }`}>
              <span>{city.emoji}</span>
              <span>{city.name}</span>
            </button>
          );
        })}
      </div>
      {selected && (
        <p className={`text-xs mt-2 ${dk ? "text-gray-500" : "text-gray-400"}`}>
          Regione: <span className="text-emerald-500 font-medium">{selected.region}</span>
        </p>
      )}
    </div>
  );
}
