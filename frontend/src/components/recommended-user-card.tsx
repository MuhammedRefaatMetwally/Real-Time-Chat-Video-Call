import { LANGUAGE_TO_FLAG } from "@/lib/types";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  ClockIcon,
  StarIcon,
  SparklesIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { capitalize } from "@/lib/utils";

interface User {
  _id: string;
  fullName: string;
  profilePic: string;
  location?: string;
  nativeLanguage: string;
  learningLanguage?: string; // Added for completeness
  bio?: string;
  createdAt?: string;
  isOnboarded: boolean;
}

interface RecommendedCardProps {
  user: User;
  hasRequestBeenSent: boolean;
  onSendRequest: (userId: string) => void;
  isPending: boolean;
  className?: string;
}

export const RecommendedCard = ({
  user,
  hasRequestBeenSent,
  onSendRequest,
  isPending,
  className = "",
}: RecommendedCardProps) => {
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

  const isNewUser = () => {
    if (!user.createdAt) return false;
    const now = new Date();
    const joinDate = new Date(user.createdAt);
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const getMatchScore = () => {
    // Enhanced matching algorithm
    let score = 65; // Base score
    if (user.location) score += 15;
    if (user.bio && user.bio.length > 50) score += 10;
    if (user.bio && user.bio.length > 100) score += 5;
    if (user.isOnboarded) score += 15;
    if (isNewUser()) score += 5; // Slight boost for new users
    return Math.min(score, 98);
  };

  const getMatchColor = () => {
    const score = getMatchScore();
    if (score >= 90) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-amber-600 dark:text-amber-400";
    return "text-orange-600 dark:text-orange-400";
  };

  const getMatchBgColor = () => {
    const score = getMatchScore();
    if (score >= 90) return "bg-emerald-500/10 dark:bg-emerald-500/20";
    if (score >= 80) return "bg-green-500/10 dark:bg-green-500/20";
    if (score >= 70) return "bg-amber-500/10 dark:bg-amber-500/20";
    return "bg-orange-500/10 dark:bg-orange-500/20";
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

  return (
    <div
      className={`group relative bg-card border border-border rounded-2xl overflow-hidden 
        hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-500 ease-out
        hover:-translate-y-2 hover:border-primary/30 hover:bg-card/95 dark:hover:bg-card/90 backdrop-blur-sm ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 dark:from-primary/5 dark:to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header with improved badges */}
      <div className="relative p-6">
        {/* New User Badge */}
        {isNewUser() && (
          <div
            className={`absolute top-4 right-4 z-10 transition-all duration-300 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg">
              <SparklesIcon className="w-3 h-3 mr-1" />
              New
            </Badge>
          </div>
        )}

        {/* Profile Section - enhanced layout */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative flex-shrink-0">
            <Avatar
              className={`w-20 h-20 ring-2 transition-all duration-300 ring-border
              ${
                isHovered
                  ? "ring-4 ring-primary/20 dark:ring-primary/30 scale-105"
                  : ""
              }`}
            >
              <AvatarImage
                src={!imageError ? user.profilePic : undefined}
                alt={user.fullName}
                onError={() => setImageError(true)}
                className="transition-all duration-300 group-hover:scale-110"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary text-primary-foreground font-semibold text-xl">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>

            {/* Onboarded Status Indicator */}
            {user.isOnboarded && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -bottom-1 -right-1">
                      <div className="w-6 h-6 bg-emerald-500 dark:bg-emerald-400 rounded-full border-3 border-card shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-white dark:bg-white rounded-full" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="font-medium">
                    <p>Profile Complete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <h3 className="font-bold text-xl text-foreground truncate mb-2 transition-colors duration-300 group-hover:text-primary">
              {user.fullName}
            </h3>

            <div className="flex flex-col gap-2">
              {user.location && (
                <div className="flex items-center text-sm text-muted-foreground group-hover:text-muted-foreground/90 dark:group-hover:text-muted-foreground/80 transition-colors">
                  <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0 text-primary/70 dark:text-primary/60" />
                  <span className="truncate font-medium">{user.location}</span>
                </div>
              )}

              {user.createdAt && (
                <div className="flex items-center text-sm text-muted-foreground group-hover:text-muted-foreground/90 dark:group-hover:text-muted-foreground/80 transition-colors">
                  <ClockIcon className="w-4 h-4 mr-2 flex-shrink-0 text-primary/70 dark:text-primary/60" />
                  <span className="font-medium">
                    Joined {formatJoinDate(user.createdAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Match Score - enhanced design */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${getMatchBgColor()} transition-all duration-300`}
          >
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${getMatchColor().replace(
                "text-",
                "bg-"
              )}`}
            ></div>
            <span className={`text-sm font-bold ${getMatchColor()}`}>
              {getMatchScore()}% Match
            </span>
          </div>
        </div>

        {/* Language Badges - with flags */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge
            variant="secondary"
            className="px-3 py-1.5 text-xs font-semibold bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary border-primary/20 dark:border-primary/30 hover:bg-primary/15 dark:hover:bg-primary/20 transition-colors"
          >
            <LanguageFlag language={user.nativeLanguage} />
            <span className="ml-2">
              Native: {capitalize(user.nativeLanguage) || "Not specified"}
            </span>
          </Badge>

          {user.learningLanguage && (
            <Badge
              variant="outline"
              className="px-3 py-1.5 text-xs font-semibold border-2 hover:bg-accent/50 dark:hover:bg-accent/30 transition-colors"
            >
              <LanguageFlag language={user.learningLanguage} />
              <span className="ml-2">
                Learning: {capitalize(user.learningLanguage)}
              </span>
            </Badge>
          )}
        </div>

        {/* Bio - improved typography */}
        <div className="mb-6">
          {user.bio ? (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium">
              {user.bio}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground/50 dark:text-muted-foreground/60 italic">
              No bio available yet
            </p>
          )}
        </div>
      </div>

      {/* Enhanced Action Section */}
      <div className="px-6 pb-6">
        <Button
          onClick={() => onSendRequest(user._id)}
          disabled={hasRequestBeenSent || isPending}
          className={`w-full h-12 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
            hasRequestBeenSent
              ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500/20 dark:border-emerald-500/30 cursor-not-allowed hover:shadow-lg hover:translate-y-0"
              : isPending
              ? "bg-primary/50 text-primary-foreground cursor-not-allowed opacity-70 hover:shadow-lg hover:translate-y-0"
              : "bg-gradient-to-r from-primary to-primary/90 dark:from-primary dark:to-primary/95 text-primary-foreground hover:from-primary/90 hover:to-primary/80 dark:hover:from-primary/95 dark:hover:to-primary/85 hover:shadow-primary/25 dark:hover:shadow-primary/20"
          }`}
        >
          {isPending ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              Sending Request...
            </>
          ) : hasRequestBeenSent ? (
            <>
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              Request Sent
            </>
          ) : (
            <>
              <UserPlusIcon className="w-5 h-5 mr-2" />
              Connect
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

// Language Flag Component (same as FriendCard)
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
