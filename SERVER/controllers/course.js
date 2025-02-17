const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

// cloudinary la import kela
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// create courses
exports.createCourse = async(req,res)=>{
    try {

        // get user Id from request object 
         const userId = req.user.id;  // instructor chi detail kadhli

        // get all required field from request body 
        let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

        // Get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage; 

        // validation 
        if(!courseName|| !courseDescription || !whatYouWillLearn || !price || !tag || !category || !status || !instructions ){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        };

        if (!status || status === undefined) {
			status = "Draft";
		}

        // course is only created only by Instructor (instructor validation);
        //  --> intructor chi object_id pahije na course madhe mhanun -->

   

        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId,
            {
                accountType: "Instructor",
            }
        );

        console.log("DB madhun indtructor detail kadhla --> ", instructorDetails)

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor detail is Not found"
            })
        };
        // tag validation  --> tag jr input madhe ala to check karaycha --> postmon sati jr drop-down menu use kela asel tr correct yeil 
 
        // Check if the tag given is valid
		const categoryDetails = await Category.findById(category);

		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}

        // thumbanail image send to cloudinary 
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME); 

        // create cousrse entry in DB for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id, // instructor chya ID sathi wari DB call kela ahe 
            whatYouWillLearn:whatYouWillLearn,
            price,
            category: categoryDetails._id,  // apan yete fakt tag hi pathvu shakto karan tyat pn id ahe Tag chi
            thumbnail:thumbnailImage.secure_url,
            status: status,
			instructions: instructions,
        });

        console.log("New Course create succesfully -->",newCourse);


        // add the new couse to the user schema of instrutor 
        // user chi ji course list ahe tyat ha couse taknyasathi --> he kelay --> user ha instructor ahe   
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id },
            {
                $push:{
                    courses: newCourse._id  // courses walya  array madhe newCours chi id send keli  
                }
            },
            {new:true},  // for updated response 
            
        );

        // update the tag schema 
        await Category.findByIdAndUpdate(
            categoryDetails._id,
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
exports.getAllCourses =async(req,res)=>{
    try {
        
        // find all courses 
        // we can only do --> const allCourses = await Course.find({})
        // TODO --> we can change below statment incrementlly-->ydzvi DB call   
        const allCourses = await Course.find(
                                        {},
                                     {
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
        console.log("Error in sh0wing all courses", error)
        return res.status(500).json({
            success:false,
            message:"Error in sh0wing all courses",
            error:error.message
        }) 
    }
};

// getcourseDetail

exports.getCourseDetails = async (req,res)=>{
    try {
        // get id 
        const {courseId} = req.body;

        // find course deatils 
        const courseDetails = await Course.find({_id:courseId}).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails"
                }
            }
        ).populate("category")
        .populate("ratingAndReviews")
        .populate(
            {
              path:"courseContent",
              populate:{
                path:"subSection"
              }  
            }
        ).exec();
        // validation 
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`would not found the course with ${courseId}`
            })
        };

        // success response 
        return res.status(200).json({
            success:true,
            message:"course detailed Fetched Succesfully ",
            courseDetails
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

