import Dashboard from "./pages/Dashboard";
import "./index.css";
import { useTheme } from "./context/ThemeContext";
import { useEffect } from "react";

function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove(theme === "dark" ? "light" :
  "dark");
    document.documentElement.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  return (
    <div
      className={
        "min-h-screen bg-linear-to-b from-sky-50 to-sky-100 p-4 dark:bg-sky-900"
      }
    >
      <h1
        className="text-center font-extrabold text-3xl text-emerald-600 dark:text-emerald-50 mb-6"
        aria-label="GreenPulse Italia - Dashboard Energetica"
      >
        GreenPulse Italia
      </h1>
      <div className="max-w-4xl mx-auto">
        <Dashboard />
      </div>
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="Toggle tema scuro/chiaro"
      >
        {theme === "dark" ? "☀️ " : "🌙"}
      </button>
    </div>
  );
}

export default App;
