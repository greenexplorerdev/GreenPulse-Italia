import Dashboard from "./pages/Dashboard";
import "./index.css";
import { useState } from "react";

function App() {
  const [region,setRegion] = useState("Lombardia")
  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 to-sky-100 p-4">
      <h1
        className="text-center font-extrabold text-3xl text-emerald-600 mb-6"
        aria-label="GreenPulse Italia - Dashboard Energetica"
      >
        GreenPulse Italia
      </h1>
      <div className="max-w-4xl mx-auto">
        <Dashboard region= {region} onRegionChange= {setRegion} />
      </div>
    </div>
  );
}

export default App;
