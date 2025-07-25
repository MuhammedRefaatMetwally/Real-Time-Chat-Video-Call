import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendFriendRequest } from "../lib/api/apiService"

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] })
    },
  })
}
