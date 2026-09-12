import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      region: "Lombardia",
      selectedCity: null,
      filter: "all",
      theme: "light",

      setRegion: (region) => set({ region }),
      setCity: (city) => set({ selectedCity: city }),
      setFilter: (filter) => set({ filter }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      reset: () =>
        set({
          region: "Lombardia",
          selectedCity: null,
          filter: "all",
        }),
    }),
    {
      name: "greenpulse-app-store",
      partialize: (state) => ({
        region:       state.region,
        selectedCity: state.selectedCity,
        theme:        state.theme,
      }),
    }
  )
);
