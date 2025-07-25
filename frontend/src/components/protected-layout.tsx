import { Navigate } from "react-router"
import { useUser } from "../hooks/useUser"
import { AppLayout } from "./app-layout"

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-secondary rounded-full animate-spin animate-reverse"></div>
      </div>
      <div className="text-center space-y-2">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-sm">LL</span>
        </div>
        <p className="text-lg font-medium text-foreground">Loading LangLink...</p>
        <p className="text-sm text-muted-foreground">Connecting you to the world</p>
      </div>
    </div>
  </div>
)

interface ProtectedLayoutProps {
  requireOnboarding?: boolean
}

export const ProtectedLayout = ({ requireOnboarding = true }: ProtectedLayoutProps) => {
  const { user, isLoading, isAuthenticated } = useUser()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user) {
    return <LoadingSpinner />
  }

  if (requireOnboarding && !user.isOnboarded) {
    return <Navigate to="/onboarding" replace />
  }

  return <AppLayout />
}

