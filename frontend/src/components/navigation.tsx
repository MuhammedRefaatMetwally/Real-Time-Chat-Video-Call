import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { Bell, LogOut, Settings, User, ChevronDown, Home, Menu, X } from "lucide-react"
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
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

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
    setIsMobileMenuOpen(false)
  }

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/notification", label: "Notifications", icon: Bell },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-sm">LL</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:block">
              LangLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="relative">
                    {item.label}
                    {!active && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    )}
                  </span>
                  {item.label === "Notifications" && notificationCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="ml-1 px-1.5 py-0.5 text-xs animate-pulse bg-red-500 hover:bg-red-600 border-0 shadow-lg"
                    >
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </Badge>
                  )}
                  {active && (
                    <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Notifications (Desktop) */}
            {notificationCount > 0 && (
              <Link
                to="/notification"
                className="hidden md:flex relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs min-w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-600 border-2 border-white dark:border-gray-950 shadow-lg animate-pulse"
                >
                  {notificationCount > 99 ? "99+" : notificationCount}
                </Badge>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                >
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-l border-gray-200/20 dark:border-gray-800/20">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200/20 dark:border-gray-800/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">LL</span>
                      </div>
                      <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        LangLink
                      </span>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-xl">
                        <X className="w-5 h-5" />
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Mobile User Info */}
                  <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-b border-gray-200/20 dark:border-gray-800/20">
                    <Avatar className="w-14 h-14 border-2 border-white dark:border-gray-800 shadow-lg">
                      <AvatarImage src={currentUser.profilePic || "/placeholder.svg"} alt={currentUser.fullName} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-lg">
                        {getInitials(currentUser.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 truncate text-lg">{currentUser.fullName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{currentUser.email}</p>
                    </div>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="flex-1 py-6">
                    <div className="px-6 mb-4">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Menu</p>
                    </div>
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.href)
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-4 px-6 py-4 font-medium transition-all duration-300 relative ${
                            active
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                          }`}
                        >
                          {active && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                          )}
                          <Icon className={`w-5 h-5 ${active ? 'text-white' : ''}`} />
                          <span className="flex-1">{item.label}</span>
                          {item.label === "Notifications" && notificationCount > 0 && (
                            <Badge 
                              variant={active ? "secondary" : "destructive"}
                              className={`px-2 py-1 text-xs ${active ? 'bg-white/20 text-white' : 'bg-red-500 text-white animate-pulse'}`}
                            >
                              {notificationCount > 99 ? "99+" : notificationCount}
                            </Badge>
                          )}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="border-t border-gray-200/20 dark:border-gray-800/20 p-6">
                    <Link
                      to="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl mb-2 transition-all duration-300"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 p-1.5 h-auto rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <Avatar className="w-9 h-9 border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all duration-300">
                    <AvatarImage src={currentUser.profilePic || "/placeholder.svg"} alt={currentUser.fullName} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm">
                      {getInitials(currentUser.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-28">
                      {currentUser.fullName.split(" ")[0]}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">View profile</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-72 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border border-gray-200/20 dark:border-gray-800/20 shadow-xl"
              >
                <DropdownMenuLabel className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-14 h-14 border-2 border-gray-200 dark:border-gray-700">
                      <AvatarImage src={currentUser.profilePic || "/placeholder.svg"} alt={currentUser.fullName} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-lg">
                        {getInitials(currentUser.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 truncate text-lg">{currentUser.fullName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{currentUser.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-800/50" />
                <DropdownMenuItem asChild className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200">
                  <Link to="/profile" className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">View Profile</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Manage your account</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200">
                  <Link to="/settings" className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Settings className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">Settings</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Preferences & privacy</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-800/50" />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="p-3 cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <LogOut className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Sign Out</p>
                      <p className="text-xs text-red-500">End your session</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}