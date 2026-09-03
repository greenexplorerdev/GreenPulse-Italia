// src/components/Navbar.jsx — Tailwind CSS 4
//
// COLLEGAMENTO CON IL RESTO:
//   - useAppStore  → theme, toggleTheme, region (mostra regione attiva)
//   - useAuthStore → isAuthenticated, user, logout
//   - NavLink      → evidenzia la voce attiva con isActive
//   - Icone: Leaf, Sun, Moon, LogOut, User, BarChart2, Home, Info, Map,
//            ChevronRight, Menu, X → tutte sostituite con SVG inline
//
// STRUTTURA:
//   [🌱 GreenPulse]  [Home | Dashboard | Regioni | About]  [Regione | User | Theme | Logout]
//
// RESPONSIVE:
//   - Mobile: logo + icone essenziali (theme + logout)
//   - sm+: link navigazione completi

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppStore }  from "../store/useAppStore";
import { useAuthStore } from "../store/useAuthStore";

// ─── Icone SVG inline (sostituzione lucide-react) ────────────────────────────

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

// Sole — analoga a lucide-react Sun
const IconSun = ({ size = 15, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
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

// Luna — analoga a lucide-react Moon
const IconMoon = ({ size = 15, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Logout / freccia uscita — analoga a lucide-react LogOut
const IconLogOut = ({ size = 13, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// Utente — analoga a lucide-react User
const IconUser = ({ size = 13, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Grafico a barre — analoga a lucide-react BarChart2
const IconBarChart2 = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

// Casa / Home — analoga a lucide-react Home
const IconHome = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// Info / cerchio i — analoga a lucide-react Info
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

// Mappa / pieghevole — analoga a lucide-react Map
const IconMap = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

// Chevron destro — analoga a lucide-react ChevronRight
const IconChevronRight = ({ size = 11, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// Hamburger (3 linee orizzontali) — analoga a lucide-react Menu
const IconMenu = ({ size = 15, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// X / chiudi — analoga a lucide-react X
const IconX = ({ size = 15, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Stile NavLink: cambia colore se la route è attiva
function navClass({ isActive }, dk) {
  return [
    "flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 px-2 py-1 rounded-lg",
    isActive
      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950"
      : dk
        ? "text-gray-400 hover:text-emerald-400 hover:bg-gray-800"
        : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50",
  ].join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  // Stato apertura menu mobile (dropdown)
  const [menuOpen, setMenuOpen] = useState(false);
  // Stato tema, regione attiva, toggle tema
  const theme       = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const region      = useAppStore((s) => s.region);

  // Stato autenticazione e utente
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user            = useAuthStore((s) => s.user);
  const logout          = useAuthStore((s) => s.logout);

  // Flag dark mode
  const dk = theme === "dark";

  // Effettua logout e redirige a /login
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    // Navbar sticky con sfondo traslucido (effetto blur)
    <nav className={`sticky top-0 z-40 border-b transition-colors duration-300
      ${dk
        ? "bg-gray-900/95 border-gray-800 backdrop-blur-sm"
        : "bg-white/95 border-gray-100 backdrop-blur-sm shadow-sm"}`}>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg
            bg-gradient-to-br from-emerald-500 to-green-400">
            <IconLeaf size={14} className="text-white" />
          </div>
          <span className={`font-extrabold text-sm hidden sm:block
            ${dk ? "text-emerald-400" : "text-emerald-600"}`}>
            GreenPulse
          </span>
        </NavLink>

        {/* ── Link navigazione (visibili da sm in su) ── */}
        <div className="hidden sm:flex items-center gap-1">
          <NavLink to="/"          className={(p) => navClass(p, dk)}>
            <IconHome    size={14} />Home
          </NavLink>
          <NavLink to="/dashboard" className={(p) => navClass(p, dk)}>
            <IconBarChart2 size={14} />Dashboard
          </NavLink>
          {/* Regioni → naviga alla regione corrente selezionata */}
          {isAuthenticated && (
            <NavLink to={`/regioni/${region}`} className={(p) => navClass(p, dk)}>
              <IconMap size={14} />Regioni
            </NavLink>
          )}
          <NavLink to="/about"     className={(p) => navClass(p, dk)}>
            <IconInfo size={14} />About
          </NavLink>
        </div>

        {/* ── Hamburger button (solo mobile) ── */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className={`sm:hidden flex items-center justify-center w-8 h-8 rounded-lg
            border transition-colors
            ${dk ? "border-gray-700 bg-gray-800 text-gray-300" : "border-gray-200 bg-gray-50 text-gray-600"}`}
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}>
          {menuOpen ? <IconX size={15} /> : <IconMenu size={15} />}
        </button>

        {/* ── Destra: regione attiva + user + theme + logout ── */}
        <div className="flex items-center gap-2 ml-auto">

          {/* Regione attiva — solo se autenticato e su desktop */}
          {isAuthenticated && (
            <button
              onClick={() => navigate(`/regioni/${region}`)}
              className={`hidden md:flex items-center gap-1 text-xs px-2.5 py-1.5
                rounded-lg border transition-colors duration-200
                ${dk
                  ? "border-emerald-800 bg-emerald-950 text-emerald-400 hover:bg-emerald-900"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}>
              <IconMap size={11} />
              {region}
              <IconChevronRight size={11} className="opacity-60" />
            </button>
          )}

          {/* Nome utente — desktop */}
          {isAuthenticated && user && (
            <div className={`hidden md:flex items-center gap-1.5 text-xs
              ${dk ? "text-gray-400" : "text-gray-500"}`}>
              <IconUser size={13} />
              <span className="max-w-24 truncate">{user.name}</span>
            </div>
          )}

          {/* Toggle tema (sole/luna) */}
          <button
            onClick={toggleTheme}
            title={dk ? "Tema chiaro" : "Tema scuro"}
            className={`flex items-center justify-center w-8 h-8 rounded-lg
              border transition-all duration-200 hover:scale-110
              ${dk
                ? "border-gray-700 bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
            {dk ? <IconSun size={15} /> : <IconMoon size={15} />}
          </button>

          {/* Logout — solo se autenticato */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              title="Esci"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                border transition-all duration-200 hover:scale-105
                ${dk
                  ? "border-red-900 bg-red-950/50 text-red-400 hover:bg-red-900/50"
                  : "border-red-100 bg-red-50 text-red-600 hover:bg-red-100"}`}>
              <IconLogOut size={13} />
              <span className="hidden sm:block">Esci</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Menu mobile dropdown ── */}
      {menuOpen && (
        <div className={`sm:hidden border-t px-4 py-3 space-y-1
          ${dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}
            className={(p) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${p.isActive ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950" : dk ? "text-gray-400" : "text-gray-600"}`}>
            <IconHome size={14} />Home
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}
            className={(p) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${p.isActive ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950" : dk ? "text-gray-400" : "text-gray-600"}`}>
            <IconBarChart2 size={14} />Dashboard
          </NavLink>
          {isAuthenticated && (
            <NavLink to={`/regioni/${region}`} onClick={() => setMenuOpen(false)}
              className={(p) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${p.isActive ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950" : dk ? "text-gray-400" : "text-gray-600"}`}>
              <IconMap size={14} />Regioni
            </NavLink>
          )}
          <NavLink to="/about" onClick={() => setMenuOpen(false)}
            className={(p) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${p.isActive ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950" : dk ? "text-gray-400" : "text-gray-600"}`}>
            <IconInfo size={14} />About
          </NavLink>
        </div>
      )}
    </nav>
  );
}
