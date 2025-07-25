import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api/apiService";

export const useFriends = () => {
  return useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
};
