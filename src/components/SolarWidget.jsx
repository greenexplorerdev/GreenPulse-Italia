// src/components/SolarWidget.jsx
//
// CAMBIAMENTO IMPORTANTE rispetto alla versione precedente:
// SolarWidget NON fa più fetch da solo.
// Riceve i dati già pronti come prop "currentData" da Dashboard.
// Questo evita fetch doppi e garantisce coerenza tra tutti i componenti.
//
// Props:
//   currentData : oggetto { solarNow, windNow, tempNow, cloudNow, isDay, co2Now, ... }
//                 oppure null se i dati non sono ancora arrivati
//   cityName    : stringa con il nome della città (per il titolo)
//   loading     : boolean — se true mostra il placeholder

export default function SolarWidget({ currentData, cityName, loading }) {

  // ── Stato loading ────────────────────────────────────────────────────────
  if (loading || !currentData) {
    return (
      <div className="animate-pulse space-y-2 py-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-48 mx-auto" />
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-64 mx-auto" />
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-56 mx-auto" />
      </div>
    );
  }

  const { solarNow, windNow, tempNow, cloudNow, isDay, co2Now, solarPct } = currentData;

  // Messaggi contestuali in base all'ora e alle condizioni
  const solarMessage = !isDay
    ? "🌙 È notte — i pannelli solari sono inattivi"
    : solarNow < 50
    ? "☁️ Nuvolosità elevata — produzione solare ridotta"
    : solarNow < 300
    ? "⛅ Produzione solare parziale"
    : "☀️ Ottima produzione solare in corso";

  return (
    <div>
      <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
        🌞 Dati solari in tempo reale — {cityName}
      </h3>

      {/* Griglia dati: 2 colonne su mobile, 4 su desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

        <DataItem
          label="Irraggiamento"
          value={`${solarNow} W/m²`}
          sub={`${solarPct}% del massimo`}
          color="text-amber-500"
        />

        <DataItem
          label="Vento"
          value={`${windNow} km/h`}
          sub="velocità attuale"
          color="text-blue-500"
        />

        <DataItem
          label="Temperatura"
          value={`${tempNow}°C`}
          sub={`Nuvolosità: ${cloudNow}%`}
          color="text-orange-400"
        />

        <DataItem
          label="CO₂ stimata"
          value={`${co2Now} g/kWh`}
          sub={co2Now < 250 ? "✅ Basse emissioni" : co2Now < 350 ? "⚠️ Moderate" : "🔴 Elevate"}
          color={co2Now < 250 ? "text-emerald-500" : co2Now < 350 ? "text-yellow-500" : "text-red-500"}
        />

      </div>

      {/* Messaggio contestuale */}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center italic">
        {solarMessage}
      </p>
    </div>
  );
}

// DataItem: componente inline per ogni dato
function DataItem({ label, value, sub, color }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
      <p className="text-xs text-gray-400 dark:text-gray-400 mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}
