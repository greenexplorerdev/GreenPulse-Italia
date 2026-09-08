import { useState, useEffect } from "react";
import { getEnergyData } from "../services/energyApi";

export default function useEnergyData(latitude, longitude) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude == null || longitude == null) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getEnergyData(latitude, longitude)(controller.signal)
      .then(result => {
        if (!controller.signal.aborted) setData(result);
      })
      .catch(err => {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [latitude, longitude]);

  return { data, loading, error };
}
