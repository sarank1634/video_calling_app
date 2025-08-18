import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyFriends } from "../controllers/user.controller.js";
import { sendFriendRequest } from "../controllers/friend.controller.js";

const router = express.Router();

router.post("/", (req, res) => {
    res.json({ message: "User created" });
});

router.use(protectedRoute)

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest)
export default router;