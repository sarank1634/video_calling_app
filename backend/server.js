import express from "express";

const app = express();


app.get("/", (req,res) => {
    res.send("hello")
});

app.listen(5001, () => {
    console.log("server is running onport 5001");
} )