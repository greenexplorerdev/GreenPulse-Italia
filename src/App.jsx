import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppStore }  from "./store/useAppStore";
import * as ternaData from "./services/ternaData";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout         from "./components/Layout";
import WelcomeModal   from "./components/WelcomeModal";

import HomePage    from "./pages/HomePage";
import Dashboard   from "./pages/Dashboard";
import RegionPage  from "./pages/RegionPage";
import AboutPage   from "./pages/AboutPage";
import LoginPage   from "./pages/LoginPage";
import NotFound    from "./pages/NotFound";

export default function App() {
  const theme       = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    ternaData.preloadAll().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-green-100
      dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">

      <WelcomeModal />

      <Routes>
        <Route path="/"      element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/regioni/:regionId" element={
            <ProtectedRoute><RegionPage /></ProtectedRoute>
          } />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <button
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Attiva tema chiaro" : "Attiva tema scuro"}
        className="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-full
          flex items-center justify-center shadow-lg text-base
          bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900
          hover:scale-110 transition-transform duration-200">
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
