"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { Bell, LogOut, Settings, User, MessageCircle, ChevronDown, Home, Phone, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavigationProps {
  currentUser: any
  notificationCount?: number
  onLogout: () => void
}

export const Navigation = ({ currentUser, notificationCount = 0, onLogout }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleLogout = () => {
    onLogout()
    navigate("/login")
  }

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/notification", label: "Notifications", icon: Bell },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LL</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">LangLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {item.label === "Notifications" && notificationCount > 0 && (
                    <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile User Info */}
                  <div className="flex items-center gap-3 p-4 border-b border-border">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={currentUser.profilePic || "/placeholder.svg"} alt={currentUser.fullName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        {getInitials(currentUser.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{currentUser.fullName}</p>
                      <p className="text-sm text-muted-foreground truncate">{currentUser.email}</p>
                    </div>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="flex-1 py-4">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 mb-1 font-medium transition-all duration-200 ${
                            isActive(item.href)
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-accent/50"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {item.label}
                          {item.label === "Notifications" && notificationCount > 0 && (
                            <Badge variant="destructive" className="ml-auto px-1.5 py-0.5 text-xs">
                              {notificationCount > 9 ? "9+" : notificationCount}
                            </Badge>
                          )}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="border-t border-border pt-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg mx-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-1 h-auto">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={currentUser.profilePic || "/placeholder.svg"} alt={currentUser.fullName} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm">
                      {getInitials(currentUser.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-foreground truncate max-w-24">
                      {currentUser.fullName.split(" ")[0]}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={currentUser.profilePic || "/placeholder.svg"} alt={currentUser.fullName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        {getInitials(currentUser.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{currentUser.fullName}</p>
                      <p className="text-sm text-muted-foreground truncate">{currentUser.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
