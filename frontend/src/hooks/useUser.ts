"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { toast } from "sonner"
import { getAuthUser, logout } from "@/lib/api/apiService"
import type { User } from "@/lib/types"

interface AuthUserResponse {
  user: User | null
}

export function useUser() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data, isLoading, isError, error, refetch } = useQuery<AuthUserResponse>({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const user = data?.user || null
  const isAuthenticated = !!user

  useEffect(() => {
    if (isError && error) {
      console.error("Authentication error:", error)
      queryClient.setQueryData(["authUser"], null)
      toast.error("Session expired. Please log in again.")
      navigate("/login", { replace: true })
    }
  }, [isError, error, queryClient, navigate])

  const refreshUser = () => {
    return refetch()
  }

  const logoutQuery = async () => {
    try {
      await logout()
      queryClient.clear()
      toast.success("Logged out successfully")
      navigate("/login", { replace: true })
    } catch (error) {
      console.error("Logout error:", error)
      queryClient.clear()
      navigate("/login", { replace: true })
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    isError,
    error,
    logoutQuery,
    refreshUser,
  }
}
