import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());

app.use(
  session({
    secret: process.env.MY_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 10,
    },
  })
);

app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

//DB config
try {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.log(`Error : ${error.message}`);
}
