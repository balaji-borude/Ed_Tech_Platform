const mongoose = require("mongoose");
require("dotenv").config();
const mongoDbUrl= process.env.MONGODB_URL;

exports.connect =()=>{
    mongoose.connect(mongoDbUrl)
    .then(()=>{
        console.log("Database connect succesfully")

    })
    .catch((error)=>{
        console.log(error)
        console.log("Error in Db connection ");
        process.exit(1);
    })
}