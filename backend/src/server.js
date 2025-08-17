import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT 

app.get("/api/auth/signup ", (req,res) => {
    res.send("signup")
});


app.get("/api/auth/login ", (req,res) => {
    res.send("login")
});

app.get("/api/auth/logout ", (req,res) => {
    res.send("logout")
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
} )