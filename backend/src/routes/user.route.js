import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyFriends } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", (req, res) => {
    res.json({ message: "User created" });
});

router.use(protectedRoute)

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);


export default router;