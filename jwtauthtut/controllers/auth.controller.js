import UserDB from "../models/user.schema.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";

//Maintainable Tips
//The hash and the compare hash password used here are in the utils folder

//Register Controller for registering a user
export const registerController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check either user already exists
    const user = await UserDB.findOne({ username });
    if (user) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    //if no user , hash the password and register the user in the DB
    const hashedPassword = await hashPassword(password);
    const newUser = new UserDB({ username, password: hashedPassword });
    await newUser.save();

    res.json({
      success: true,
      message: "User created",
      data: newUser,
    });
  } catch (error) {
    return res.json({
      sucess: false,
      message: error.message,
    });
  }
};

//Login Controller for logging in a user
export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    //check whether the user exists
    const user = await UserDB.findOne({ username });
    if (!user) {
      return res.json({
        success: false,
        message: "User Not found",
      });
    }

    //if user exists , compare the password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Wrong credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );

    res.setHeader("Authorization" , token);

    return res.json({
      success: true,
      message: "user logged in successfully",
      data: user,
      JWTtoken: token,
    });
  } catch (error) {
    return res.json({
      sucess: false,
      message: error.message,
    });
  }
};
