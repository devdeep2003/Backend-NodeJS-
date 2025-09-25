import {Schema , model } from "mongoose";

const userSchema = new Schema({
    username : {
        type : String,
        required:true,
        maxLength : 50
    },
    password : {
        type : String,
        required:true,
        maxLength : 100
    }
},{timestamps:true})

const userModel = model("users" , userSchema);
export default userModel;

