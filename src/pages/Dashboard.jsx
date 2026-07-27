import EnergyCard from "../components/EnergyCard";
import EnergyIndicator from "../components/EnergyIndicator";
import { energySources } from "../data/energySources"; // Named export import corretto
import EnergyList from "../components/EnergyList";
import CO2Indicator from "../components/CO2Indicator";
import { useState, useEffect } from "react";
import RegionSelector from "../components/RegionSelector";
import SolarWidget from "../components/SolarWidget"

export default function Dashboard({ region, onRegionChange }) {
  const [filter, setFilter] = useState("all");

  useEffect(()=>{
    document.title = `GreenPulse - ${region}`
  },[region])
  
  const filteredSources =
    filter === "all"
      ? energySources
      : filter === "renewable"
        ? energySources.filter((source) => source.type === "renewable")
        : energySources.filter((source) => source.type === "fossil");

  return (
    <div className="space-y-6">
      <h2 className="text-center font-bold text-xl text-cyan-400">
        Dashboard Energetica - {region}
      </h2>

      <div className=" flex justify-center">
        <RegionSelector region={region} onRegionChange={onRegionChange}></RegionSelector>
      </div>

      <div className="flex justify-center space-x-4 mt-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
            filter === "all"
              ? "bg-cyan-400 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Tutte
        </button>
        <button
          onClick={() => setFilter("renewable")}
          className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
            filter === "renewable"
              ? "bg-green-400 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Rinnovabili
        </button>
        <button
          onClick={() => setFilter("fossil")}
          className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
            filter === "fossil"
              ? "bg-red-400 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Fossili
        </button>
      </div>

      <div className="grid grid-flow-col">
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
