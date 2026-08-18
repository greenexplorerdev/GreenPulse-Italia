

import "./index.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

import Dashboard   from "./pages/Dashboard";
import HomePage    from "./pages/HomePage";
import AboutPage   from "./pages/AboutPage";
import NotFound    from "./pages/NotFound";

import Layout        from "./components/Layout";
import WelcomeModal  from "./components/WelcomeModal";

function App() {
  const { theme, toggleTheme } = useTheme();

  
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
   
    <div className="min-h-screen bg-linear-to-b from-sky-50 to-sky-100 dark:from-gray-900 dark:to-gray-800 px-3 py-4 sm:px-6 sm:py-6">


      <WelcomeModal />

      <div className="max-w-4xl mx-auto">
        <Routes>
 
          <Route path="/"      element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

         
          <Route element={<Layout />}>
            <Route path="/dashboard"           element={<Dashboard />} />
         
          </Route>

          {/* 404 — sempre ultima */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Pulsante dark mode tooglata */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-15 z-40 p-3 mx-auto bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label={theme === "dark" ? "Attiva tema chiaro" : "Attiva tema scuro"}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default App;