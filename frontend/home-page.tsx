import { Link } from "react-router"
import { UsersIcon } from "lucide-react"
import { useFriends } from "./hooks/use-friends"
import { useRecommendedUsers } from "./hooks/use-recommended-users"
import { useOutgoingFriendRequests } from "./hooks/use-outgoing-friend-requests"
import { useSendFriendRequest } from "./hooks/use-send-friend-request"
import { useOutgoingRequestsTracker } from "./hooks/use-outgoing-requests-tracker"
import { LoadingSpinner } from "./components/loading-spinner"
import { FriendCardSimple } from "./components/friend-card-simple"
import { RecommendedUserCard } from "./components/recommended-user-card"
import { NoFriendsFound } from "./components/no-friends-found"

const HomePage = () => {
  const { data: friends = [], isLoading: loadingFriends } = useFriends()
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useRecommendedUsers()
  const { data: outgoingFriendReqs } = useOutgoingFriendRequests()
  const { mutate: sendRequestMutation, isPending } = useSendFriendRequest()

  const outgoingRequestsIds = useOutgoingRequestsTracker(outgoingFriendReqs || [])

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* Friends Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Your Friends</h2>
          <Link
            to="/notifications"
            className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <UsersIcon className="mr-2 w-4 h-4" />
            Friend Requests
          </Link>
        </div>

        {/* Friends Grid */}
        {loadingFriends ? (
          <LoadingSpinner />
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCardSimple key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* Recommended Users Section */}
        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Meet New Learners</h2>
                <p className="text-muted-foreground">
                  Discover perfect language exchange partners based on your profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <LoadingSpinner />
          ) : recommendedUsers.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">No recommendations available</h3>
              <p className="text-muted-foreground">Check back later for new language partners!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id)
                return (
                  <RecommendedUserCard
                    key={user._id}
                    user={user}
                    hasRequestBeenSent={hasRequestBeenSent}
                    onSendRequest={sendRequestMutation}
                    isPending={isPending}
                  />
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage
