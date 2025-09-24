import {Schema , model } from 'mongoose';

const userSchema = new Schema ({
    name : {
        type : String,
        required : true,
        maxLength : 50
    },
    age : {
        type : Number,
        requried: true
    },
    rank : {
        type : Number,
        required : true,
        maxLength : 2
    },
    CreatedAT : {
        type : Date,
        default : Date.now
    }
})


const User =  model("Users" , userSchema);
export default User;