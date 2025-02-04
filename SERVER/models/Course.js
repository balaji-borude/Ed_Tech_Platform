const mongoose= require("mongoose");

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    courseDescription:{
        type:String,
        trim:true,
        required:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    coursecontent:[    // course madhe multiple section yete mhanun array use kela ani Section che refference dile  
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
       }
    ],
    ratingAndReviews:[  
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number,
        required:true,

    },
    thumbnail:{
        type:String,
        required:true
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentEnrolled:[
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
        }
    ]
});

module.exports = mongoose.model("Course", courseSchema)