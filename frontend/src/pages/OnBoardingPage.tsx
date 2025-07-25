"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Shuffle, Loader, Ship, Camera, Globe, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/hooks/useUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { completeOnboarding } from "@/lib/api/apiService"
import { toast } from "sonner"
import { useNavigate } from "react-router"

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Finnish",
  "Polish",
]

export default function OnBoardingPage() {
  const { user, isLoading: userLoading, isAuthenticated } = useUser()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [formState, setFormState] = useState({
    fullName: user?.fullName || "",
    bio: user?.bio || "",
    nativeLanguage: user?.nativeLanguage || "",
    learningLanguage: user?.learningLanguage || "",
    location: user?.location || "",
    profilePic: user?.profilePic || "",
  })

  // Complete onboarding mutation
  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully")
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
      navigate("/", { replace: true })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to complete onboarding")
    },
  })

  // Show loading screen while checking authentication
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null // useUser hook will handle redirect
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formState.fullName.trim()) {
      toast.error("Please enter your full name")
      return
    }

    if (!formState.nativeLanguage) {
      toast.error("Please select your native language")
      return
    }

    if (!formState.learningLanguage) {
      toast.error("Please select the language you're learning")
      return
    }

    onboardingMutation(formState)
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1 // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
    setFormState({ ...formState, profilePic: randomAvatar })
    toast.success("Random profile picture generated!")
  }

  const updateFormState = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Complete Your Profile
            </CardTitle>
            <p className="text-muted-foreground max-w-md mx-auto">
              Tell us about yourself to get matched with the perfect language partners
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* PROFILE PIC CONTAINER */}
              <motion.div
                className="flex flex-col items-center justify-center space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* IMAGE PREVIEW */}
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-muted overflow-hidden border-4 border-primary/20">
                    {formState.profilePic ? (
                      <img
                        src={formState.profilePic || "/placeholder.svg"}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Camera className="h-12 w-12 text-muted-foreground opacity-40" />
                      </div>
                    )}
                  </div>
                  {formState.profilePic && (
                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>

                {/* Generate Random Avatar BTN */}
                <Button
                  type="button"
                  onClick={handleRandomAvatar}
                  variant="outline"
                  className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 hover:from-primary/20 hover:to-secondary/20"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate Random Avatar
                </Button>
              </motion.div>

              {/* FULL NAME */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formState.fullName}
                  onChange={(e) => updateFormState("fullName", e.target.value)}
                  className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                  placeholder="Your full name"
                  required
                />
              </motion.div>

              {/* BIO */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formState.bio}
                  onChange={(e) => updateFormState("bio", e.target.value)}
                  className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                  placeholder="Tell others about yourself and your language learning goals..."
                />
              </motion.div>

              {/* LANGUAGES */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* NATIVE LANGUAGE */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                    Native Language *
                  </Label>
                  <Select
                    value={formState.nativeLanguage}
                    onValueChange={(value) => updateFormState("nativeLanguage", value)}
                  >
                    <SelectTrigger className="h-12 bg-background/50 border-border/50 focus:border-primary/50">
                      <SelectValue placeholder="Select your native language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={`native-${lang}`} value={lang.toLowerCase()}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* LEARNING LANGUAGE */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-secondary" />
                    Learning Language *
                  </Label>
                  <Select
                    value={formState.learningLanguage}
                    onValueChange={(value) => updateFormState("learningLanguage", value)}
                  >
                    <SelectTrigger className="h-12 bg-background/50 border-border/50 focus:border-primary/50">
                      <SelectValue placeholder="Select language you're learning" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={`learning-${lang}`} value={lang.toLowerCase()}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* LOCATION */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    type="text"
                    value={formState.location}
                    onChange={(e) => updateFormState("location", e.target.value)}
                    className="h-12 pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                    placeholder="City, Country"
                  />
                </div>
              </motion.div>

              {/* SUBMIT BUTTON */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isPending ? (
                    <>
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Onboarding...
                    </>
                  ) : (
                    <>
                      <Ship className="h-5 w-5 mr-2" />
                      Complete Onboarding
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
