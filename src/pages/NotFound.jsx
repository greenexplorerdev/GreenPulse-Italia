// src/pages/NotFound.jsx — Tailwind CSS 4
//
// ATTIVATA IN DUE CASI:
//   1. URL inesistente → <Route path="*" element={<NotFound />} />
//   2. Accesso non autorizzato → link con state={{ unauthorized: true }}
//
// COLLEGAMENTO: legge useAppStore per il tema, useLocation per il path
// Icone: TreePine, Home, ArrowLeft, ShieldOff, Leaf → tutte SVG inline

import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

// ─── Icone SVG inline ─────────────────────────────────────────────────────────

// Albero di pini — analoga a lucide-react TreePine
const IconTreePine = ({ size = 44, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    {/* Chioma triangolare superiore */}
    <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H14l3 3.3a1 1 0 0 1-.7 1.7H17z" />
    {/* Tronco */}
    <path d="M12 22v-3" />
  </svg>
);

// Casa / Home — analoga a lucide-react Home
const IconHome = ({ size = 15, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// Freccia sinistra — analoga a lucide-react ArrowLeft
const IconArrowLeft = ({ size = 15, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// Scudo sbarrato — analoga a lucide-react ShieldOff
const IconShieldOff = ({ size = 44, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18" />
    <path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

// Foglia — analoga a lucide-react Leaf
const IconLeaf = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

// ─── Pagina 404 / 401 ─────────────────────────────────────────────────────────

export default function NotFound() {
  const location       = useLocation();
  const navigate       = useNavigate();
  const theme          = useAppStore((s) => s.theme);
  const dk             = theme === "dark";
  // Se l'utente è stato reindirizzato da ProtectedRoute, mostra 401
  const isUnauthorized = location.state?.unauthorized === true;

  return (
    // Sfondo differente per i due casi
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center
      ${dk ? "bg-gray-950" : "bg-gradient-to-br from-emerald-50 to-green-100"}`}>

      {/* Icona centrale con gradiente */}
      <div className={`flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-2xl
        ${isUnauthorized
          ? "bg-gradient-to-br from-red-500 to-rose-400 shadow-red-200 dark:shadow-red-900/40"
          : "bg-gradient-to-br from-emerald-500 to-green-400 shadow-emerald-200 dark:shadow-emerald-900/40"}`}>
        {isUnauthorized
          ? <IconShieldOff size={44} className="text-white" />
          : <IconTreePine  size={44} className="text-white" />}
      </div>

      {/* Numero errore grande */}
      <p className={`text-8xl font-black leading-none mb-3
        ${isUnauthorized ? "text-red-500" : "text-emerald-500"}`}>
        {isUnauthorized ? "401" : "404"}
      </p>

      {/* Titolo */}
      <h1 className={`text-2xl font-bold mb-3
        ${dk ? "text-gray-100" : "text-gray-800"}`}>
        {isUnauthorized ? "Accesso non autorizzato" : "Pagina non trovata"}
      </h1>

      {/* Descrizione */}
      <p className={`text-sm max-w-sm leading-relaxed mb-8
        ${dk ? "text-gray-400" : "text-gray-500"}`}>
        {isUnauthorized
          ? "Devi effettuare il login per accedere a questa sezione di GreenPulse Italia."
          : "La pagina che cerchi non esiste o l'URL non è corretto."}
      </p>

      {/* Citazione green */}
      <div className={`flex items-center gap-2 rounded-xl px-4 py-3 mb-8 border max-w-sm
        ${dk
          ? "bg-emerald-950 border-emerald-900"
          : "bg-emerald-50 border-emerald-200"}`}>
        <IconLeaf size={14} className="text-emerald-500 shrink-0" />
        <p className="text-xs text-emerald-600 dark:text-emerald-400 italic">
          "La natura non spreca energia — nemmeno noi dovremmo."
        </p>
      </div>

      {/* Pulsanti azione */}
      <div className="flex flex-wrap gap-3 justify-center">
        {/* Torna alla pagina precedente */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
            border transition-all duration-200 hover:scale-105
            ${dk
              ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
          <IconArrowLeft size={15} />
          Indietro
        </button>

        {/* Torna alla Home */}
        <Link to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
            text-white bg-gradient-to-r from-emerald-600 to-green-500
            hover:from-emerald-700 hover:to-green-600 shadow-lg shadow-emerald-200
            dark:shadow-emerald-900/40 transition-all duration-200 hover:scale-105">
          <IconHome size={15} />
          Home
        </Link>

        {/* Solo per 401: pulsante Accedi */}
        {isUnauthorized && (
          <Link to="/login"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
              text-white bg-emerald-600 hover:bg-emerald-700
              transition-all duration-200 hover:scale-105">
            Accedi
          </Link>
        )}
      </div>

      {/* Path corrente mostrato solo per 404 */}
      {!isUnauthorized && (
        <p className={`mt-6 text-xs font-mono ${dk ? "text-gray-600" : "text-gray-400"}`}>
          Percorso: <span className="text-emerald-500">{location.pathname}</span>
        </p>
      )}
    </div>
  );
}