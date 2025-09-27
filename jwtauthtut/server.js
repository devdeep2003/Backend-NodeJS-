import express from 'express';
import authRoutes from './routes/auth.route.js';
import connectDB from './config/db.js';
import privateRoutes from './routes/private.route.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use('/api/auth' , authRoutes)
app.use('/api/private' , privateRoutes)


//Home route
app.get('/' , (req,res)=>{
    res.send("Hello World");
})


//listen if DB connected
try {
    connectDB();
    app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})
} catch (error) {
    console.log("Error running the server")
}
