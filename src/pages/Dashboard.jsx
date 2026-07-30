import EnergyCard from "../components/EnergyCard";
import EnergyIndicator from "../components/EnergyIndicator";
import { energySources } from "../data/energySources"; // Named export import corretto
import EnergyList from "../components/EnergyList";
import CO2Indicator from "../components/CO2Indicator";
import { useEffect } from "react";
import RegionSelector from "../components/RegionSelector";
import SolarWidget from "../components/SolarWidget";
import CityAutoComplete from "../components/CityAutoComplete";
import { useDashboard, ACTION } from "../context/DashboardContext";

export default function Dashboard() {
  const { state, dispatch } = useDashboard();

  useEffect(() => {
    document.title = `GreenPulse - ${state.region}`;
  }, [state.region]);

  const filteredSources =
    state.filter === "all"
      ? energySources
      : state.filter === "renewable"
        ? energySources.filter((source) => source.type === "renewable")
        : energySources.filter((source) => source.type === "fossil");

  return (
    <div className="space-y-6">
      <h2 className="text-center font-bold text-xl text-cyan-400">
        Dashboard Energetica - {state.region}
      </h2>

      <div className=" flex justify-center">
        <RegionSelector />
      </div>

      <div className="flex justify-center space-x-4 mt-4 mb-6">
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}
          className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
            state.filter === "all"
              ? "bg-cyan-400 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Tutte
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "renewable" })}
          className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
            state.filter === "renewable"
              ? "bg-green-400 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Rinnovabili
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "fossil" })}
          className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
            state.filter === "fossil"
              ? "bg-red-400 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Fossili
        </button>
      </div>

      <div>
        <CityAutoComplete />
        {/*DashboardContext.jsx — initialState ha selectedCity: null*/}
        {state.selectedCity !== null && (
          <p className="p-2 rounded-3xl font-bold text-green-600">
            Dati per: {state.selectedCity}
          </p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-6">
        <EnergyCard title="Solare" icon="☀️ " unit="W/m²">
          <EnergyIndicator value={320} />
        </EnergyCard>
        <EnergyCard title="Eolico" icon="💨" unit="km/h">
          Vento medio: 18 km/h
        </EnergyCard>
        <EnergyCard title="Idro" icon="💧" unit="m³/s">
          Portata: 142 m³/s
        </EnergyCard>
      </div>

      <div className="mt-8">
        <EnergyList sources={filteredSources} />
        <CO2Indicator value={210} />
      </div>

      <div>
        <SolarWidget></SolarWidget>
      </div>
    </div>
  );
}
