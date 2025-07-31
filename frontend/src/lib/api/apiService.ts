import { axiosInstance } from "./axios-config";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return { user: null, profile: null };
    }
    throw error;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/user/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/user");
  return response.data;
}

export async function getOutgoingFriendRequests() {
  const response = await axiosInstance.get("/user/outgoing-friend-requests");
  return response.data;
}


export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/user/friend-request/${userId}`);
  return response.data;
}


export async function getFriendRequests(){
  const response = await axiosInstance.get("/user/friend-requests");
  return response.data; 
}


export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`);
  return response.data;
}


export async function getStreamToken(){
  try {
    console.log("Fetching Stream token...");
    const response = await axiosInstance.get("/chat/token");
    console.log("Stream token fetched successfully");
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch Stream token:", error);
    if (error.response?.status === 401) {
      throw new Error("Authentication required. Please log in again.");
    } else if (error.response?.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw new Error("Failed to connect to chat service. Please check your connection.");
    }
  }
}