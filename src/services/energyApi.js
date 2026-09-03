// src/services/energyApi.js
//
// Questo file contiene:
//  1. fetchEnergyData(lat, lng, signal) — chiama Open-Meteo e ritorna i dati grezzi
//  2. deriveMetrics(rawData) — calcola metriche energetiche dai dati grezzi
//  3. getEnergyData(lat, lng, signal) — funzione principale che combina i due passi

// ─── 1. Fetch dati grezzi da Open-Meteo ────────────────────────────────────

async function fetchEnergyData(latitude, longitude, signal) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  // Parametri della richiesta
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);

  // "current" → valori REALI dell'ora corrente (aggiornati ogni ora)
  url.searchParams.set(
    "current",
    "shortwave_radiation,wind_speed_10m,temperature_2m,cloudcover,is_day,precipitation"
  );

  // "hourly" → 24 valori per oggi (usati nei grafici)
  url.searchParams.set(
    "hourly",
    "shortwave_radiation,wind_speed_10m,temperature_2m"
  );

  url.searchParams.set("timezone", "Europe/Rome");
  url.searchParams.set("forecast_days", "1");

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Errore API Open-Meteo ${response.status}: ${errorText.substring(0, 100)}`
    );
  }

  return response.json();
}

// ─── 2. Calcolo metriche derivate ──────────────────────────────────────────

function deriveMetrics(raw) {
  const c = raw.current;   // dati ora corrente
  const h = raw.hourly;    // dati 24 ore

  // ── Valori correnti (mostrati nelle EnergyCard) ──────────────────────────

  const solarNow = Math.round(c.shortwave_radiation);  // W/m²
  const windNow  = Math.round(c.wind_speed_10m * 10) / 10; // km/h, 1 decimale
  const tempNow  = Math.round(c.temperature_2m * 10) / 10; // °C, 1 decimale
  const cloudNow = Math.round(c.cloudcover);           // %
  const isDay    = c.is_day === 1;
  const rain     = c.precipitation;                    // mm

  // ── Potenziali rinnovabili (0-100%) ─────────────────────────────────────
  //
  // Soglia solare: 800 W/m² è considerato "ottimo" per i pannelli fotovoltaici.
  // Soglia eolica: 50 km/h è la velocità buona per turbine di piccola/media taglia.
  // Usiamo Math.min(100, ...) per non superare il 100%.

  const solarPct  = Math.min(100, Math.round((solarNow / 800) * 100));
  const windPct   = Math.min(100, Math.round((windNow / 50) * 100));

  // Quota rinnovabile complessiva: 60% peso solare, 40% peso vento
  const renewablePct = Math.round(solarPct * 0.6 + windPct * 0.4);

  // ── CO₂ stimata (g/kWh) ─────────────────────────────────────────────────
  //
  // Logica: quando sole e vento producono tanto, la rete elettrica usa meno
  // gas e carbone → CO₂ più bassa.
  // Range realistico per l'Italia: ~180 (ottimo) → ~450 (pessimo, solo fossili).
  //
  // Formula: partiamo da 450 (baseline fossile) e sottraiamo in base
  // alla quota rinnovabile (max -270, quando renewablePct = 100).

  const co2Now = Math.round(450 - renewablePct * 2.7);

  // ── Dati orari per i grafici ─────────────────────────────────────────────

  // Le ore in formato "HH:00" (es. "09:00")
  const times = h.time.map((t) => t.slice(11, 16));

  // Dati solare orari — la curva "a campana" del sole durante il giorno
  const solarHourly = h.shortwave_radiation.map((v) => Math.round(v));

  // Dati vento orari
  const windHourly = h.wind_speed_10m.map((v) => Math.round(v * 10) / 10);

  // Temperatura oraria
  const tempHourly = h.temperature_2m.map((v) => Math.round(v * 10) / 10);

  // CO₂ simulata su 24 ore: varia inversamente al solare
  // (di notte = più fossili = più CO₂; a mezzogiorno = più solare = meno CO₂)
  const co2Hourly = h.shortwave_radiation.map((solar) => {
    const sPct = Math.min(100, (solar / 800) * 100);
    return Math.round(450 - sPct * 2.0 - windPct * 0.7);
  });

  return {
    // Valori correnti (per le card e SolarWidget)
    current: {
      solarNow,
      windNow,
      tempNow,
      cloudNow,
      isDay,
      rain,
      co2Now,
      solarPct,
      windPct,
      renewablePct,
    },
    // Dati orari (per i grafici)
    hourly: {
      times,
      solarHourly,
      windHourly,
      tempHourly,
      co2Hourly,
    },
  };
}

// ─── 3. Funzione principale esportata ──────────────────────────────────────
//
// Uso: const fn = getEnergyData(lat, lng)
//      const result = await fn(abortController.signal)
//
// Ritorna: { current: {...}, hourly: {...} }

export function getEnergyData(latitude, longitude) {
  return async function (signal) {
    const raw = await fetchEnergyData(latitude, longitude, signal);
    return deriveMetrics(raw);
  };
}
