import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalize = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Stream Chat Utilities
export const validateStreamConfig = () => {
  const apiKey = import.meta.env.VITE_STREAM_API_KEY;
  if (!apiKey) {
    throw new Error("Stream API key is missing. Please check your environment variables.");
  }
  return apiKey;
};

export const createChannelId = (userId1: string, userId2: string) => {
  return [userId1, userId2].sort().join("-");
};

export const formatUserForStream = (user: any) => {
  return {
    id: user._id,
    name: user.fullName || user.name || "Unknown User",
    image: user.profilePic || user.avatar || undefined,
  };
};

export const handleStreamError = (error: any) => {
  console.error("Stream Chat Error:", error);
  
  // Handle specific Stream errors
  if (error.message?.includes("Both secret and user tokens are not set")) {
    return "Authentication failed. Please log in again and try connecting to chat.";
  }
  
  if (error.message?.includes("token")) {
    return "Authentication failed. Please log in again.";
  }
  
  if (error.message?.includes("network")) {
    return "Network error. Please check your connection.";
  }
  
  if (error.message?.includes("rate limit")) {
    return "Too many requests. Please wait a moment.";
  }

  if (error.message?.includes("GetOrCreateChannel failed")) {
    if (error.message?.includes("don't exist")) {
      return "User not found in chat system. Please try again later.";
    }
    return "Failed to create chat channel. Please try again.";
  }
  
  return "An unexpected error occurred. Please try again.";
};