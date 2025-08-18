import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret) {
    console.log("Stream API key or Secret not found");
}

// Initialize client only if credentials exist
let streamClient = null;
if (apiKey && apiSecret) {
    streamClient = StreamChat.getInstance(apiKey, apiSecret);
}

export const upsertStreamUser = async (userData) =>{
    try {
        if (!streamClient) {
            console.log("Stream client not initialized; skipping upsert.");
            return null;
        }
        // Use the singular upsert for a single user
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.log("Error upserting stream user", error);
    }
}

export const generateStreamToken = (userId) => {
    try {
        if (!streamClient) {
            console.log("Stream client not initialized; cannot create token.");
            return null;
        }
        if (!userId) {
            throw new Error("userId is required to generate a Stream token");
        }
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.log("Error generating stream token", error);
        return null;
    }
}