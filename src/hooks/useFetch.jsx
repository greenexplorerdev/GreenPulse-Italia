import { useState, useEffect } from "react";

export default function useFetch(fetchFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fetchFn) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        //qui viene passato signal a weatherapi
        const result = await fetchFn(controller.signal);

        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    
      fetchData();
    

    //cleanup e callback di useEffect
    return () => controller.abort();
  }, [fetchFn]);

  return { data, loading, error };
}
