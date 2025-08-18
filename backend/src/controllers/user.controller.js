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
        const myId = res.user.id;
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