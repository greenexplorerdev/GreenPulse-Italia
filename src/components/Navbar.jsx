import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppStore }  from "../store/useAppStore";
import { useAuthStore } from "../store/useAuthStore";
import {
  IconLeaf, IconSun, IconMoon, IconLogOut, IconUser,
  IconBarChart2, IconHome, IconInfo, IconMap, IconChevronRight,
  IconMenu, IconX,
} from "./icons";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const theme       = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const region      = useAppStore((s) => s.region);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user            = useAuthStore((s) => s.user);
  const logout          = useAuthStore((s) => s.logout);

  const dk = theme === "dark";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className={`sticky top-0 z-40 border-b transition-colors duration-300
      ${dk
        ? "bg-gray-900/95 border-gray-800 backdrop-blur-sm"
        : "bg-white/95 border-gray-100 backdrop-blur-sm shadow-sm"}`}>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg
            bg-linear-to-br from-emerald-500 to-green-400">
            <IconLeaf size={14} className="text-white" />
          </div>
          <span className={`font-extrabold text-sm hidden sm:block
            ${dk ? "text-emerald-400" : "text-emerald-600"}`}>
            GreenPulse
          </span>
        </NavLink>

        <div className="hidden sm:flex items-center gap-1">
          <NavLink to="/"          className={(p) => navClass(p, dk)}>
            <IconHome    size={14} />Home
          </NavLink>
          <NavLink to="/dashboard" className={(p) => navClass(p, dk)}>
            <IconBarChart2 size={14} />Dashboard
          </NavLink>
          {isAuthenticated && (
            <NavLink to={`/regioni/${region}`} className={(p) => navClass(p, dk)}>
              <IconMap size={14} />Regioni
            </NavLink>
          )}
          <NavLink to="/about"     className={(p) => navClass(p, dk)}>
            <IconInfo size={14} />About
          </NavLink>
        </div>

        <button
          onClick={() => setMenuOpen(o => !o)}
          className={`sm:hidden flex items-center justify-center w-8 h-8 rounded-lg
            border transition-colors
            ${dk ? "border-gray-700 bg-gray-800 text-gray-300" : "border-gray-200 bg-gray-50 text-gray-600"}`}
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}>
          {menuOpen ? <IconX size={15} /> : <IconMenu size={15} />}
        </button>

        <div className="flex items-center gap-2 ml-auto">

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

          {isAuthenticated && user && (
            <div className={`hidden md:flex items-center gap-1.5 text-xs
              ${dk ? "text-gray-400" : "text-gray-500"}`}>
              <IconUser size={13} />
              <span className="max-w-24 truncate">{user.name}</span>
            </div>
          )}

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
