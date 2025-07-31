import { LANGUAGE_TO_FLAG } from "@/lib/types";
import {
  MapPinIcon,
  MessageCircleIcon,
  CalendarIcon,
  MoreVerticalIcon,
  UserPlusIcon,
  PhoneIcon,
  VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { capitalize } from "@/lib/utils";

interface Friend {
  _id: string;
  fullName: string;
  profilePic: string;
  location?: string;
  nativeLanguage: string;
  learningLanguage: string;
  bio?: string;
  createdAt?: string;
  isOnboarded: boolean;
  isOnline?: boolean;
  lastSeen?: string;
}

interface FriendCardProps {
  friend: Friend;
  onMessage?: (friendId: string) => void;
  onCall?: (friendId: string) => void;
  onVideoCall?: (friendId: string) => void;
  onViewProfile?: (friendId: string) => void;
  className?: string;
}

export const FriendCard = ({
  friend,
  onMessage,
  onCall,
  onVideoCall,
  onViewProfile,
  className = "",
}: FriendCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatJoinDate = (date: string) => {
    const now = new Date();
    const joinDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getOnlineStatus = () => {
    if (friend.isOnline) return "online";
    if (friend.lastSeen) {
      const lastSeenDate = new Date(friend.lastSeen);
      const now = new Date();
      const diffMinutes = Math.floor(
        (now.getTime() - lastSeenDate.getTime()) / (1000 * 60)
      );

      if (diffMinutes < 5) return "recently";
      if (diffMinutes < 60) return "away";
    }
    return "offline";
  };

  const getStatusConfig = () => {
    const status = getOnlineStatus();
    switch (status) {
      case "online":
        return {
          color: "bg-emerald-500 dark:bg-emerald-400",
          text: "Online",
          ringColor: "ring-emerald-500/20 dark:ring-emerald-400/20",
        };
      case "recently":
        return {
          color: "bg-amber-500 dark:bg-amber-400",
          text: "Recently active",
          ringColor: "ring-amber-500/20 dark:ring-amber-400/20",
        };
      case "away":
        return {
          color: "bg-orange-500 dark:bg-orange-400",
          text: "Away",
          ringColor: "ring-orange-500/20 dark:ring-orange-400/20",
        };
      default:
        return {
          color: "bg-slate-400 dark:bg-slate-500",
          text: "Offline",
          ringColor: "ring-slate-400/20 dark:ring-slate-500/20",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const isOnline = friend.isOnline;

  // Add debugging for button clicks
  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Message button clicked for friend:", friend._id);
    console.log("onMessage function:", onMessage);
    onMessage?.(friend._id);
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Call button clicked for friend:", friend._id);
    console.log("onCall function:", onCall);
    onCall?.(friend._id);
  };

  const handleVideoCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Video call button clicked for friend:", friend._id);
    console.log("onVideoCall function:", onVideoCall);
    onVideoCall?.(friend._id);
  };

  const handleViewProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("View profile clicked for friend:", friend._id);
    console.log("onViewProfile function:", onViewProfile);
    onViewProfile?.(friend._id);
  };

  console.log("Friend Card Rendered:", {
    friend: friend,
    onMessage: !!onMessage,
    onCall: !!onCall,
    onVideoCall: !!onVideoCall,
    onViewProfile: !!onViewProfile,
  });

  return (
    <div
      className={`group relative bg-card border border-border rounded-2xl overflow-hidden 
        hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-500 ease-out
        hover:-translate-y-2 hover:border-primary/30 hover:bg-card/95 dark:hover:bg-card/90 backdrop-blur-sm ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle gradient overlay - FIXED: pointer-events-none to prevent blocking clicks */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 dark:from-primary/5 dark:to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header with improved spacing */}
      <div className="relative p-6">
        {/* Actions menu - improved positioning and z-index */}
        <div className="absolute top-4 right-4 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-sm border-0
                  transition-all duration-300 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }
                  hover:bg-background/95 dark:hover:bg-background hover:shadow-lg dark:hover:shadow-xl relative z-20`}
              >
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 z-50">
              <DropdownMenuItem
                onClick={handleViewProfileClick}
                className="cursor-pointer"
              >
                <UserPlusIcon className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleCallClick}
                className="cursor-pointer"
              >
                <PhoneIcon className="h-4 w-4 mr-2" />
                Voice Call
              </DropdownMenuItem>
              {onVideoCall && (
                <DropdownMenuItem
                  onClick={handleVideoCallClick}
                  className="cursor-pointer"
                >
                  <VideoIcon className="h-4 w-4 mr-2" />
                  Video Call
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Profile Section - improved layout */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative flex-shrink-0">
            <Avatar
              className={`w-20 h-20 ring-2 transition-all duration-300 ${
                statusConfig.ringColor
              }
              ${
                isHovered
                  ? "ring-4 ring-primary/20 dark:ring-primary/30 scale-105"
                  : "ring-border"
              }`}
            >
              <AvatarImage
                src={!imageError ? friend.profilePic : undefined}
                alt={friend.fullName}
                onError={() => setImageError(true)}
                className="transition-all duration-300 group-hover:scale-110"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary text-primary-foreground font-semibold text-xl">
                {getInitials(friend.fullName)}
              </AvatarFallback>
            </Avatar>

            {/* Enhanced Status Indicator */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute -bottom-1 -right-1">
                    <div
                      className={`w-6 h-6 ${statusConfig.color} rounded-full border-3 border-card shadow-lg flex items-center justify-center`}
                    >
                      {isOnline && (
                        <div className="w-2 h-2 bg-white dark:bg-white rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="font-medium">
                  <p>{statusConfig.text}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <h3 className="font-bold text-xl text-foreground truncate mb-2 transition-colors duration-300 group-hover:text-primary">
              {friend.fullName}
            </h3>

            <div className="flex flex-col gap-2">
              {friend.location && (
                <div className="flex items-center text-sm text-muted-foreground group-hover:text-muted-foreground/90 dark:group-hover:text-muted-foreground/80 transition-colors">
                  <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0 text-primary/70 dark:text-primary/60" />
                  <span className="truncate font-medium">
                    {friend.location}
                  </span>
                </div>
              )}

              {friend.createdAt && (
                <div className="flex items-center text-sm text-muted-foreground group-hover:text-muted-foreground/90 dark:group-hover:text-muted-foreground/80 transition-colors">
                  <CalendarIcon className="w-4 h-4 mr-2 flex-shrink-0 text-primary/70 dark:text-primary/60" />
                  <span className="font-medium">
                    Joined {formatJoinDate(friend.createdAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Language Badges - improved styling */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge
            variant="secondary"
            className="px-3 py-1.5 text-xs font-semibold bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary border-primary/20 dark:border-primary/30 hover:bg-primary/15 dark:hover:bg-primary/20 transition-colors"
          >
            <LanguageFlag language={friend.nativeLanguage} />
            <span className="ml-2">
              Native: {capitalize(friend.nativeLanguage)}
            </span>
          </Badge>

          <Badge
            variant="outline"
            className="px-3 py-1.5 text-xs font-semibold border-2 hover:bg-accent/50 dark:hover:bg-accent/30 transition-colors"
          >
            <LanguageFlag language={friend.learningLanguage} />
            <span className="ml-2">
              Learning: {capitalize(friend.learningLanguage) || "Not specified"}
            </span>
          </Badge>
        </div>

        {/* Bio - improved typography */}
        <div className="mb-6">
          {friend.bio ? (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium">
              {friend.bio}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground/50 dark:text-muted-foreground/60 italic">
              No bio available yet
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons - FIXED: enhanced design with proper z-index and event handling */}
      <div className="px-6 pb-6 relative z-10">
        <div className="flex gap-3">
          <Button
            onClick={handleMessageClick}
            className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/90 dark:from-primary dark:to-primary/95 text-primary-foreground 
              hover:from-primary/90 hover:to-primary/80 dark:hover:from-primary/95 dark:hover:to-primary/85 transition-all duration-300 font-semibold
              shadow-lg hover:shadow-xl hover:shadow-primary/25 dark:hover:shadow-primary/20 hover:-translate-y-0.5 relative z-10 cursor-pointer"
          >
            <MessageCircleIcon className="w-5 h-5 mr-2" />
            Message
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleCallClick}
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border-2 hover:bg-accent hover:text-accent-foreground 
                    hover:border-primary/50 dark:hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5
                    hover:shadow-lg dark:hover:shadow-xl relative z-10 cursor-pointer"
                >
                  <PhoneIcon className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voice call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {onVideoCall && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleVideoCallClick}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-2 hover:bg-accent hover:text-accent-foreground 
                      hover:border-primary/50 dark:hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5
                      hover:shadow-lg dark:hover:shadow-xl relative z-10 cursor-pointer"
                  >
                    <VideoIcon className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Video call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Language Flag Component
export function LanguageFlag({ language }: { language: string }) {
  const [imageError, setImageError] = useState(false);

  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode && !imageError) {
    return (
      <img
        src={`https://flagcdn.com/16x12/${countryCode}.png`}
        alt={`${language} flag`}
        className="h-3.5 w-5 object-cover rounded-sm flex-shrink-0 shadow-sm"
        onError={() => setImageError(true)}
      />
    );
  }

  const languageEmojis: Record<string, string> = {
    english: "🇺🇸",
    spanish: "🇪🇸",
    french: "🇫🇷",
    german: "🇩🇪",
    italian: "🇮🇹",
    portuguese: "🇵🇹",
    chinese: "🇨🇳",
    japanese: "🇯🇵",
    korean: "🇰🇷",
    arabic: "🇸🇦",
    russian: "🇷🇺",
    hindi: "🇮🇳",
  };

  const emoji = languageEmojis[langLower];
  if (emoji) {
    return <span className="text-base">{emoji}</span>;
  }

  return <span className="text-base">🌍</span>;
}