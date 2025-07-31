import type React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import NotificationPage from "./pages/NotificationPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import { AuthPage } from "./pages/AuthPage";
import { useUser } from "./hooks/useUser";
import { AppLayout } from "./components/app-layout";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const ErrorFallback = ({ error, retry }: { error: any; retry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
    <div className="text-center space-y-4 max-w-md mx-auto p-6">
      <div className="text-red-500 text-6xl">⚠️</div>
      <h2 className="text-2xl font-bold text-foreground">
        Something went wrong
      </h2>
      <p className="text-muted-foreground">
        {error?.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={retry}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

const ProtectedRoute = ({
  children,
  isAuthenticated,
  user,
  requireOnboarding = false,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: any;
  requireOnboarding?: boolean;
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireOnboarding && user && !user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  if (user && !user.isOnboarded && window.location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({
  children,
  isAuthenticated,
  user,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: any;
}) => {
  if (isAuthenticated && user) {
    if (user.isOnboarded) {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/onboarding" replace />;
    }
  }

  return <>{children}</>;
};

const App = () => {
  const { user, isError, isLoading, isAuthenticated, refreshUser } = useUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorFallback error={isError} retry={refreshUser} />;
  }

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              requireOnboarding={true}
            >
              <AppLayout>
                <HomePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Chat Routes - FIXED TO MATCH NAVIGATION */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              requireOnboarding={true}
            >
              <AppLayout>
                <ChatPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              requireOnboarding={true}
            >
              <AppLayout>
                <ChatPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Call Routes - FIXED TO MATCH NAVIGATION */}
        <Route
          path="/call/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              requireOnboarding={true}
            >
              <AppLayout>
                <CallPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
       

        {/* Profile Route - NEW */}
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              requireOnboarding={true}
            >
              <AppLayout>
                {/* You'll need to create a ProfilePage component */}
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Profile Page</h1>
                  <p className="text-muted-foreground mt-2">Profile page coming soon...</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Notifications Route - FIXED PATH */}
        <Route
          path="/notification"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              requireOnboarding={true}
            >
              <AppLayout>
                <NotificationPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Existing Routes */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <OnBoardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated} user={user}>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute isAuthenticated={isAuthenticated} user={user}>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* Catch-all Route */}
        <Route
          path="*"
          element={
            isAuthenticated && user ? (
              user.isOnboarded ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;