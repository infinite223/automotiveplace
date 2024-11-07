import { useState, useEffect, useRef } from "react";

function useFetchData<T>(fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchedOnce = useRef(false); // Zmienna, która zapobiega wielokrotnemu wywołaniu

  useEffect(() => {
    // Sprawdzamy, czy funkcja już się wykonała
    if (fetchedOnce.current) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFunction();
        setData(result);
        fetchedOnce.current = true; // Ustawiamy, że dane zostały pobrane
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]); // Dobrą praktyką jest tutaj podać fetchFunction w zależnościach

  return { data, loading, error };
}

export default useFetchData;
