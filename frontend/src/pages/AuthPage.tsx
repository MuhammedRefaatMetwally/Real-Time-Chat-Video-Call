  import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Globe, MessageCircle, Users, Sparkles, Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingDots } from "@/components/ui/loading-dots"
import { Alert, AlertDescription } from "@/components/ui/alert"
import useSignup from "@/hooks/useSignup"
import useLogin from "@/hooks/useLogin"

export function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { signupMutation, error: signupError, isPending: isSignupPending } = useSignup()
  const { loginMutation, error: loginError, isPending: isLoginPending } = useLogin()

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || !password) return

      try {
        await loginMutation({ email, password })
      } catch (error) {
        // Error is handled by the hook
      }
    },
    [email, password, loginMutation],
  )

  const handleSignUp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || !password || !fullName) return

      try {
        await signupMutation({ email, password, fullName })
      } catch (error) {
        // Error is handled by the hook
      }
    },
    [email, password, fullName, signupMutation],
  )

  const features = [
    {
      id: "realtime-chat",
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Instant messaging with native speakers",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "smart-matching",
      icon: Users,
      title: "Smart Matching",
      description: "AI-powered language partner suggestions",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: "video-calls",
      icon: Sparkles,
      title: "Video Calls",
      description: "Face-to-face practice sessions",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-6 py-6 relative z-10 h-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
          {/* Hero Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <Globe className="h-12 w-12 text-primary animate-spin-slow" />
                  <div className="absolute inset-0 h-12 w-12 bg-primary/20 rounded-full animate-ping" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                  LinguaConnect
                </h1>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Master Languages{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Together
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-lg mt-4 leading-relaxed">
                  Connect with native speakers worldwide, practice through video calls, and accelerate your language
                  learning journey with AI-powered matching.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, staggerChildren: 0.1 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center space-x-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>10,000+ Active Learners</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>50+ Languages</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Auth Form */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="w-full max-w-lg shadow-2xl border-0 bg-card/80 backdrop-blur-xl">
              <CardHeader className="text-center space-y-4 pb-6">
                <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
                <CardDescription className="text-base">Join thousands of language learners worldwide</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
                    <TabsTrigger
                      value="signin"
                      className="text-base font-medium"
                      disabled={isLoginPending || isSignupPending}
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="text-base font-medium"
                      disabled={isLoginPending || isSignupPending}
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <TabsContent value="signin" key="signin">
                      <motion.form
                        onSubmit={handleSignIn}
                        className="space-y-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {loginError && (
                          <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {loginError?.response?.data?.message || "Login failed. Please try again."}
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-3">
                          <Label htmlFor="signin-email" className="text-sm font-medium">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="signin-email"
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-12 h-12 text-base focus:ring-2 focus:ring-primary/20"
                              disabled={isLoginPending}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="signin-password" className="text-sm font-medium">
                            Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="signin-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-12 pr-12 h-12 text-base focus:ring-2 focus:ring-primary/20"
                              disabled={isLoginPending}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoginPending}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-medium text-base disabled:opacity-50"
                          disabled={isLoginPending || !email || !password}
                        >
                          {isLoginPending ? (
                            <>
                              <LoadingDots className="mr-2" />
                              Signing in...
                            </>
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </motion.form>
                    </TabsContent>

                    <TabsContent value="signup" key="signup">
                      <motion.form
                        onSubmit={handleSignUp}
                        className="space-y-5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {signupError && (
                          <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {signupError?.response?.data?.message || "Signup failed. Please try again."}
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="signup-fullName" className="text-sm font-medium">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="signup-fullName"
                              type="text"
                              placeholder="Enter your full name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="pl-12 h-12 text-base focus:ring-2 focus:ring-primary/20"
                              disabled={isSignupPending}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-sm font-medium">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-12 h-12 text-base focus:ring-2 focus:ring-primary/20"
                              disabled={isSignupPending}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-sm font-medium">
                            Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-12 pr-12 h-12 text-base focus:ring-2 focus:ring-primary/20"
                              disabled={isSignupPending}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isSignupPending}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-medium text-base disabled:opacity-50"
                          disabled={isSignupPending || !email || !password || !fullName}
                        >
                          {isSignupPending ? (
                            <>
                              <LoadingDots className="mr-2" />
                              Creating account...
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </motion.form>
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>

                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
