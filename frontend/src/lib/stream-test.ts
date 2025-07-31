import { StreamChat } from 'stream-chat';
import { validateStreamConfig, formatUserForStream } from './utils';

export const testStreamConnection = async (user: any, token: string) => {
  try {
    console.log("Testing Stream connection...");
    
    // Validate configuration
    const apiKey = validateStreamConfig();
    console.log("✅ API key is configured");
    
    // Test client creation
    const client = StreamChat.getInstance(apiKey);
    console.log("✅ Stream client created");
    
    // Test user connection
    const streamUser = formatUserForStream(user);
    await client.connectUser(streamUser, token);
    console.log("✅ User connected successfully");
    
    // Test channel creation
    const testChannel = client.channel("messaging", "test-channel", {
      members: [user._id],
      name: "Test Channel",
    });
    console.log("✅ Channel created successfully");
    
    // Cleanup
    await client.disconnectUser();
    console.log("✅ Connection test completed successfully");
    
    return { success: true, message: "Stream connection test passed" };
  } catch (error: any) {
    console.error("❌ Stream connection test failed:", error);
    return { 
      success: false, 
      message: error.message || "Unknown error occurred" 
    };
  }
};

export const validateStreamSetup = () => {
  const issues: string[] = [];
  
  // Check environment variable
  if (!import.meta.env.VITE_STREAM_API_KEY) {
    issues.push("VITE_STREAM_API_KEY environment variable is missing");
  }
  
  // Check if Stream packages are installed
  try {
    require('stream-chat');
    require('stream-chat-react');
  } catch (error) {
    issues.push("Stream Chat packages are not installed");
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
}; 