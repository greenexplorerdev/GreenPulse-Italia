// WelcomeModal.jsx — Modale di benvenuto / tutorial animato in 4 step
// Icone sostituite: Leaf, MapPin, BarChart2, Moon, X, ChevronRight → SVG inline
import { useState } from "react";
import { useAppStore } from "../store/useAppStore";

// ─── Icone SVG inline ─────────────────────────────────────────────────────────

// Foglia / piantina — analoga a lucide-react Leaf
const IconLeaf = ({ size = 32, className = "" }) => (
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
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

// Puntina mappa — analoga a lucide-react MapPin
const IconMapPin = ({ size = 32, className = "" }) => (
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
    <circle cx="12" cy="11" r="3" />
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);

// Grafico a barre — analoga a lucide-react BarChart2
const IconBarChart2 = ({ size = 32, className = "" }) => (
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
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

// Luna — analoga a lucide-react Moon
const IconMoon = ({ size = 32, className = "" }) => (
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
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// X (chiudi) — analoga a lucide-react X
const IconX = ({ size = 16, className = "" }) => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Chevron destro — analoga a lucide-react ChevronRight
const IconChevronRight = ({ size = 14, className = "" }) => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Contenuto dei 4 step del tutorial ───────────────────────────────────────
// Ogni step ha: icona SVG, gradiente di sfondo, titolo e descrizione

const STEPS = [
  {
    icon: <IconLeaf size={32} className="text-white" />,
    bg:   "from-emerald-500 to-green-400",
    title:"Benvenuto in GreenPulse Italia",
    body: "Dashboard energetica con dati in tempo reale su irraggiamento solare, vento e CO₂ per 9 regioni italiane.",
  },
  {
    icon: <IconMapPin size={32} className="text-white" />,
    bg:   "from-blue-500 to-cyan-400",
    title:"Scegli regione e città",
    body: "Il selettore regione aggiorna i dati e naviga automaticamente alla pagina degli impianti. Le 5 città usano coordinate reali per l'API solare.",
  },
  {
    icon: <IconBarChart2 size={32} className="text-white" />,
    bg:   "from-violet-500 to-purple-400",
    title:"Grafici in tempo reale",
    body: "I tre grafici mostrano l'andamento di oggi: irraggiamento solare, CO₂ stimata e vento. Dati da Open-Meteo, aggiornati ogni ora.",
  },
  {
    icon: <IconMoon size={32} className="text-white" />,
    bg:   "from-gray-600 to-gray-500",
    title:"Dark mode e filtri",
    body: "Il pulsante 🌙 in basso a destra alterna i temi. I filtri Tutte / Rinnovabili / Fossili sono condivisi tra Dashboard e pagine Regione.",
  },
];

export default function WelcomeModal() {
  // Tema dark/light dallo store globale
  const theme = useAppStore((s) => s.theme);
  const dk    = theme === "dark";

  // open: mostra modale solo la prima volta (localStorage)
  // step: quale step del tutorial è attivo (0-3)
  const [open, setOpen]   = useState(
    () => !localStorage.getItem("gp-tutorial-seen")
  );
  const [step, setStep]   = useState(0);

  // Chiudi e segna tutorial come visto
  function close() {
    localStorage.setItem("gp-tutorial-seen", "1");
    setOpen(false);
  }

  // Se chiuso: mostra solo un pulsante circolare flottante "?"
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title="Apri guida"
        className="fixed bottom-20 right-5 z-50 w-8 h-8 rounded-full text-xs font-bold
          bg-emerald-600 text-white shadow-lg hover:bg-emerald-700
          flex items-center justify-center transition-all hover:scale-110">
        ?
      </button>
    );
  }

  const s = STEPS[step];

  return (
    // Overlay scuro con effetto blur
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4
      bg-black/50 backdrop-blur-sm"
      onClick={close}>
      {/* Card modale — stopPropagation per non chiudere cliccando dentro */}
      <div
        onClick={e => e.stopPropagation()}
        className={`w-full max-w-sm rounded-2xl shadow-2xl p-6 animate-fade-in
          ${dk ? "bg-gray-900 border border-gray-800" : "bg-white"}`}>

        {/* Pulsante chiudi (X) in alto a destra */}
        <button onClick={close}
          className={`absolute top-4 right-4 p-1 rounded-lg
            ${dk ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}>
          <IconX size={16} />
        </button>

        {/* Icona decorativa con gradiente */}
        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl
          bg-gradient-to-br ${s.bg} mx-auto mb-4 shadow-lg`}>
          {s.icon}
        </div>

        {/* Titolo e descrizione dello step */}
        <h2 className={`text-base font-bold text-center mb-2
          ${dk ? "text-gray-100" : "text-gray-800"}`}>
          {s.title}
        </h2>
        <p className={`text-sm text-center leading-relaxed mb-5
          ${dk ? "text-gray-400" : "text-gray-500"}`}>
          {s.body}
        </p>

        {/* Indicatori dots (pallini) per navigazione step */}
        <div className="flex justify-center gap-1.5 mb-5">
          {STEPS.map((_, i) => (
            <button key={i} onClick={() => setStep(i)}
              className={`rounded-full transition-all duration-200
                ${i === step
                  ? "w-5 h-1.5 bg-emerald-500"   // pallino attivo allungato
                  : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600"}`} />
          ))}
        </div>

        {/* Pulsanti navigazione: Indietro / Avanti / Inizia */}
        <div className="flex gap-2">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              className={`flex-1 py-2 rounded-xl text-sm border transition-colors
                ${dk
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              ← Indietro
            </button>
          )}
          <button
            onClick={step < STEPS.length - 1 ? () => setStep(s => s + 1) : close}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
              text-sm font-bold text-white
              bg-emerald-600 hover:bg-emerald-700 transition-colors">
            {step < STEPS.length - 1
              ? <><span>Avanti</span><IconChevronRight size={14} /></>
              : "Inizia →"}
          </button>
        </div>

        {/* Link "Salta" visibile solo se non siamo all'ultimo step */}
        {step < STEPS.length - 1 && (
          <button onClick={close}
            className={`w-full mt-2 text-xs text-center
              ${dk ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"}`}>
            Salta
          </button>
        )}
      </div>
    </div>
  );
}
