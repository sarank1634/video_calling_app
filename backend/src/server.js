import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from './routes/auth.route.js'
import userRoutes from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(
    cors({
    orgin: "http://localhost:5173",
    credentials: true
})
);


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRouter);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectDB();
    console.log("Stream client initialized");
    // console.log("API Key", process.env.STREAM_API_KEY);
    // console.log("API Secret", process.env.STREAM_API_SECRET);
} )