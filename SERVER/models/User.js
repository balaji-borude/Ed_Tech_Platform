const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
     
    },
    accountType:{
        type:String,
        enum:["Admin","Instructor","Student"],
        required:true
    },
    additionalDetail:{
        type:mongoose.Schema.Types.ObjectId,  //is used for referencing another document in a different collection. of mongoDb 
        required:true,
        ref:"profile"
    },
    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    },
    Image:{
        type:String,
        required:true
    },
    courseProgres:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseProgress"
    }


})

module.exports = mongoose.model("User",UserSchema);