import User from "../models/user.Schema.js";



//Get all users
export const getAllUsers =  async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//Create a user
export const createUser = async (req, res) => {
  const { name, age, rank } = req.body;
  try {
    const user = await User.create({ name, age, rank });
    res.status(201).json({
      success: true,
      data: user,
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


//Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  // const parseId = parseInt(id);
  const updatedUser = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}



//Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  // const parseId = parseInt(id);
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
