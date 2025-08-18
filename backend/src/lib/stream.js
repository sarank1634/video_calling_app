import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret) {
    console.log("Stream API key or Secret not found");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) =>{
    try {
        await streamClient.upsertUser([userData])
        return userData
    } catch (error) {
        console.log("Error upserting stream user", error);
    }
}

export const generateToken  = (userId) => {};