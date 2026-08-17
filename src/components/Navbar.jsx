// src/components/Navbar.jsx
//
// Navbar responsive mobile-first.
// Su mobile: logo a sinistra, 3 link compatti a destra (testo breve).
// Su desktop: stesso layout ma con più spazio e font più grande.
// Il link attivo ha bordo inferiore verde (via NavLink isActive).

import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  isActive
    ? "font-bold text-sky-500 border-b-2 border-emerald-500 pb-0.5 text-xs sm:text-sm"
    : "text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors text-xs sm:text-sm";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 sm:px-6 py-3 mb-4 bg-white dark:bg-gray-900 shadow-sm rounded-xl">

      {/* Logo */}
      <span className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-100">
        🌱 GreenPulse
      </span>

      {/* Link di navigazione */}
      <div className="flex items-center gap-3 sm:gap-5">
        <NavLink to="/"          className={linkClass}>Home</NavLink>
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/about"     className={linkClass}>About</NavLink>
      </div>
    </nav>
  );
}
