// src/data/cities.js
//
// Le 5 città di GreenPulse Italia.
// Ogni città ha:
//   - name: nome visualizzato nell'UI
//   - lat/lng: coordinate usate per chiamare Open-Meteo
//   - region: regione italiana (aggiorna il DashboardContext quando si seleziona la città)
//   - emoji: icona mostrata nel pulsante CitySelector

export const CITIES = [
  {
    id: "milano",
    name: "Milano",
    emoji: "🏙️",
    lat: 45.4654,
    lng: 9.1859,
    region: "Lombardia",
  },
  {
    id: "torino",
    name: "Torino",
    emoji: "🏛️",
    lat: 45.0703,
    lng: 7.6869,
    region: "Piemonte",
  },
  {
    id: "bologna",
    name: "Bologna",
    emoji: "🍝",
    lat: 44.4949,
    lng: 11.3426,
    region: "Emilia-Romagna",
  },
  {
    id: "venezia",
    name: "Venezia",
    emoji: "🌊",
    lat: 45.4408,
    lng: 12.3155,
    region: "Veneto",
  },
  {
    id: "firenze",
    name: "Firenze",
    emoji: "🌸",
    lat: 43.7696,
    lng: 11.2558,
    region: "Toscana",
  },
];

// Città di default al primo caricamento
export const DEFAULT_CITY = CITIES[0]; // Milano

