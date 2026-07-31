import "./index.css";
import { useTheme } from "./context/ThemeContext";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import RegionDetail from "./pages/RegionDetail";
import NotFound from "./pages/NotFound";

function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === "dark" ? "light" : "dark",
    );
    document.documentElement.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  return (
    <div
      className={
        "min-h-screen bg-linear-to-b from-sky-50 to-sky-100 p-4 dark:from-sky-700 dark:to-sky-900"
      }
    >
      <div className="max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route
              path="/dashboard/:regionId"
              element={<RegionDetail />}
            ></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 p-2 bg-cyan-500 rounded-full hover:bg-cyan-800 transition-colors"
        aria-label="Toggle tema scuro/chiaro"
      >
        {theme === "dark" ? "☀️ " : "🌙"}
      </button>
    </div>
  );
}

export default App;
