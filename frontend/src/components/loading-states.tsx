export const FriendCardSkeleton = () => (
  <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
    <div className="p-6 pb-4">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-muted rounded-full flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-1"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-muted rounded-full w-24"></div>
        <div className="h-6 bg-muted rounded-full w-28"></div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
    </div>

    <div className="px-6 pb-6">
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-muted rounded"></div>
        <div className="h-10 w-10 bg-muted rounded"></div>
      </div>
    </div>
  </div>
)


// Enhanced Skeleton for RecommendedCard
export const RecommendedCardSkeleton = () => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden">
    <div className="p-6">
      {/* Profile section skeleton */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-muted/80 dark:bg-muted/60 rounded-full animate-pulse"></div>
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <div className="h-6 bg-gradient-to-r from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded-lg w-3/4 mb-3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Match score skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 bg-gradient-to-r from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded-full w-28 animate-pulse"></div>
      </div>

      {/* Language badge skeleton */}
      <div className="flex gap-3 mb-6">
        <div className="h-7 bg-gradient-to-r from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded-full w-40 animate-pulse"></div>
      </div>

      {/* Bio skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gradient-to-r from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded w-4/5 animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>

    {/* Action button skeleton */}
    <div className="px-6 pb-6">
      <div className="w-full h-12 bg-gradient-to-r from-muted/60 to-muted/40 dark:from-muted/40 dark:to-muted/20 rounded-lg animate-pulse"></div>
    </div>
  </div>
)
export const EnhancedLoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-muted rounded-full"></div>
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-muted-foreground font-medium">{text}</p>
  </div>
)
