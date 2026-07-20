import SolarWidget from "./components/SolarWidget";
import EnergyIndicators from "./components/EnergyIndicators";
import "./index.css";

function App() {
  return (
    <div className="bg-sky-700">
      <h1
        className="text-center font-extrabold text-3xl text-emerald-500"
        aria-label="GreenPulse Italia - Energetic Dashboard"
      >
        GreenPulse Italia
      </h1>

      <SolarWidget></SolarWidget>
      <EnergyIndicators value={700}></EnergyIndicators>
    </div>
  );
}

export default App;
