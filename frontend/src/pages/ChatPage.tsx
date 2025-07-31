import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import CallButton from "../components/CallButton";
import { 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  MapPin,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { getStreamToken } from "@/lib/api/apiService";
import ChatLoader from "@/components/chat-loader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [showThread, setShowThread] = useState(false);

  const { user } = useUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!user,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !user) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: user._id,
            name: user.fullName,
            image: user.profilePic,
          },
          tokenData.token
        );

        const channelId = [user._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [user._id, targetUserId],
        });

        await currChannel.watch();

        // Listen for online status
        const handlePresenceChange = () => {
          const targetUser = Object.values(currChannel.state.members).find(
            member => member.user_id === targetUserId
          );
          setIsOnline(targetUser?.user?.online || false);
        };
        
        client.on('user.presence.changed', handlePresenceChange);
        handlePresenceChange();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, user, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  const handleVoiceCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}?audio=true`;
      channel.sendMessage({
        text: `I've started a voice call. Join me here: ${callUrl}`,
      });
      toast.success("Voice call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="chat-page-wrapper">
      <style jsx>{`
        .chat-page-wrapper {
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .chat-container {
          width: 100%;
          max-width: 1200px;
          height: 85vh;
          background: white;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Override Stream Chat default styles */
        :global(.str-chat__channel) {
          height: 100% !important;
          background: transparent !important;
        }

        :global(.str-chat__container) {
          height: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          background: transparent !important;
        }

        :global(.str-chat__list) {
          background: linear-gradient(to bottom, #f8fafc, #f1f5f9) !important;
          padding: 0 !important;
          height: 100% !important;
        }

        :global(.str-chat__list-notifications) {
          display: none !important;
        }

        :global(.str-chat__message-list-scroll) {
          background: transparent !important;
          padding: 20px !important;
        }

        :global(.str-chat__message-input) {
          background: white !important;
          border: none !important;
          border-top: 1px solid #e2e8f0 !important;
          padding: 20px !important;
        }

        :global(.str-chat__message-input-inner) {
          background: #f8fafc !important;
          border: 2px solid #e2e8f0 !important;
          border-radius: 25px !important;
          padding: 12px 20px !important;
          transition: all 0.2s ease !important;
        }

        :global(.str-chat__message-input-inner:focus-within) {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }

        :global(.str-chat__message-textarea) {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          resize: none !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
        }

        :global(.str-chat__send-button) {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          border: none !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.2s ease !important;
        }

        :global(.str-chat__send-button:hover) {
          transform: scale(1.05) !important;
          background: linear-gradient(135deg, #1d4ed8, #1e40af) !important;
        }

        :global(.str-chat__message-simple) {
          margin-bottom: 16px !important;
        }

        :global(.str-chat__message-text) {
          background: white !important;
          border-radius: 18px !important;
          padding: 12px 16px !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          max-width: 70% !important;
        }

        :global(.str-chat__message--me .str-chat__message-text) {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          color: white !important;
        }

        :global(.str-chat__thread) {
          background: #f8fafc !important;
          border-left: 1px solid #e2e8f0 !important;
        }

        :global(.str-chat__thread-header) {
          background: white !important;
          border-bottom: 1px solid #e2e8f0 !important;
        }

        .custom-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 20px 20px 0 0;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-avatar {
          position: relative;
        }

        .online-indicator {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 16px;
          height: 16px;
          background: #10b981;
          border: 3px solid white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .thread-panel {
          width: 350px;
          background: #f8fafc;
          border-left: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .thread-panel.hidden {
          width: 0;
          overflow: hidden;
        }

        .main-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .chat-content {
          display: flex;
          height: 100%;
        }

        @media (max-width: 768px) {
          .chat-page-wrapper {
            padding: 0;
            height: 100vh;
          }
          
          .chat-container {
            border-radius: 0;
            height: 100vh;
          }
          
          .custom-header {
            border-radius: 0;
            padding: 15px 20px;
          }
          
          .thread-panel {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            z-index: 10;
            width: 100%;
            max-width: 350px;
          }
        }
      `}</style>

      <div className="chat-container">
        <Chat client={chatClient} theme="messaging light">
          <Channel channel={channel}>
            {/* Custom Header */}
            <div className="custom-header">
              <div className="user-info">
                <button 
                  onClick={() => window.history.back()}
                  className="action-btn md:hidden"
                >
                  <ArrowLeft size={20} />
                </button>
                
                <div className="user-avatar">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src="/default-avatar.png"
                      alt="User"
                      onError={(e) => {
                        e.currentTarget.src = '/default-avatar.png';
                      }}
                    />
                    <AvatarFallback className="bg-white/20 text-white font-semibold">
                      U
                    </AvatarFallback>
                  </Avatar>
                  {isOnline && <div className="online-indicator" />}
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">Chat Partner</h3>
                  <p className="text-white/80 text-sm">
                    {isOnline ? 'Online now' : 'Last seen recently'}
                  </p>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  onClick={handleVoiceCall}
                  className="action-btn"
                  title="Voice Call"
                >
                  <Phone size={20} />
                </button>
                
                <button
                  onClick={handleVideoCall}
                  className="action-btn"
                  title="Video Call"
                >
                  <Video size={20} />
                </button>
                
                <button
                  onClick={() => setShowThread(!showThread)}
                  className="action-btn"
                  title="Thread Info"
                >
                  <Info size={20} />
                </button>
                
                <button className="action-btn">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="chat-content">
              {/* Main Chat */}
              <div className="main-chat">
                <MessageList />
                <MessageInput 
                  focus
                  SendButton={() => (
                    <button type="submit" className="str-chat__send-button">
                      <Send size={18} />
                    </button>
                  )}
                />
              </div>

              {/* Thread Panel */}
              {showThread && (
                <div className="thread-panel">
                  <div className="p-6 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900">Thread Info</h4>
                      <button
                        onClick={() => setShowThread(false)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ArrowLeft size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Chat details & settings</p>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <Thread />
                  </div>
                </div>
              )}
            </div>
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

export default ChatPage;