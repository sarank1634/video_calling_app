import mongoose from "mongoose";
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function sendFriendRequest(req, res) {
  try {
    const senderId = req.user._id;
    const recipientId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(recipientId)) {
      return res.status(400).json({ message: "Invalid recipient id" });
    }

    if (senderId.toString() === recipientId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself" });
    }

    const recipient = await User.findById(recipientId).select("_id friends");
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // Already friends?
    const sender = await User.findById(senderId).select("friends");
    const alreadyFriends = sender?.friends?.some((f) => f.toString() === recipientId) ||
      recipient?.friends?.some((f) => f.toString() === senderId.toString());
    if (alreadyFriends) {
      return res.status(400).json({ message: "Users are already friends" });
    }

    // Existing pending request either direction
    const existing = await FriendRequest.findOne({
      $or: [
        { sender: senderId, recipient: recipientId, status: "pending" },
        { sender: recipientId, recipient: senderId, status: "pending" },
      ],
    });
    if (existing) {
      return res.status(400).json({ message: "A pending friend request already exists" });
    }

    const request = await FriendRequest.create({ sender: senderId, recipient: recipientId });
    return res.status(201).json({ success: true, request });
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
