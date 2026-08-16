import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 md:px-6 mb-4 py-3 bg-white dark:bg-gray-900 shadow-sm rounded-xl">
      <h3 className="font-bold text-base dark:text-gray-100">🌱 GreenPulse</h3>
      <div className="flex gap-3 md:gap-5 text-sm md:text-base">
        <NavLink
          to={"/"}
          aria-label="Home"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-emerald-500 border-b-2 border-emerald-500 pb-1"
              : "text-gray-600 hover:text-emerald-400 transition-colors"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/dashboard"}
          aria-label="Dashboard"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-emerald-500 border-b-2 border-emerald-500 pb-1"
              : "text-gray-600 hover:text-emerald-400 transition-colors"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to={"/about"}
          aria-label="About"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-emerald-500 border-b-2 border-emerald-500 pb-1"
              : "text-gray-600 hover:text-emerald-400 transition-colors"
          }
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}
