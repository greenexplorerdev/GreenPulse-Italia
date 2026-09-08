import { useNavigate, Link } from "react-router-dom";
import { useAppStore }  from "../store/useAppStore";
import { useAuthStore } from "../store/useAuthStore";
import { IconLeaf, IconBarChart2, IconLogIn, IconArrowRight, IconZap } from "../components/icons";

export default function HomePage() {
  const navigate        = useNavigate();
  const theme           = useAppStore((s) => s.theme);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const dk              = theme === "dark";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center
      px-4 py-12 text-center
      ${dk ? "bg-gray-950" : "bg-linear-to-br from-emerald-50 to-green-100"}`}>

      <div className="flex items-center justify-center w-20 h-20 rounded-3xl mb-6
        bg-linear-to-br from-emerald-500 to-green-400
        shadow-xl shadow-emerald-200 dark:shadow-emerald-900/40">
        <IconLeaf size={40} className="text-white" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-black mb-3
        text-emerald-600 dark:text-emerald-400">
        GreenPulse Italia
      </h1>

      <p className={`text-base sm:text-lg max-w-md leading-relaxed mb-8
        ${dk ? "text-gray-400" : "text-gray-600"}`}>
        Dashboard energetica con dati in tempo reale su irraggiamento solare,
        vento, CO₂ e impianti rinnovabili per ogni regione italiana.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        {isAuthenticated ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm
              text-white bg-linear-to-r from-emerald-600 to-green-500
              hover:from-emerald-700 hover:to-green-600
              shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40
              hover:scale-105 transition-all duration-200">
            <IconBarChart2 size={16} />
            Vai alla Dashboard
            <IconArrowRight size={14} />
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm
                text-white bg-linear-to-r from-emerald-600 to-green-500
                hover:from-emerald-700 hover:to-green-600
                shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40
                hover:scale-105 transition-all duration-200">
              <IconLogIn size={16} />
              Accedi
            </button>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mt-2 mb-8">
        {[
          { icon: <IconZap size={18} className="text-amber-500" />, t: "Solare live", d: "Irraggiamento W/m²" },
          { icon: <IconBarChart2 size={18} className="text-emerald-500" />, t: "CO₂ stimata", d: "g/kWh per regione" },
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