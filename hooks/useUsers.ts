import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useUsers = () => {
  const { data, isLoading, mutate, error } = useSWR("/api/users", fetcher);
  return {
    data,
    isLoading,
    mutate,
    error,
  };
};

export default useUsers;
