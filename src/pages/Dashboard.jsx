// src/pages/Dashboard.jsx
//
// Questa è la pagina principale. Ha tre responsabilità:
//  1. Chiama useEnergyData() con le coordinate della città selezionata
//  2. Distribuisce i dati reali a tutti i componenti figli
//  3. Gestisce gli stati loading / error a livello pagina

import { useEffect } from "react";
import { ACTION, useDashboard } from "../context/DashboardContext";
import useEnergyData from "../hooks/useEnergyData";

import { energySources } from "../data/energySources";

import CitySelector from "../components/CitySelector";
import EnergyCard from "../components/EnergyCard";
import EnergyList from "../components/EnergyList";
import CO2Indicator from "../components/CO2Indicator";
import SolarWidget from "../components/SolarWidget";
import SolarBarChart from "../components/charts/SolarBarChart";
import CO2LineChart from "../components/charts/CO2LineChart";
import EnergyAreaChart from "../components/charts/EnergyAreaChart";

export default function Dashboard() {
  const { state, dispatch } = useDashboard();

  // ── Fetch dati reali per la città selezionata ───────────────────────────
  //
  // Ogni volta che state.selectedCity cambia → useEnergyData rilancia il fetch.
  // Se selectedCity è null (non dovrebbe mai succedere con DEFAULT_CITY) usiamo null.

  const lat = state.selectedCity?.lat ?? null;
  const lng = state.selectedCity?.lng ?? null;

  const { data, loading, error } = useEnergyData(lat, lng);

  // Aggiorna il titolo della pagina quando cambia la città
  useEffect(() => {
    const city = state.selectedCity?.name ?? state.region;
    document.title = `GreenPulse — ${city}`;
  }, [state.selectedCity, state.region]);

  // ── Filtro fonti energetiche ────────────────────────────────────────────
  const filteredSources =
    state.filter === "all"
      ? energySources
      : energySources.filter((s) => s.type === state.filter);

  // ── Dati derivati dall'API (con fallback null se ancora caricando) ──────
  const current = data?.current ?? null;
  const hourly = data?.hourly ?? null;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5 pb-8">
      {/* HEADER: titolo + selettori */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h2 className="text-center text-lg font-bold text-cyan-500 dark:text-cyan-400 mb-4">
          Dashboard Energetica — {state.selectedCity?.name ?? state.region}
        </h2>

        {/* CitySelector: 5 pulsanti città */}
        <CitySelector />
      </div>

      {/* BANNER LOADING */}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400 text-sm">
          <span className="inline-block h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          Caricamento dati per {state.selectedCity?.name}...
        </div>
      )}

      {/* BANNER ERRORE */}
      {error && !loading && (
        <div className="py-4 px-5 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 text-sm">
          <strong>Errore API:</strong> {error}
          <br />
          <span className="text-xs opacity-70">
            Riprova tra qualche secondo o controlla la connessione.
          </span>
        </div>
      )}

      {/* PULSANTI FILTRO FONTI */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { value: "all", label: "Tutte", color: "cyan" },
          { value: "renewable", label: "Rinnovabili", color: "green" },
          { value: "fossil", label: "Fossili", color: "red" },
        ].map(({ value, label, color }) => (
          <button
            key={value}
            onClick={() =>
              dispatch({ type: ACTION.SET_FILTER, payload: value })
            }
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
              state.filter === value
                ? `bg-${color}-500 text-white `
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ENERGY CARDS — dati reali dall'API */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card Solare */}
        <EnergyCard title="Solare" icon="☀️" unit="W/m²">
          {loading ? (
            <Skeleton />
          ) : current ? (
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">
                {current.solarNow}
              </p>
              <p className="text-xs text-gray-400 mt-1">W/m² irraggiamento</p>
              <ProgressBar pct={current.solarPct} color="amber" />
              <p className="text-xs text-gray-400">
                {current.solarPct}% del potenziale
              </p>
              {!current.isDay && (
                <p className="text-xs text-blue-400 mt-1">
                  🌙 Notte — pannelli inattivi
                </p>
              )}
            </div>
          ) : null}
        </EnergyCard>

        {/* Card Vento */}
        <EnergyCard title="Vento" icon="💨" unit="km/h">
          {loading ? (
            <Skeleton />
          ) : current ? (
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-500">
                {current.windNow}
              </p>
              <p className="text-xs text-gray-400 mt-1">km/h velocità</p>
              <ProgressBar pct={current.windPct} color="blue" />
              <p className="text-xs text-gray-400">
                {current.windPct}% del potenziale eolico
              </p>
            </div>
          ) : null}
        </EnergyCard>

        {/* Card Rinnovabili */}
        <EnergyCard title="Quota Verde" icon="🌱" unit="% mix">
          {loading ? (
            <Skeleton />
          ) : current ? (
            <div className="text-center">
              <p
                className={`text-3xl font-bold ${
                  current.renewablePct >= 60
                    ? "text-emerald-500"
                    : current.renewablePct >= 30
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {current.renewablePct}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                energia da fonti rinnovabili
              </p>
              <ProgressBar pct={current.renewablePct} color="emerald" />
              <p className="text-xs text-gray-400 mt-1">
                🌡️ {current.tempNow}°C &nbsp;|&nbsp; ☁️ {current.cloudNow}%
              </p>
            </div>
          ) : null}
        </EnergyCard>
      </div>

      {/* CO2 INDICATOR — usa il dato calcolato dall'API */}
      {current && !loading && <CO2Indicator value={current.co2Now} />}

      {/* SOLAR WIDGET — non fa più fetch da solo, riceve i dati da Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <SolarWidget
          currentData={current}
          cityName={state.selectedCity?.name}
          loading={loading}
        />
      </div>

      {/* LISTA FONTI ENERGETICHE */}
      <EnergyList sources={filteredSources} />

      {/* GRAFICI — ricevono i dati orari reali */}
      <section>
        <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4 px-1">
          📊 Andamenti di oggi — {state.selectedCity?.name}
        </h3>

        {/* 
          Griglia grafici responsive:
          - Mobile:  1 per riga
          - Desktop: 2 per riga (EnergyAreaChart a piena larghezza come terzo)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
              ☀️ Irraggiamento solare (W/m²) — ore del giorno
            </h4>
            <SolarBarChart hourlyData={hourly} loading={loading} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
              🏭 Intensità CO₂ stimata (g/kWh)
            </h4>
            <CO2LineChart hourlyData={hourly} loading={loading} />
          </div>

          {/* Terzo grafico a piena larghezza su desktop */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm md:col-span-2">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
              💨 Velocità vento nelle 24 ore (km/h)
            </h4>
            <EnergyAreaChart hourlyData={hourly} loading={loading} />
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Componenti di supporto inline ───────────────────────────────────────────

// Skeleton: placeholder animato durante il caricamento
function Skeleton() {
  return (
    <div className="space-y-2 w-full animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-lg mx-auto w-24" />
      <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded mx-auto w-32" />
      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full" />
    </div>
  );
}

// ProgressBar: barra di avanzamento colorata
function ProgressBar({ pct, color }) {
  const colorMap = {
    amber: "bg-amber-400",
    blue: "bg-blue-400",
    emerald: "bg-emerald-500",
    red: "bg-red-400",
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 my-2">
      <div
        className={`h-1.5 rounded-full transition-all duration-500 ${colorMap[color] ?? "bg-gray-400"}`}
        style={{ width: `${Math.max(2, pct)}%` }}
      />
    </div>
  );
}
