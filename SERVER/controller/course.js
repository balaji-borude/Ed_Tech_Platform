const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");

// cloudinary la import kela
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// create courses
exports.createCourse = async(req,res)=>{
    try {
        // data fetch 
        const{courseName,courseDescription,whatYouWillLearn,price,tag,categoery} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage; 
        // validation 
        if(!courseName|| !courseDescription || !whatYouWillLearn || !price || !tag ||!categoery ){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        }
        // course is only created only by Instructor (instructor validation);
        //  --> intructor chi object_id pahije na course madhe mhanun -->
        const userId = req.user.id;  // instructor chi detail kadhli
        const instructorDetail = await User.findById({userId});

        console.log("DB madhun indtructor detail kadhla --> ", instructorDetail)

        if(!instructorDetail){
            return res.status(404).json({
                success:false,
                message:"Instructor detail is Not found"
            })
        };
        // tag validation  --> tag jr input madhe ala to check karaycha --> postmon sati jr drop-down menu use kela asel tr correct yeil 
        const tagDetail = await Tag.findById({tag});
        if(!tagDetail){
            return res.status(404).json({
                success:false,
                message:"Instructor detail is Not found"
            })
        }
        // thumbanail image send to cloudinary 
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME); 
        // create cousrse entry in DB for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetail._id, // instructor chya ID sathi wari DB call kela ahe 
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetail._id,  // apan yete fakt tag hi pathvu shakto karan tyat pn id ahe Tag chi
            thumbnail:thumbnailImage.secure_url,
        });

        // add the new couse to the user schema of instrutor 
        // user chi ji course list ahe tyat ha couse taknyasathi --> he kelay --> user ha instructor ahe   
        await User.findByIdAndUpdate(
            {_id:instructorDetail._id },
            {
                $push:{
                    courses: newCourse._id  // courses walya  array madhe newCours chi id send keli  
                }
            },
            {new:true},  // for updated response 
            
        );

        // update the tag schema 
        await Tag.findByIdAndUpdate(
            tagDetail._id,
            { 
                $push: { courses: newCourse._id } }, // Add course ID to the tag
            { new: true }
        );
        // return response
        return res.status(200).json({
            success:true,
            message:"course created Succesfully",
            data:newCourse
        });

    } catch (error) {
        console.log("Error in course creation", error)
        return res.status(500).json({
            success:false,
            message:"Failed to create to course",
            error:error.message
        })
    }
};


// get all courses 

exports.showAllCourses =async(req,res)=>{
    try {
        
        // find all courses 
        // we can only do --> const allCourses = await Course.find({})
        // TODO --> we can change below statment incrementlly-->ydzvi DB call   
        const allCourses = await Course.find({},{
                                        courseName:true,
                                        price:true,
                                        thumbnail:true,
                                        instructor:true,
                                        ratingAndReviews:true,
                                        studentEnrolled:true,
                                     })
                                     .populate("instructor")
                                     .exec();
        return res.staus(200).json({
            success:true,
            message:"Data of all courses fetched succesfully",
            data:allCourses
        })

                                    
    } catch (error) {
        console.log("Error in course creation", error)
        return res.status(500).json({
            success:false,
            message:"Failed to create to course",
            error:error.message
        }) 
    }
}