import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req,res) {

    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

         const recommenedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: (currentUser.friends || []) } },
                {isOnboarding: true}
            ]
         })
          res.status(200).json(recommenedUsers);
    } catch (error) {
        console.error("Error in the getRecommendedUsers controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getMyFriends(req,res) {
    try {
        const user = await User.findById(req.user._id)
          .select("friends")
          .populate("friends", "fullName profilePicture nativeLanguage learningLanguage");

        res.status(200).json(user?.friends || []);
    } catch(error) {
        console.error("Error in the getMyFriends controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function sendFriendRequest(req,res) {

    try {
        const myId = req.user._id;
        const { id: recipientId } = req.params;

        //prevent sending req to your self
        if(myId === recipientId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }
        const recepient = await User.findById(recipientId);
        if(!recepient) {
            return res.status(404).json({ message: "Recipient not found" });
        }
       
        // check if user is already friends
        if(recepient.friends.includes(myId)){
            return res.status(400).json({ message: "You are already friends" });
        }
   
        // check if  user is already friends
        const existingRequest = await FriendRequest.findOne({
            $or: [
                  {sender:myId, recipient:recipientId},
                  {sender:recipientId, recipient:myId}
            ]
        })
        if(existingRequest){
            return res 
            .status(400)
            .json({ message: "A friend request already exists between you and this user"})
        }
         const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
         })
         res.status(201).json({success:true, friendRequest})
    } catch (error) {
        console.error("Error in the sendFriendRequest controller", error)
        res.status(500).json({ message: "Internal server error" })
    }

}

export async function acceptFriendRequest(req, res) {
    try {
        const userId = req.user._id;
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        // verify thecurrent user is the recipient
        if (friendRequest.recipient.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You can only accept friend requests sent to you" });
        }

        if (friendRequest.status === "accepted") {
            return res.status(400).json({ message: "Friend request already accepted" });
        }

        // Update request status
        friendRequest.status = "accepted";
        await friendRequest.save();

        // Add each user to the other's friends list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({ success: true, message: "Friend request accepted" });
    } catch (error) {
        console.error("Error in acceptFriendRequest controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getFriendRequests(req,res){
    try {
        const incomingReq = await FriendRequest.find({
            recipient: req.user._id,
            status: "pending",
        }).populate("sender", "fullName profilePicture nativeLanguage learningLanguage");
        
        res.status(200).json(incomingReq);
    } catch (error) {
        console.log("Error in the  getPendingFriendRequests controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

export async function getOutgoingFriendRequests(req,res) {
    try {
        const outgoingReq = await FriendRequest.find({
            sender: req.user._id,
            status: "pending",
        }).populate("recipient", "fullName profilePicture nativeLanguage learningLanguage");
        res.status(200).json(outgoingReq);
    } catch (error) {
        console.log("Error in the getOutgoingFriendRequests controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function rejectFriendRequest(req,res){
    try {
        const { id: requestId } = req.params;
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }
        if (friendRequest.recipient.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only reject friend requests sent to you" });
        }
        friendRequest.status = "rejected";
        await friendRequest.save();
        res.status(200).json({ success: true, message: "Friend request rejected" });
    } catch (error) {
        console.log("Error in rejectFriendRequest controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}