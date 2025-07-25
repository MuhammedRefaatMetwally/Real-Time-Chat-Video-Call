import { acceptFriendRequest, getFriendRequests } from "@/lib/api/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

 export const useNotification = () => {
  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending , error:acceptError } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast.success("Friend request accepted successfully!");
    },
  });

   return {
    incomingRequests: friendRequests?.incomingReqs || [],
    acceptedRequests: friendRequests?.acceptedReqs || [],
    isLoading,
    acceptError,
    acceptRequest: (requestId) => acceptRequestMutation(requestId),
    isAccepting: isPending,
  };
};
