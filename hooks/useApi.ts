import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useApi = (api: string) => {
  const { data, isLoading, mutate, error } = useSWR(api, fetcher);
  return {
    data,
    isLoading,
    mutate,
    error,
  };
};

export default useApi;
