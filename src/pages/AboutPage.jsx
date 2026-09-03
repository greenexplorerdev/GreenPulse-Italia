// AboutPage.jsx — Pagina informazioni progetto
// Icone sostituite: Leaf, Code, Globe, Info → SVG inline
import { useAppStore } from "../store/useAppStore";

// ─── Icone SVG inline ─────────────────────────────────────────────────────────

// Foglia — analoga a lucide-react Leaf
const IconLeaf = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

// Codice / GitHub — analoga a lucide-react Code
const IconCode = ({ size = 15, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// Globo / mondo — analoga a lucide-react Globe
const IconGlobe = ({ size = 15, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Info — analoga a lucide-react Info
const IconInfo = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// ─── Stack tecnico ─────────────────────────────────────────────────────────────
// Nota: lucide-react è stato sostituito con SVG inline (in questo refactoring)
const STACK = [
  { name:"React 19",        desc:"UI component library" },
  { name:"Vite",            desc:"Build tool" },
  { name:"Tailwind CSS 4", desc:"Utility-first styling" },
  { name:"Zustand",         desc:"State management + persist" },
  { name:"React Router v7",desc:"Client-side routing" },
  { name:"Recharts",         desc:"Data visualization" },
  { name:"React Hook Form", desc:"Form validation" },
  { name:"SVG inline",       desc:"Icon library (no deps)" },
  { name:"Open-Meteo API",  desc:"Solar & weather data (free)" },
];

// ─── Pagina About ─────────────────────────────────────────────────────────────

export default function AboutPage() {
  const theme = useAppStore((s) => s.theme);
  const dk    = theme === "dark";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">

      {/* ── Header con logo e nome ── */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl
          bg-linear-to-br from-emerald-500 to-green-400">
          <IconLeaf size={20} className="text-white" />
        </div>
        <div>
          <h1 className={`text-xl font-extrabold ${dk ? "text-gray-100" : "text-gray-800"}`}>
            GreenPulse Italia
          </h1>
          <p className={`text-sm ${dk ? "text-gray-400" : "text-gray-500"}`}>
            Dashboard energetica — Cosimo Francesco Di Ruscio · 2026
          </p>
        </div>
      </div>

      {/* ── Scopo del progetto ── */}
      <div className={`rounded-2xl p-5 border
        ${dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
        <h2 className={`text-sm font-bold mb-2 ${dk ? "text-gray-200" : "text-gray-700"}`}>
          Scopo del progetto
        </h2>
        <p className={`text-sm leading-relaxed ${dk ? "text-gray-400" : "text-gray-600"}`}>
          Dashboard energetica italiana: irraggiamento solare per città, mix rinnovabili/fossili per regione,
          capacità installata per fonte. Dati meteo da Open-Meteo (no API key), dati produzione/capacità/emissioni
          da dataset ufficiali TERNA/GSE 2024 per tutte le 20 regioni.
        </p>
      </div>

      {/* ── Note sorgenti dati ── */}
      <div className={`rounded-2xl p-5 border border-amber-200 dark:border-amber-800
        ${dk ? "bg-amber-950/50" : "bg-amber-50/50"}`}>
        <div className="flex items-start gap-2 mb-2">
          <IconInfo size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <h2 className={`text-sm font-bold ${dk ? "text-amber-300" : "text-amber-700"}`}>
            Sorgenti dati
          </h2>
        </div>
        <div className={`text-xs leading-relaxed space-y-1.5 ${dk ? "text-amber-200" : "text-amber-800"}`}>
          <p>
            <strong>Open-Meteo</strong> — dati meteorologici in tempo reale (irraggiamento solare, vento,
            temperatura, copertura nuvolosa, intensità carbonica) — API gratuita, nessuna key richiesta.
          </p>
          <p>
            <strong>TERNA/GSE</strong> — dati ufficiali 2024 per tutte le 20 regioni italiane:
            produzione lorda per fonte e combustibile (GWh), capacità installata rinnovabile (MW),
            emissioni CO₂ per combustibile (Mt). Capacità fossile stimata da produzione lorda fossile / 5500h.
          </p>
          <ul className="list-disc list-inside ml-2 space-y-0.5">
            <li><a href="https://www.terna.it/it/sistema-elettrico/statistiche" target="_blank" rel="noopener noreferrer"
              className="underline hover:no-underline">terna.it — Statistiche</a></li>
            <li><a href="https://www.gse.it/dati-e-scenari/statistiche" target="_blank" rel="noopener noreferrer"
              className="underline hover:no-underline">gse.it — Dati e scenari</a></li>
          </ul>
        </div>
      </div>

      {/* ── Stack tecnico ── */}
      <div className={`rounded-2xl p-5 border
        ${dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
        <h2 className={`text-sm font-bold mb-3 ${dk ? "text-gray-200" : "text-gray-700"}`}>
          Stack tecnico
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STACK.map(({ name, desc }) => (
            <div key={name} className={`flex items-center justify-between
              px-3 py-2 rounded-xl border
              ${dk ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
              <span className={`text-xs font-semibold ${dk ? "text-gray-200" : "text-gray-700"}`}>
                {name}
              </span>
              <span className={`text-xs ${dk ? "text-gray-500" : "text-gray-400"}`}>
                {desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Link social ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Link GitHub */}
        <a href="https://github.com/greenexplorerdev" target="_blank" rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl
            text-sm font-medium border transition-all hover:scale-105
            ${dk
              ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
          <IconCode size={15} />
          github.com/greenexplorerdev
        </a>
        {/* Link LinkedIn */}
        <a href="https://www.linkedin.com/in/cosimo-francesco-di-ruscio"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl
            text-sm font-bold text-white
            bg-linear-to-r from-emerald-600 to-green-500
            hover:from-emerald-700 hover:to-green-600
            shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40
            transition-all hover:scale-105">
          <IconGlobe size={15} />
          LinkedIn
        </a>
      </div>
    </div>
  );
}
