import { UsersIcon, GlobeIcon, CalendarIcon } from "lucide-react"

interface UserStatsProps {
  friendsCount: number
  joinDate?: string
  location?: string
}

export const UserStatsHero = ({ friendsCount, joinDate, location }: UserStatsProps) => {
  const formatJoinDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="gradient-bg rounded-2xl p-8 text-white mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-white/80 text-lg">Continue your language learning journey</p>
        </div>

        <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <UsersIcon className="w-5 h-5" />
            <div>
              <div className="text-2xl font-bold">{friendsCount}</div>
              <div className="text-sm text-white/80">Friends</div>
            </div>
          </div>

          {location && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <GlobeIcon className="w-5 h-5" />
              <div>
                <div className="text-sm font-medium">{location}</div>
                <div className="text-xs text-white/80">Location</div>
              </div>
            </div>
          )}

          {joinDate && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <CalendarIcon className="w-5 h-5" />
              <div>
                <div className="text-sm font-medium">{formatJoinDate(joinDate)}</div>
                <div className="text-xs text-white/80">Joined</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserStatsHero;