import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  region: "Lombardia",
  filter: "all",
  selectedCity: null,
};

const DashboardContext = createContext(null);

export const ACTION = {
  SET_REGION: "SET_REGION",
  SET_FILTER: "SET_FILTER",
  SET_CITY: "SET_CITY",
  RESET: "RESET",
};

export function DashboardReducer(state, action) {
  switch (action.type) {
    case ACTION.SET_REGION:
      return { ...state, region: action.payload };
    case ACTION.SET_FILTER:
      return { ...state, filter: action.payload };
    case ACTION.SET_CITY:
      return { ...state, selectedCity: action.payload };
    case ACTION.RESET:
      return initialState;
    default:
      return state;
  }
}

export function DashboardProvider({ children }) {

  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  useEffect(()=>{
   const savedRegion= window.localStorage.getItem("greenpulse-region")
   if (savedRegion) {
    dispatch({
      type: ACTION.SET_REGION,
      payload: savedRegion
    })
    //return savedRegion ? JSON.parse(savedRegion) : "greenpulse-region"
   }
  },[])

  useEffect(()=>{
    window.localStorage.setItem("greenpulse-region",state.region)
  },[state.region])
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboard deve essere usato dentro un DashboardProvider",
    );
  }
  return context;
}
