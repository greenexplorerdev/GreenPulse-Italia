// src/App.jsx
//
// Cambiamenti rispetto alla versione precedente:
//   - bg-gradient-to-b (corretto da bg-linear-to-b — era sbagliato da mesi)
//   - WelcomeModal aggiunto fuori dai Routes (visibile su tutte le pagine)
//   - dark mode applicata a document.documentElement (tag <html>)
//     così Tailwind "dark:" funziona su TUTTI i componenti dell'albero

import "./index.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

// Pagine
import Dashboard   from "./pages/Dashboard";
import HomePage    from "./pages/HomePage";
import AboutPage   from "./pages/AboutPage";
//import RegionDetail from "./pages/RegionDetail";
import NotFound    from "./pages/NotFound";

// Componenti strutturali
import Layout        from "./components/Layout";
import WelcomeModal  from "./components/WelcomeModal";

function App() {
  const { theme, toggleTheme } = useTheme();

  // Applica / rimuove la classe "dark" sul tag <html>
  // Questo è il modo corretto per Tailwind darkMode: 'class'
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    // bg-gradient-to-b ← corretto (era bg-linear-to-b — classe inesistente in Tailwind)
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 dark:from-gray-900 dark:to-gray-800 px-3 py-4 sm:px-6 sm:py-6">

      {/* WelcomeModal: si apre al primo accesso, poi sparisce */}
      <WelcomeModal />

      <div className="max-w-4xl mx-auto">
        <Routes>
          {/* Home e About senza Navbar */}
          <Route path="/"      element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Dashboard e RegionDetail con Navbar (tramite Layout) */}
          <Route element={<Layout />}>
            <Route path="/dashboard"           element={<Dashboard />} />
            {/* <Route path="/dashboard/:regionId" element={<RegionDetail />} /> */}
          </Route>

          {/* 404 — sempre ultima */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Pulsante dark mode — fisso in basso a destra */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 z-40 p-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label={theme === "dark" ? "Attiva tema chiaro" : "Attiva tema scuro"}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default App;