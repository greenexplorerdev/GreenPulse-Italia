import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { DEFAULT_CITY } from "../data/cities";
import { ACTION } from "./ActionTypes";

const initialState = {
  region: DEFAULT_CITY.region, // "Lombardia"
  filter: "all", // "all" | "renewable" | "fossil"
  selectedCity: DEFAULT_CITY, // { name, lat, lng, region, emoji, id }
};



function dashboardReducer(state, action) {
  switch (action.type) {
    case ACTION.SET_REGION:
      // Aggiorna solo la regione (dal RegionSelector dropdown)
      return { ...state, region: action.payload, selectedCity: null };

    case ACTION.SET_FILTER:
      return { ...state, filter: action.payload };

    case ACTION.SET_CITY:
      // Selezionare una città aggiorna ANCHE la regione automaticamente
      // Così non serve fare due dispatch separati
      return {
        ...state,
        selectedCity: action.payload,
        region: action.payload.region,
      };

    case ACTION.RESET:
      return initialState;

    default:
      return state;
  }
}

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
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
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Guard
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboard deve essere usato dentro un DashboardProvider",
    );
  }
  return context;
}
