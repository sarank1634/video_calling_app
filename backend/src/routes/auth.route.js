import express from "express";

const router = express.Router();

router.get("/signup", (req,res) => {
    res.send("Signup Router")
})

router.get("/login", (req,res) => {
    res.send("Login Router")
})

router.get("/logout", (req,res) => {
    res.send("Logout Router")
})

export default router;