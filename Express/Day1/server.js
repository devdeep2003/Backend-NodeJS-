import express from "express";
import userData from "./data.js"

const app = express();

app.get("/" , (req,res)=>{
    res.status(200).send("Hello World");
})

app.get("/api/users" , (req,res)=>{
    res.status(200).json(userData);
})

app.listen(8080 , (err)=>{
    if(err) console.log("Internal Server Error")
        else console.log("Server running")
})