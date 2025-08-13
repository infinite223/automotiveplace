import { useQuery } from "@tanstack/react-query";

export function useFetchData<T>(key: string, fetchFunction: () => Promise<T>) {
  const { data, isLoading, error } = useQuery<T>({
    queryKey: [key],
    queryFn: fetchFunction,
    staleTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
  });

  return { data, loading: isLoading, error: error as Error | null };
}
