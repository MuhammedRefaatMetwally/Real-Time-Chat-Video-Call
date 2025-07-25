export interface User {
  id: string
  fullName: string
  email: string
  bio: string
  profilePic: string
  nativeLanguage: string
  location: string
  isOnboarded: boolean
  friends: string[] // Array of user IDs
  createdAt: string
  updatedAt: string
}

export interface Friend {
  id: string
  fullName: string
  profilePic: string
  nativeLanguage: string
  learningLanguage: string
  location: string
  isOnline: boolean
  lastSeen: string
  bio: string
}

// export enum MessageType {
//   TEXT = "text",
//   IMAGE = "image",
//   FILE = "file",
//   VOICE = "voice",
//   VIDEO_CALL = "video_call",
// }

// export enum CallStatus {
//   PENDING = "pending",
//   ACCEPTED = "accepted",
//   DECLINED = "declined",
//   ENDED = "ended",
//   MISSED = "missed",
// }

// export enum FriendshipStatus {
//   PENDING = "pending",
//   ACCEPTED = "accepted",
//   DECLINED = "declined",
//   BLOCKED = "blocked",
// }

// export enum NotificationType {
//   MESSAGE = "message",
//   FRIEND_REQUEST = "friend_request",
//   LIKE = "like",
//   RATING = "rating",
//   SYSTEM = "system",
//   VIDEO_CALL = "video_call",
// }

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  full_name: string
}

export interface AuthResponse {
  user: User
  access_token: string
  refresh_token: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
}


export interface ProfileUpdateData {
  full_name?: string
  bio?: string
  native_language?: string
  learning_language?: string
  location?: string
  avatar_url?: string
  is_online?: boolean
}

export interface MessageCreateData {
  receiver_id: string
  content: string
}

export interface VideoCallCreateData {
  receiver_id: string
}


export interface UseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: ProfileUpdateData) => Promise<void>
}

export interface UseVideoCallReturn {
  isInCall: boolean
  isLoading: boolean
  startCall: (receiverId: string) => Promise<void>
  acceptCall: (callId: string) => Promise<void>
  declineCall: (callId: string) => Promise<void>
  endCall: (callId: string) => Promise<void>
}

export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese (Mandarin)",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Finnish",
  "Polish",
] as const

export const LANGUAGE_TO_FLAG = {
  english: "gb",
  spanish: "es",
  french: "fr",
  german: "de",
  mandarin: "cn",
  japanese: "jp",
  korean: "kr",
  hindi: "in",
  russian: "ru",
  portuguese: "pt",
  arabic: "sa",
  italian: "it",
  turkish: "tr",
  dutch: "nl",
};

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Sweden",
  "Japan",
  "South Korea",
  "China",
  "Brazil",
  "Mexico",
  "India",
  "Russia",
] as const

export type Language = (typeof LANGUAGES)[number]
export type Country = (typeof COUNTRIES)[number]

// Stream Video types
export interface StreamCallData {
  call_id: string
  token: string
  user_id: string
  user_name: string
  user_image?: string
}
