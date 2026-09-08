async function fetchEnergyData(latitude, longitude, signal) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set(
    "current",
    "shortwave_radiation,wind_speed_10m,temperature_2m,cloudcover,is_day,precipitation"
  );
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

function deriveMetrics(raw) {
  const c = raw.current;
  const h = raw.hourly;

  const solarNow = Math.round(c.shortwave_radiation);
  const windNow  = Math.round(c.wind_speed_10m * 10) / 10;
  const tempNow  = Math.round(c.temperature_2m * 10) / 10;
  const cloudNow = Math.round(c.cloudcover);
  const isDay    = c.is_day === 1;
  const rain     = c.precipitation;

  const solarPct  = Math.min(100, Math.round((solarNow / 800) * 100));
  const windPct   = Math.min(100, Math.round((windNow / 50) * 100));
  const renewablePct = Math.round(solarPct * 0.6 + windPct * 0.4);
  const co2Now = Math.round(450 - renewablePct * 2.7);

  const times = h.time.map((t) => t.slice(11, 16));
  const solarHourly = h.shortwave_radiation.map((v) => Math.round(v));
  const windHourly = h.wind_speed_10m.map((v) => Math.round(v * 10) / 10);
  const tempHourly = h.temperature_2m.map((v) => Math.round(v * 10) / 10);
  const co2Hourly = h.shortwave_radiation.map((solar) => {
    const sPct = Math.min(100, (solar / 800) * 100);
    return Math.round(450 - sPct * 2.0 - windPct * 0.7);
  });

  return {
    current: {
      solarNow, windNow, tempNow, cloudNow, isDay, rain,
      co2Now, solarPct, windPct, renewablePct,
    },
    hourly: {
      times, solarHourly, windHourly, tempHourly, co2Hourly,
    },
  };
}

export function getEnergyData(latitude, longitude) {
  return async function (signal) {
    const raw = await fetchEnergyData(latitude, longitude, signal);
    return deriveMetrics(raw);
  };
}
