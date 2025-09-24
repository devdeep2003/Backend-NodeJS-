import express from 'express';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js';

const app = express();
app.use(express.json());

//connect to database
connectDB();

//routes middleware
app.use("/api" , userRoute);

//listen the server
app.listen(3000 , ()=>{
    console.log("Server is running at port 3000");
})