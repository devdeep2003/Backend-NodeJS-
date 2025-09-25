import bcrypt from "bcrypt";
import userModel from "../models/user.Schema.js";

//registering user
export const registerUser = async(req,res)=>{
     const {username , password} = req.body;
     try {
        //checking if user exists
        const user = await userModel.findOne({username});
        if(user){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create the user with storing the hashed password in the DB
        const newUser = await userModel.create({username , password : hashedPassword});
        res.status(201).json({
            success : true,
            data : newUser,
            message : "User created successfully"
        })

     } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
     }
}


//logging in the user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // find user
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Username or Password or user does not exist",
      });
    }

    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Username or Password or user does not exist",
      });
    }

    // set session
    req.session.user = user._id;

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Login error:", error); // 👈 log the exact error
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
