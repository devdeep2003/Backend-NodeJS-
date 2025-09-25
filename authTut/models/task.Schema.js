import {Schema , model  } from "mongoose";

const taskSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "users",
        required:true
    },
    title : {
        type : String,
        required:true,
        maxLength : 50
    },
    description:{
        type : String,
        required:true,
        maxLength : 500
    }
},{timestamps:true})

const taskModel = model("tasks" , taskSchema);
export default taskModel;