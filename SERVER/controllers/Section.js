const Section = require("../models/Section");  // section cha instace Ghetla 

const Course = require("../models/Course"); // aplya course madhe subsection chi ID store keli ahe na (check --> course-model)  tyasathi Courses la import kela 

// create section
exports.createSection = async(req,res)=>{
    try {
        // get data from req. body 
        const{sectionName,courseId} = req.body;

        console.log("createSection controller--> courseId =", courseId)

        // validate data 
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All Field are Required "
            })
        };

        // create section 
        const newSection = await Section.create({sectionName});  // yete DB madhe New Secction create kele 

        //console.log("print newSection" ,newSection)

        // Update course with section ObjectId 
              // course chya sechma madhe new Section create kela tyachi id passs karaychi ahe 
              console.log("updatedCoursedetail -<->");

		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
        console.log("updatedCoursedetail Db interaction -->",updatedCourse)

        // TODO :-- use Populate to replcae section and subsection both in in the updated Course detail .----->>  H.W 

        // return resspone
        return res.status(200).json({
            success:true,
            message:"Section Created succesfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Section Creation "
        });

    };
};

// update the section 
exports.updateSection = async(req,res)=>{
    try {
        //data input 
        const{sectionName,sectionId} = req.body;

        //data validation 
        if(!sectionName){
            return res.status(400).json({
                success:false,
                message:"All Field are Required "
            })
        }
        // update data
        const updateSection = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})

        // return res
        return res.status(200).json({
            success:true,
            message:"Section Updated succesfully",
            message:updateSection   // check at time of api testing is this possible 
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error updating section "
        });

    }
};

// delete section
exports.deleteSection = async(req,res)=>{
    try {
        //get ID --> assuming that we are sending ID in params

        const {sectionId} = req.params;
        // TODO:--> do we need to delete the entry from the course schema -->  he aplyla testing chya weles sanjel 
        //delete section 
        const deletedSection = await Section.findByIdAndDelete(sectionId);

        // return res
        return res.status(200).json({
              success:true,
            message:"Section Deleted succesfully"
        })

    } catch (error) {
        console.log("Error deleting Section ", error);
        
        return res.status(500).json({
            success:false,
            message:"Error in Section Creation "
        });
    }
}