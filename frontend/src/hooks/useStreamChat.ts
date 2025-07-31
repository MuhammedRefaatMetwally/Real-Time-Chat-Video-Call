import { useState, useEffect, useCallback, useRef } from 'react';
import { StreamChat } from 'stream-chat';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '@/lib/api/apiService';
import { useUser } from './useUser';
import { validateStreamConfig, createChannelId, formatUserForStream, handleStreamError } from '@/lib/utils';
import toast from 'react-hot-toast';

export const useStreamChat = (targetUserId: string) => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [isUserConnected, setIsUserConnected] = useState(false);
  const { user } = useUser();
  const cleanupRef = useRef<(() => void) | null>(null);
  const clientRef = useRef<StreamChat | null>(null);

  const { data: tokenData, error: tokenError, isLoading: tokenLoading } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!user,
    retry: 3,
    retryDelay: 1000,
  });

  const handlePresenceChange = useCallback(() => {
    if (!channel) return;
    
    const targetUser = Object.values(channel.state.members).find(
      (member: any) => member.user_id === targetUserId
    );
    setIsOnline(targetUser?.user?.online || false);
  }, [channel, targetUserId]);

  const cleanup = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);

  // Step 1: Initialize client and connect user
  useEffect(() => {
    // Don't initialize if we're still loading the token or if user/targetUserId is missing
    if (tokenLoading || !user || !targetUserId) {
      setLoading(true);
      return;
    }

    try {
      validateStreamConfig();
    } catch (error: any) {
      console.error("Stream configuration error:", error);
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (tokenError) {
      console.error("Failed to fetch stream token:", tokenError);
      const errorMessage = handleStreamError(tokenError);
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    // Don't proceed if we don't have a token
    if (!tokenData?.token) {
      setLoading(false);
      return;
    }

    const initUserConnection = async () => {
      try {
        console.log("Step 1: Initializing stream chat client...");
        const apiKey = validateStreamConfig();
        
        // Create new client instance
        const client = StreamChat.getInstance(apiKey);
        clientRef.current = client;
        
        const streamUser = formatUserForStream(user);
        
        // Connect user first
        await client.connectUser(streamUser, tokenData.token);
        console.log("✅ User connected successfully");
        
        setIsUserConnected(true);
        setChatClient(client);

        // Set up cleanup function
        cleanupRef.current = () => {
          if (client) {
            client.off('user.presence.changed', handlePresenceChange);
            client.disconnectUser();
          }
        };
      } catch (error: any) {
        console.error("Error connecting user:", error);
        const errorMessage = handleStreamError(error);
        toast.error(errorMessage);
        
        // Clean up any partial initialization
        if (clientRef.current) {
          try {
            clientRef.current.disconnectUser();
          } catch (cleanupError) {
            console.error("Error during cleanup:", cleanupError);
          }
        }
        setLoading(false);
      }
    };
    
    initUserConnection();
  }, [tokenData, user, targetUserId, tokenError, tokenLoading, handlePresenceChange]);

  // Step 2: Create channel after user is connected
  useEffect(() => {
    if (!isUserConnected || !chatClient || !targetUserId) {
      return;
    }

    const createChannel = async () => {
      try {
        console.log("Step 2: Creating channel...");
        
        // Small delay to ensure user connection is fully established
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create a unique channel ID
        const channelId = createChannelId(user._id, targetUserId);
        const currChannel = chatClient.channel("messaging", channelId, {
          members: [user._id, targetUserId],
          name: `Chat with ${targetUserId}`,
        });
        
        // Watch the channel
        await currChannel.watch();
        console.log("✅ Channel watched successfully");
        
        // Set up presence listener
        chatClient.on('user.presence.changed', handlePresenceChange);
        
        // Initial presence check
        handlePresenceChange();
        
        setChannel(currChannel);
        setLoading(false);
        
        console.log("✅ Chat fully initialized");
      } catch (error: any) {
        console.error("Error creating channel:", error);
        const errorMessage = handleStreamError(error);
        toast.error(errorMessage);
        setLoading(false);
      }
    };
    
    createChannel();
  }, [isUserConnected, chatClient, targetUserId, user._id, handlePresenceChange]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    chatClient,
    channel,
    loading: loading || tokenLoading,
    isOnline,
    error: tokenError,
  };
}; 