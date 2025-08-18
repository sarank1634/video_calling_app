import express from "express";
import { signup, login, logout, onboarding } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup )
router.post("/login", login)
router.post("/logout", logout)
 
router.post("/onboarding",protectedRoute, onboarding)

//chech is user is logged in or not
router.get("/me", protectedRoute, (req,res) => {
    res.status(200).json({success: true, user: req.user})
})
export default router;