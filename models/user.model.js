const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    streak:{type:Number, default:0},
    longestStreak:{type:Number, default:0},
    completedDates:[String],//array of String
},
{ timestamps: true });
module.exports=mongoose.model("User", userSchema);