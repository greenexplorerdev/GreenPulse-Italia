// src/store/useAppStore.js
//
// ── PERCHÉ ZUSTAND? ──────────────────────────────────────────────────────────
// In precedenza usavamo useContext + useReducer (DashboardContext + ThemeContext).
// Zustand è più semplice: niente Provider, niente dispatch, persistenza nativa.
//
// CONFRONTO:
//   Prima → const { state, dispatch } = useDashboard()
//           dispatch({ type: "SET_REGION", payload: "Toscana" })
//
//   Ora   → const setRegion = useAppStore(s => s.setRegion)
//           setRegion("Toscana")
//
// PERFORMANCE: solo i componenti che leggono un valore specifico si
// re-renderizzano quando quel valore cambia. Se leggi solo `region`,
// un cambio a `theme` non triggerà il tuo componente.
//
// PERSISTENZA: il middleware `persist` salva automaticamente in localStorage
// i campi elencati in `partialize`. Al reload, lo stato viene ripristinato.

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      // ── STATO ───────────────────────────────────────────────────────────────

      // Regione selezionata nel RegionSelector (dropdown navbar/dashboard)
      region: "Lombardia",

      // Città selezionata nel CitySelector (oggetto con { id, name, lat, lng, region })
      // null = nessuna città selezionata → si usano coordinate della regione
      selectedCity: null,

      // Filtro fonti energetiche: "all" | "renewable" | "fossil"
      filter: "all",

      // Tema UI: "light" | "dark"
      theme: "light",

      // ── AZIONI ──────────────────────────────────────────────────────────────

      // Aggiorna la regione — usato da RegionSelector e RegionPage
      setRegion: (region) => set({ region }),

      // Aggiorna la città selezionata — usato da CitySelector
      setCity: (city) => set({ selectedCity: city }),

      // Aggiorna il filtro fonti — usato dai pulsanti in Dashboard e RegionPage
      setFilter: (filter) => set({ filter }),

      // Toggle dark/light — usato dal pulsante in Navbar
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      // Reset dello stato filtri (usato nel SearchForm reset)
      // Non tocca theme perché è una preferenza personale
      reset: () =>
        set({
          region: "Lombardia",
          selectedCity: null,
          filter: "all",
        }),
    }),
    {
      name: "greenpulse-app-store", // chiave in localStorage

      // Salviamo tutto tranne filter (viene resettato a ogni sessione)
      partialize: (state) => ({
        region:       state.region,
        selectedCity: state.selectedCity,
        theme:        state.theme,
      }),
    }
  )
);
