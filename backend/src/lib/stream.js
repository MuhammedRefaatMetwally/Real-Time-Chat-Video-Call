import StreamChat from "stream-chat";

import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream Api key or secret is missing");
}

const streamClient = "StreamChat.getInstance(apiKey, apiSecret);"

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting stream user:", error);
  }
};

export const generateStreamToken = async (userId) => {
  try{
    const token = streamClient.createToken(userId.toString());
    return token; 
  }catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
