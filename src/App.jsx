import SolarWidget from "./components/SolarWidget";
import EnergyIndicator from "./components/EnergyIndicator";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 to-sky-100 p-4">
      <h1
        className="text-center font-extrabold text-3xl text-emerald-600 mb-6"
        aria-label="GreenPulse Italia - Dashboard Energetica"
      >
        GreenPulse Italia
      </h1>
      <div className="max-w-4xl mx-auto">
        <Dashboard region="Lombardia" />
      </div>

      <div className="mt-8">
        <SolarWidget />
        <EnergyIndicator value={50} className="mt-4" />
      </div>
    </div>
  );
}

export default App;
