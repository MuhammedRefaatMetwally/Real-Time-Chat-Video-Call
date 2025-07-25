import { useQuery } from "@tanstack/react-query"
import { getOutgoingFriendRequests } from "../lib/api/apiService"

export const useOutgoingFriendRequests = () => {
  return useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendRequests,
  })
}
