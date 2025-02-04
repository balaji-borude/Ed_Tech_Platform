const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URL= process.env.MONGODB_URL;

exports.connect =()=>{
    mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log("Database connect succesfully")

    })
    .catch((error)=>{
        console.log(error)
        console.log("Error in Db connection ");
        process.exit(1);
    })
}