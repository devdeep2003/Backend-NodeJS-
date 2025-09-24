import { Router } from "express";
import User from "../models/user.Schema.js";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/user.controller.js";

const router = Router();

//get users
router.get("/users",getAllUsers);

//create user
router.post("/create-user", createUser);

//update user
router.put("/update-user/:id", updateUser);

//delete user
router.delete("/delete-user/:id", deleteUser);

export default router;
