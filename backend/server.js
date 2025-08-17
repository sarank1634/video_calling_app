import express from "express";

const app = express();


app.get("/api/auth/signup ", (req,res) => {
    res.send("signup")
});


app.get("/api/auth/login ", (req,res) => {
    res.send("login")
});

app.get("/api/auth/logout ", (req,res) => {
    res.send("logout")
});

app.listen(5001, () => {
    console.log("server is running onport 5001");
} )