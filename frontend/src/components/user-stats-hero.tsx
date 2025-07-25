import { UsersIcon, SparklesIcon, TrendingUpIcon, MessageCircleIcon, GlobeIcon, CalendarIcon, StarIcon, ArrowRightIcon } from "lucide-react"

interface UserStatsProps {
  friendsCount: number;
  joinDate?: string;
  location?: string;
}

const UserStatsHero = ({
  friendsCount,
  joinDate,
  location,
}: UserStatsProps) => {
  const formatJoinDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const calculateDaysActive = (joinDate: string) => {
    const join = new Date(joinDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - join.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mb-12">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-8 left-8 w-20 h-20 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative p-8 lg:p-12 text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Welcome back!
                </h1>
                <p className="text-white/90 text-lg lg:text-xl font-medium">
                  Continue your language learning journey
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/80 mb-6">
              <TrendingUpIcon className="w-5 h-5" />
              <span className="text-sm font-medium">
                Keep up the amazing progress!
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {/* Friends Count */}
            <div className="group bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-blue-500/30 rounded-xl group-hover:bg-blue-500/40 transition-colors duration-300">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <ArrowRightIcon className="w-4 h-4 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="text-3xl font-bold mb-1">{friendsCount}</div>
              <div className="text-sm text-white/80 font-medium">
                Learning Partners
              </div>
            </div>

            {/* Location */}
            {location && (
              <div className="group bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-green-500/30 rounded-xl group-hover:bg-green-500/40 transition-colors duration-300">
                    <GlobeIcon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div className="text-lg font-bold mb-1 truncate">
                  {location}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Your Location
                </div>
              </div>
            )}

            {/* Join Date / Days Active */}
            {joinDate && (
              <div className="group bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-purple-500/30 rounded-xl group-hover:bg-purple-500/40 transition-colors duration-300">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-white/60 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div className="text-lg font-bold mb-1">
                  {calculateDaysActive(joinDate)} days
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Learning Journey
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsHero;
