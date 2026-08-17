// src/context/DashboardContext.jsx
//
// Cambiamento rispetto alla versione precedente:
//   - selectedCity ora è un OGGETTO { name, lat, lng, region, emoji }
//     invece di una semplice stringa.
//   - Quando si fa dispatch SET_CITY, il context aggiorna ANCHE region
//     automaticamente (non serve un secondo dispatch).
//   - Rimossa la vecchia gestione delle coordinate separate.

import { createContext, useContext, useEffect, useReducer } from "react";
import { DEFAULT_CITY } from "../data/cities";

// ── Stato iniziale ──────────────────────────────────────────────────────────

const initialState = {
  region:       DEFAULT_CITY.region,  // "Lombardia"
  filter:       "all",                // "all" | "renewable" | "fossil"
  selectedCity: DEFAULT_CITY,         // { name, lat, lng, region, emoji, id }
};

// ── Action types ────────────────────────────────────────────────────────────

export const ACTION = {
  SET_REGION: "SET_REGION",
  SET_FILTER: "SET_FILTER",
  SET_CITY:   "SET_CITY",    // payload = oggetto città da cities.js
  RESET:      "RESET",
};

// ── Reducer ─────────────────────────────────────────────────────────────────

function dashboardReducer(state, action) {
  switch (action.type) {

    case ACTION.SET_REGION:
      // Aggiorna solo la regione (dal RegionSelector dropdown)
      return { ...state, region: action.payload };

    case ACTION.SET_FILTER:
      return { ...state, filter: action.payload };

    case ACTION.SET_CITY:
      // Selezionare una città aggiorna ANCHE la regione automaticamente
      // Così non serve fare due dispatch separati
      return {
        ...state,
        selectedCity: action.payload,
        region:       action.payload.region,
      };

    case ACTION.RESET:
      return initialState;

    default:
      return state;
  }
}

// ── Context + Provider ───────────────────────────────────────────────────────

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Leggi la regione salvata da localStorage al primo caricamento
  useEffect(() => {
    const saved = localStorage.getItem("greenpulse-region");
    if (saved) {
      dispatch({ type: ACTION.SET_REGION, payload: saved });
    }
  }, []);

  // Salva la regione in localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("greenpulse-region", state.region);
  }, [state.region]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

// ── Custom hook con guard ─────────────────────────────────────────────────────

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard deve essere usato dentro un DashboardProvider");
  }
  return context;
}
