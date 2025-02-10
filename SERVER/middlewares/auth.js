
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");


// authentication middleware
exports.auth = async(req,res,next)=>{
// ordering of middleware is place in routes folder 

try {
    //we have to check authentication
    //we have to verify token 
    //extract token 
    const token = req.cookies.token || req.body.token ||  req.header("Authorization").replace("Bearer ","");

    // if token is missing
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token is Missing "
        });
    }

    // verify token 
    try {
        // verification
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        console.log("VERIFYING tOKEN -- decode -->", decode);


        // request madhe token pass karayche mhaje pratyek weles LOgin karaychi garaj nahi padnar 
        // request madhe token la decode kelela data pathavla ahe 
        req.user = decode;

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Token is Invalid "
        })
    };

    next();

} catch (error) {
    return res.status(401).json({
        success:false,
        message:"Something went wrong while validating the "
    })
}
}

//isStudent 
exports.isStudent = async(req,res,next)=>{
    try {
        // fetching role from request and checking the role is student  
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for student"
            })
        }

        next();  // go to next middleware

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified "
        })
    }
}

// isAdmin  
exports.isAdmin = async(req,res,next)=>{
    try {
        // fetching role from request and checking the role is student  
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Admin"
            })
        }

        next();  // go to next middleware

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified "
        })
    }
}

// inInstructor
exports.isInstructor = async(req,res,next)=>{
    try {
        // fetching role from request and checking the role is student  
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Instructor"
            })
        }

        next();  // go to next middleware

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified ! Please try again later  "
        })
    }
}