// HomePage.jsx — Pagina principale / landing page
// Icone sostituite: Leaf, BarChart2, LogIn, ArrowRight, Zap → SVG inline
import { useNavigate, Link } from "react-router-dom";
import { useAppStore }  from "../store/useAppStore";
import { useAuthStore } from "../store/useAuthStore";

// ─── Icone SVG inline ─────────────────────────────────────────────────────────

// Foglia — analoga a lucide-react Leaf
const IconLeaf = ({ size = 40, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

// Grafico a barre — analoga a lucide-react BarChart2
const IconBarChart2 = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

// Login / freccia entrata — analoga a lucide-react LogIn
const IconLogIn = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

// Freccia destra — analoga a lucide-react ArrowRight
const IconArrowRight = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// Fulmine — analoga a lucide-react Zap
const IconZap = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// ─── Pagina principale ─────────────────────────────────────────────────────────

export default function HomePage() {
  const navigate        = useNavigate();
  const theme           = useAppStore((s) => s.theme);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const dk              = theme === "dark";

  return (
    // Sfondo a gradient o scuro in base al tema
    <div className={`min-h-screen flex flex-col items-center justify-center
      px-4 py-12 text-center
      ${dk ? "bg-gray-950" : "bg-gradient-to-br from-emerald-50 to-green-100"}`}>

      {/* Hero: logo grande con gradiente smeraldo */}
      <div className="flex items-center justify-center w-20 h-20 rounded-3xl mb-6
        bg-gradient-to-br from-emerald-500 to-green-400
        shadow-xl shadow-emerald-200 dark:shadow-emerald-900/40">
        <IconLeaf size={40} className="text-white" />
      </div>

      {/* Titolo principale */}
      <h1 className="text-4xl sm:text-5xl font-black mb-3
        text-emerald-600 dark:text-emerald-400">
        GreenPulse Italia
      </h1>

      {/* Sottotitolo descrittivo */}
      <p className={`text-base sm:text-lg max-w-md leading-relaxed mb-8
        ${dk ? "text-gray-400" : "text-gray-600"}`}>
        Dashboard energetica con dati in tempo reale su irraggiamento solare,
        vento, CO₂ e impianti rinnovabili per ogni regione italiana.
      </p>

      {/* CTA: se autenticato → Dashboard, altrimenti Login + Scopri */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        {isAuthenticated ? (
          // Pulsante principale per utenti loggati
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm
              text-white bg-gradient-to-r from-emerald-600 to-green-500
              hover:from-emerald-700 hover:to-green-600
              shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40
              hover:scale-105 transition-all duration-200">
            <IconBarChart2 size={16} />
            Vai alla Dashboard
            <IconArrowRight size={14} />
          </button>
        ) : (
          <>
            {/* Pulsante accesso */}
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm
                text-white bg-gradient-to-r from-emerald-600 to-green-500
                hover:from-emerald-700 hover:to-green-600
                shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40
                hover:scale-105 transition-all duration-200">
              <IconLogIn size={16} />
              Accedi
            </button>
            {/* Link "Scopri il progetto" */}
            <Link to="/about"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium
                border hover:scale-105 transition-all duration-200
                ${dk
                  ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
              Scopri il progetto
            </Link>
          </>
        )}
      </div>

      {/* Card features: 3 colonne con icone */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mt-2 mb-8">
        {[
          // Card Solare live
          { icon: <IconZap size={18} className="text-amber-500" />, t: "Solare live", d: "Irraggiamento W/m²" },
          // Card CO2 stimata
          { icon: <IconBarChart2 size={18} className="text-emerald-500" />, t: "CO₂ stimata", d: "g/kWh per regione" },
          // Card Mix verde
          { icon: <IconLeaf size={18} className="text-green-500" />, t: "Mix verde", d: "Rinnovabili vs fossili" },
        ].map(({ icon, t, d }) => (
          <div key={t}
            className={`flex items-center gap-3 rounded-xl p-3 border
              ${dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
            {icon}
            <div>
              <p className={`text-sm font-semibold ${dk ? "text-gray-200" : "text-gray-800"}`}>{t}</p>
              <p className={`text-xs ${dk ? "text-gray-500" : "text-gray-400"}`}>{d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feature pills: tech stack */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {["Open-Meteo API","React 18","Zustand","React Router v6","Recharts","Tailwind CSS 4"].map(f => (
          <span key={f}
            className={`text-xs px-3 py-1 rounded-full border
              ${dk
                ? "border-gray-700 bg-gray-800 text-gray-400"
                : "border-gray-200 bg-white text-gray-500"}`}>
              {f}
          </span>
        ))}
      </div>
    </div>
  );
}