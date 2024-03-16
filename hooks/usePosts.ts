import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const usePosts = () => {
  const { data, isLoading, mutate, error } = useSWR("/api/posts", fetcher);
  return {
    data,
    isLoading,
    mutate,
    error,
  };
};

export default usePosts;
