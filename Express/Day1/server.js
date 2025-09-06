import express from "express";
import userData from "./data.js"

const app = express();

//Home route
app.get("/" , (req,res)=>{
    res.status(200).send("Hello World");
})


//all users
app.get("/api/users" , (req,res)=>{
    res.status(200).json(userData);
})

//users filtered according to greater than the age given in the query parameter
app.get("/api/users/filter", (req, res) => {
    const  {age,role}  = req.query;
    const parsedAge = parseInt(age, 10);
    // Apply filters
    let users = userData.filter((user) => user.age > parsedAge).filter((user)=> user.role.toLowerCase() === role.toLowerCase());

    if (users.length > 0) {
        res.status(200).json(users);
    } else {
        res.status(404).send("No users found");
    }
});


//users found according to id
app.get("/api/users/:id" , (req,res)=>{
    const parsedID = parseInt(req.params.id);
    
    const users = userData.find((user)=>user.id === parsedID);
    if(users) res.status(200).json(users);
    else res.status(404).send("userNotFound");
})



//server listening

app.listen(8080 , (err)=>{
    if(err) console.log("Internal Server Error")
        else console.log("Server running")
})