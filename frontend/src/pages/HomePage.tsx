import { Link, useNavigate } from "react-router";
import {
  UsersIcon,
  SparklesIcon,
  TrendingUpIcon,
  MessageCircleIcon,
  GlobeIcon,
  CalendarIcon,
  StarIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useFriends } from "../hooks/use-friends";
import { useRecommendedUsers } from "../hooks/use-recommended-users";
import { useOutgoingFriendRequests } from "../hooks/use-outgoing-friend-requests";
import { useSendFriendRequest } from "../hooks/use-send-friend-request";
import { useOutgoingRequestsTracker } from "../hooks/use-outgoing-requests-tracker";
import { FriendCard } from "../components/friend-card";
import { RecommendedCard } from "../components/recommended-user-card";
import {
  FriendCardSkeleton,
  RecommendedCardSkeleton,
} from "../components/loading-states";
import {
  NoFriendsEmptyState,
  NoRecommendationsEmptyState,
} from "../components/empty-states";
import { useUser } from "@/hooks/useUser";
import UserStatsHero from "@/components/user-stats-hero";

const HomePage = () => {
  const { data: friends = [], isLoading: loadingFriends } = useFriends();
  const { data: recommendedUsers = [], isLoading: loadingUsers } =
    useRecommendedUsers();
  const { data: outgoingFriendReqs } = useOutgoingFriendRequests();
  const { mutate: sendRequestMutation, isPending } = useSendFriendRequest();
  const { user } = useUser();
  const outgoingRequestsIds = useOutgoingRequestsTracker(
    outgoingFriendReqs || []
  );
  const navigate = useNavigate();

  // Fixed navigation handlers with debugging
  const handleMessage = (friendId: string) => {
    console.log("Navigating to chat:", friendId);
    console.log("Navigate function:", navigate);
    
    try {
      navigate(`/chat/${friendId}`);
      console.log("Navigation successful");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleCall = (friendId: string) => {
    console.log("Navigating to voice call:", friendId);
    
    try {
      navigate(`/call/voice/${friendId}`);
      console.log("Voice call navigation successful");
    } catch (error) {
      console.error("Voice call navigation error:", error);
    }
  };

  const handleVideoCall = (friendId: string) => {
    console.log("Navigating to video call:", friendId);
    
    try {
      navigate(`/call/video/${friendId}`);
      console.log("Video call navigation successful");
    } catch (error) {
      console.error("Video call navigation error:", error);
    }
  };

  const handleViewProfile = (friendId: string) => {
    console.log("Navigating to profile:", friendId);
    
    try {
      navigate(`/profile/${friendId}`);
      console.log("Profile navigation successful");
    } catch (error) {
      console.error("Profile navigation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Hero Stats Section */}
        <UserStatsHero
          friendsCount={friends.length}
          joinDate={user?.createdAt}
          location={user?.location}
        />

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Link
            to="/notifications"
            className="group flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Friend Requests
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your connections
              </p>
            </div>
            {outgoingFriendReqs && outgoingFriendReqs.length > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                {outgoingFriendReqs.length}
              </div>
            )}
            <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
          </Link>

          <Link
            to="/chat"
            className="group flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <MessageCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Start Chatting
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Practice with friends
              </p>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>

        {/* Friends Section */}
        <section className="mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                    Your Learning Circle
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mt-1">
                    Stay connected with your language partners
                  </p>
                </div>
              </div>

              {friends.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <span>
                    You have {friends.length} active learning partner
                    {friends.length !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>

          {loadingFriends ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <FriendCardSkeleton key={i} />
              ))}
            </div>
          ) : friends.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <NoFriendsEmptyState />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {friends.map((friend) => (
                <FriendCard
                  key={friend._id}
                  friend={friend}
                  onMessage={handleMessage}
                  onCall={handleCall}
                  onVideoCall={handleVideoCall}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </section>

        {/* Recommended Users Section */}
        <section>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl opacity-30 blur-xl animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                    Discover New Partners
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mt-1">
                    Handpicked language exchange partners based on your
                    interests
                  </p>
                </div>
              </div>

              {recommendedUsers.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <TrendingUpIcon className="w-4 h-4 text-green-500" />
                  <span>
                    {recommendedUsers.length} perfect matches found for you
                  </span>
                </div>
              )}
            </div>
          </div>

          {loadingUsers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <RecommendedCardSkeleton key={i} />
              ))}
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <NoRecommendationsEmptyState />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                return (
                  <RecommendedCard
                    key={user._id}
                    user={user}
                    hasRequestBeenSent={hasRequestBeenSent}
                    onSendRequest={sendRequestMutation}
                    isPending={isPending}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;