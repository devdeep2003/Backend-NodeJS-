import express from "express";
import userData from "./data.js"

const app = express();

app.use(express.json());

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


//creating new user by the client

app.post("/api/users/create" , (req,res)=>{
    const{name , age , city , role } = req.body;

    const newUser = {
        id : userData[userData.length-1].id + 1,
        name:name,
        age:Number(age),
        city:city,
        role:role
    }

    userData.push(newUser)
    res.status(201).json({
        message:"user created successfully",
        data : newUser
    })
})

//put request to update user details 
app.put("/api/users/updatePUT/:id" , (req,res)=>{
    const parseID = parseInt(req.params.id);
    const updatedUser = req.body;

    const userIdx = userData.findIndex((user)=>user.id === parseID);
    if(userIdx!==-1){
        userData[userIdx] = {id:parseID,...updatedUser}
        res.status(200).json({
        message:"User updated Successfully",
        data :userData[userIdx]
    });
}
    else res.status(404).json({message:"User not found"});
})

//Patch request to update user details

app.patch("/api/users/updatePATCH/:id" , (req,res)=>{
    const id = req.params.id;
    const parseID = parseInt(id);
    const updatedUser = req.body;

    const userIdx = userData.findIndex((user)=>user.id === parseID);
    if(userIdx!==-1){
        userData[userIdx] = {...userData[userIdx],...updatedUser}
        res.status(200).json({
            message:"User updated Successfully",
            data : userData[userIdx]
        })
    }else{
        res.status(404).json({
            message:"User update failed"
        })
    }
})

//delete user
app.delete("/api/users/delete/:id",(req,res)=>{
    const parseID = parseInt(req.params.id);
    const userIdx = userData.findIndex((user)=>user.id === parseID);
    if(userIdx!==-1){
        userData.splice(userIdx,1);

        userData.forEach((user,index)=>{
            user.id = index+1;
        })
        res.status(200).json({
            message:"User Deleted Successfully"
        })
    }else{
        res.status(404).json({
            message:"User Deletion failed"
        })
    }
})



//server listening

app.listen(8080 , (err)=>{
    if(err) console.log("Internal Server Error")
        else console.log("Server running")
})



/*
    Notes for this Express User Management API:

    1. Imports:
        - Uses ES module syntax to import Express and user data from a local file.

    2. Middleware:
        - express.json() parses incoming JSON requests, making req.body available.

    3. Routes:
        - Home Route (GET "/"): Returns a simple "Hello World" message.
        - Get All Users (GET "/api/users"): Returns the entire user list as JSON.
        - Filter Users (GET "/api/users/filter"): 
            > Filters users by age (greater than) and role (case-insensitive) using query parameters.
            > Returns filtered users or a 404 if none found.
        - Get User by ID (GET "/api/users/:id"):
            > Finds a user by their id and returns the user object or a 404 if not found.
        - Create User (POST "/api/users/create"):
            > Accepts user details in the request body.
            > Assigns a new id (last user's id + 1).
            > Adds the new user to the userData array and returns the created user.
        - Update User (PUT "/api/users/updatePUT/:id"):
            > Finds user by id and replaces all fields with those from req.body.
            > Returns updated user or a 404 if not found.
        - Patch User (PATCH "/api/users/updatePATCH/:id"):
            > Finds user by id and updates only provided fields (partial update).
            > Returns updated user or a 404 if not found.
        - Delete User (DELETE "/api/users/delete/:id"):
            > Finds user by id and removes them from the array.
            > After deletion, reassigns all user ids to keep them sequential.
            > Returns success message or a 404 if not found.

    4. Server:
        - Listens on port 8080 and logs status to the console.

    5. Data Handling:
        - All user operations are performed in-memory on the userData array.
        - No persistent storage; changes are lost when the server restarts.

    6. Error Handling:
        - Returns appropriate HTTP status codes (200, 201, 404) and messages for success or failure.

    7. Usage:
        - Designed for basic CRUD operations on user data.
        - Demonstrates RESTful API principles with Express.

    8. Best Practices:
        - Uses spread syntax for updating and creating users.
        - Ensures user ids remain sequential after deletions.
        - Handles both full (PUT) and partial (PATCH) updates.

    9. Limitations:
        - No validation for input data.
        - No authentication or authorization.
        - Data is not persisted to a database or file.

    10. Extensibility:
        - Can be extended to add validation, persistent storage, and security features as needed.
*/