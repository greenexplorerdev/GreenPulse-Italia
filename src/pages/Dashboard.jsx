import EnergyCard from "../components/EnergyCard";
import EnergyIndicator from "../components/EnergyIndicator";
import { energySources } from "../data/energySources"; // Named export import corretto
import EnergyList from "../components/EnergyList";
import CO2Indicator from "../components/CO2Indicator";
import { useEffect, useMemo } from "react";
import RegionSelector from "../components/RegionSelector";
import SolarWidget from "../components/SolarWidget";
import CityAutoComplete from "../components/CityAutoComplete";
import { useDashboard, ACTION } from "../context/DashboardContext";
import SolarBarChart from "../components/charts/SolarBarChart";
import CO2LineChart from "../components/charts/CO2LineChart";
import EnergyAreaChart from "../components/charts/EnergyAreaChart";
import { italianCities } from "../data/italianCities";

function getCityCoords(cityName) {
  const city = italianCities.find((c) => c.name === cityName);
  return city
    ? { latitude: city.lat, longitude: city.lng }
    : { latitude: 45.4642, longitude: 9.19 }; // default Milano
}

export default function Dashboard() {
  const { state, dispatch } = useDashboard();

  const { latitude, longitude } = useMemo(
    () => getCityCoords(state.selectedCity),
    [state.selectedCity],
  );

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
    <div className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl">
      <h2 className="text-center font-bold text-xl text-cyan-400">
        Dashboard Energetica - {state.region}
      </h2>

      <div className="flex justify-center">
        <RegionSelector />
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4 mb-4">
        <button
          onClick={() => dispatch({ type: ACTION.SET_FILTER, payload: "all" })}
          className={`px-3 py-1.5 text-xs md:text-sm rounded transition-colors duration-200 ${
            state.filter === "all"
              ? "bg-cyan-400 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Tutte
        </button>
        <button
          onClick={() =>
            dispatch({ type: ACTION.SET_FILTER, payload: "renewable" })
          }
          className={`px-3 py-1.5 text-xs md:text-sm rounded transition-colors duration-200 ${
            state.filter === "renewable"
              ? "bg-green-400 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Rinnovabili
        </button>
        <button
          onClick={() =>
            dispatch({ type: ACTION.SET_FILTER, payload: "fossil" })
          }
          className={`px-3 py-1.5 text-xs md:text-sm rounded transition-colors duration-200 ${
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

        {state.selectedCity !== null && (
          <p className="p-2 rounded-3xl font-bold text-green-600">
            Dati per: {state.selectedCity}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <section className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-6">
          Andamenti energetici
        </h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Irraggiamento solare (W/m²)
            </h4>
            <SolarBarChart />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Intensità CO₂ (g/kWh)
            </h4>
            <CO2LineChart />
          </div>

          <div className="bg-white dark:bg-gray-800 md:col-span-2 rounded-lg p-4 shadow">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Produzione solare settimanale (kWh)
            </h4>
            <EnergyAreaChart />
          </div>
        </div>
      </section>

      <div className="mt-6">
        <SolarWidget latitude={latitude} longitude={longitude} />
      </div>

      {state.selectedCity && (
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Impianti per {state.selectedCity}
          </h3>
          <p className="text-gray-600">
            (Qui potrebbero essere mostrati dati specifici sugli impianti
            rinnovabili presenti nella città selezionata.)
          </p>
        </div>
      )}
    </div>
  );
}
