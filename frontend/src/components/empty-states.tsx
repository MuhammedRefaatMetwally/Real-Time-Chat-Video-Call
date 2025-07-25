export const FriendCardSkeleton = () => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden">
    <div className="p-6">
=      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-muted rounded-full animate-pulse"></div>
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <div className="h-6 bg-gradient-to-r from-muted to-muted/50 rounded-lg w-3/4 mb-3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="h-7 bg-gradient-to-r from-muted to-muted/50 rounded-full w-32 animate-pulse"></div>
        <div className="h-7 bg-gradient-to-r from-muted to-muted/50 rounded-full w-36 animate-pulse"></div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-4/5 animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>

    <div className="px-6 pb-6">
      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-gradient-to-r from-muted to-muted/50 rounded-lg animate-pulse"></div>
        <div className="h-12 w-12 bg-gradient-to-r from-muted to-muted/50 rounded-lg animate-pulse"></div>
        <div className="h-12 w-12 bg-gradient-to-r from-muted to-muted/50 rounded-lg animate-pulse"></div>
      </div>
    </div>
  </div>
)

import { UsersIcon, SearchIcon, HeartIcon } from "lucide-react"

export const NoFriendsEmptyState = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
      <UsersIcon className="w-12 h-12 text-primary" />
    </div>
    <h3 className="text-2xl font-semibold text-foreground mb-3">No friends yet</h3>
    <p className="text-muted-foreground max-w-md mx-auto mb-6">
      Start building your language learning network by connecting with fellow learners below!
    </p>
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <HeartIcon className="w-4 h-4 text-destructive" />
      Your language journey is just beginning
    </div>
  </div>
)

export const NoRecommendationsEmptyState = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
      <SearchIcon className="w-12 h-12 text-primary" />
    </div>
    <h3 className="text-2xl font-semibold text-foreground mb-3">No recommendations available</h3>
    <p className="text-muted-foreground max-w-md mx-auto mb-6">
      We're working hard to find the perfect language partners for you. Check back soon!
    </p>
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      Finding matches...
    </div>
  </div>
)
