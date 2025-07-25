import { useQuery } from "@tanstack/react-query"
import { getRecommendedUsers } from "../lib/api/apiService"

export const useRecommendedUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  })
}
