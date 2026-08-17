// src/hooks/useEnergyData.js
//
// Custom hook che:
//  1. Chiama getEnergyData() ogni volta che cambiano lat o lng
//  2. Gestisce loading, error, data
//  3. Cancella il fetch precedente con AbortController se la città cambia
//     prima che la risposta arrivi (evita race condition)
//
// Uso in Dashboard:
//   const { data, loading, error } = useEnergyData(lat, lng)

import { useState, useEffect, useCallback } from "react";
import { getEnergyData } from "../services/energyApi";

export default function useEnergyData(latitude, longitude) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback memoizza la funzione fetch — cambia solo quando cambiano le coordinate
  const fetchFn = useCallback(
    (signal) => getEnergyData(latitude, longitude)(signal),
    [latitude, longitude],
  );

  useEffect(() => {
    // Se non abbiamo coordinate valide, non fare nulla
    if (latitude == null || longitude == null) return;

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFn(controller.signal);

        // Aggiorna i dati solo se il fetch non è stato cancellato
        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        // AbortError è normale (cambio città rapido) — non è un errore da mostrare
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();

    // Cleanup: cancella il fetch se l'utente cambia città prima della risposta
    return () => controller.abort();
  }, [fetchFn]); // si riparte ogni volta che fetchFn cambia (= coordinate cambiate)

  return { data, loading, error };
}
