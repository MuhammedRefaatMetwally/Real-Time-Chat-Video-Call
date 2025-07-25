import type React from "react"
import { Navigation } from "./navigation"
import { useUser } from "../hooks/useUser"

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { user , logoutQuery } = useUser()

  const handleLogout = () => {
   logoutQuery
  }

  const notificationCount = 3

  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentUser={user} notificationCount={notificationCount} onLogout={handleLogout} />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  )
}
