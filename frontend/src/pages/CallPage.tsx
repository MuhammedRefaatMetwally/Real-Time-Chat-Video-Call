import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { getStreamToken } from "@/lib/api/apiService";
import { formatUserForStream } from "@/lib/utils";
import ChatLoader from "@/components/chat-loader";

const CallPage = () => {
  const { id: callId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const clientRef = useRef<StreamVideoClient | null>(null);
  const callRef = useRef<any>(null);
  
  const { user, isLoading: isAuthLoading } = useUser();
  
  const { 
    data: tokenData, 
    isLoading: isTokenLoading, 
    error: tokenError 
  } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!user,
    retry: 2,
  });

  const initializeCall = useCallback(async () => {
    if (!tokenData?.token || !user || !callId) return;
    
    setIsInitializing(true);
    setError(null);
    
    try {
      // Get Stream API key from environment
      const apiKey = import.meta.env.VITE_STREAM_API_KEY;
      if (!apiKey) {
        throw new Error("Stream API key is missing. Please check your environment variables.");
      }
      
      const streamUser = formatUserForStream(user);

      // Create video client
      const videoClient = new StreamVideoClient({
        apiKey,
        user: streamUser,
        token: tokenData.token,
      });

      // Store reference for cleanup
      clientRef.current = videoClient;

      // Create call instance
      const callInstance = videoClient.call("default", callId);
      callRef.current = callInstance;

      // Join the call
      await callInstance.join({ create: true });

      setClient(videoClient);
      setCall(callInstance);
      toast.success("Successfully joined the call!");
      
    } catch (error: any) {
      console.error("Error joining call:", error);
      
      // Clean up any partial initialization
      if (clientRef.current) {
        try {
          await clientRef.current.disconnectUser();
        } catch (cleanupError) {
          console.error("Error during cleanup:", cleanupError);
        }
      }
      
      let errorMessage = "Failed to join the call. Please check your connection and try again.";
      
      if (error.message?.includes("User token is not set")) {
        errorMessage = "Authentication failed. Please log in again and try joining the call.";
      } else if (error.message?.includes("network")) {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.message?.includes("rate limit")) {
        errorMessage = "Too many requests. Please wait a moment.";
      }
      
      setError(errorMessage);
      toast.error("Could not join the call");
    } finally {
      setIsInitializing(false);
    }
  }, [tokenData, user, callId]);

  const handleRetry = useCallback(() => {
    setError(null);
    initializeCall();
  }, [initializeCall]);

  const handleLeaveCall = useCallback(async () => {
    try {
      if (callRef.current) {
        await callRef.current.leave();
      }
      if (clientRef.current) {
        await clientRef.current.disconnectUser();
      }
    } catch (error) {
      console.error("Error leaving call:", error);
    } finally {
      setClient(null);
      setCall(null);
      clientRef.current = null;
      callRef.current = null;
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    initializeCall();
  }, [initializeCall]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callRef.current) {
        callRef.current.leave().catch(console.error);
      }
      if (clientRef.current) {
        clientRef.current.disconnectUser().catch(console.error);
      }
    };
  }, []);

  if (isAuthLoading) {
    return <ChatLoader />;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!callId) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Invalid Call</h2>
          <p className="text-gray-600 mb-4">No call ID provided</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (isTokenLoading || isInitializing) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <ChatLoader />
        <p className="mt-4 text-gray-600">
          {isTokenLoading ? "Getting ready..." : "Joining call..."}
        </p>
      </div>
    );
  }

  if (tokenError) {
    return (
      <ErrorState
        title="Authentication Error"
        message="Unable to authenticate for video call. Please log in again."
        onRetry={handleRetry}
        onGoHome={() => navigate("/")}
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Call Error"
        message={error}
        onRetry={handleRetry}
        onGoHome={handleLeaveCall}
      />
    );
  }

  if (client && call) {
    return (
      <div className="h-screen w-full">
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent onLeave={handleLeaveCall} />
          </StreamCall>
        </StreamVideo>
      </div>
    );
  }

  return <ChatLoader />;
};

const CallContent = ({ onLeave }: { onLeave: () => void }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      onLeave();
    }
  }, [callingState, onLeave]);

  return (
    <StreamTheme className="h-full">
      <div className="relative h-full">
        <SpeakerLayout />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <CallControls />
        </div>
      </div>
    </StreamTheme>
  );
};

const ErrorState = ({ 
  title, 
  message, 
  onRetry, 
  onGoHome 
}: { 
  title: string; 
  message: string; 
  onRetry: () => void; 
  onGoHome: () => void; 
}) => (
  <div className="h-screen flex flex-col items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Try Again
        </button>
        <button
          onClick={onGoHome}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Go Home
        </button>
      </div>
    </div>
  </div>
);

export default CallPage;