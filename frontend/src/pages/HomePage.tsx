import { Link } from "react-router"
import { UsersIcon, SparklesIcon } from "lucide-react"
import { useFriends } from "../hooks/use-friends"
import { useRecommendedUsers } from "../hooks/use-recommended-users"
import { useOutgoingFriendRequests } from "../hooks/use-outgoing-friend-requests"
import { useSendFriendRequest } from "../hooks/use-send-friend-request"
import { useOutgoingRequestsTracker } from "../hooks/use-outgoing-requests-tracker"
import { UserStatsHero } from "../components/user-stats-hero"
import { FriendCard } from "../components/friend-card"
import { RecommendedCard } from "../components/recommended-user-card"
import { FriendCardSkeleton, RecommendedCardSkeleton } from "../components/loading-states"
import { NoFriendsEmptyState, NoRecommendationsEmptyState } from "../components/empty-states"
import { useUser } from "@/hooks/useUser"

const HomePage = () => {
  const { data: friends = [], isLoading: loadingFriends } = useFriends()
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useRecommendedUsers()
  const { data: outgoingFriendReqs } = useOutgoingFriendRequests()
  const { mutate: sendRequestMutation, isPending } = useSendFriendRequest()
  const {user} = useUser()
  const outgoingRequestsIds = useOutgoingRequestsTracker(outgoingFriendReqs || [])

 

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Stats Section */}
      <UserStatsHero friendsCount={friends.length} joinDate={user?.createdAt} location={user?.location} />

      {/* Friends Section */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Your Learning Circle</h2>
            <p className="text-muted-foreground">Stay connected with your language partners</p>
          </div>
          <Link
            to="/notification"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-lg"
          >
            <UsersIcon className="w-5 h-5" />
            Friend Requests
            {outgoingFriendReqs && outgoingFriendReqs.length > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                {outgoingFriendReqs.length}
              </span>
            )}
          </Link>
        </div>

        {loadingFriends ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <FriendCardSkeleton key={i} />
            ))}
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </section>

      {/* Recommended Users Section */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-foreground">Discover New Partners</h2>
              <SparklesIcon className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Handpicked language exchange partners based on your profile and interests
            </p>
          </div>
        </div>

        {loadingUsers ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <RecommendedCardSkeleton key={i} />
            ))}
          </div>
        ) : recommendedUsers.length === 0 ? (
          <NoRecommendationsEmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedUsers.map((user) => {
              
              const hasRequestBeenSent = outgoingRequestsIds.has(user._id)
              return (
                <RecommendedCard
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
  )
}

export default HomePage
