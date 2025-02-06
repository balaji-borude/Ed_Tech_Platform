const Profile = require("../models/Profile");
const User = require("../models/User");


exports.Profile = async(req,res) =>{
    try {
       // data fetch from body
       const{gender,dateOfBirth="",about = "",contactNumber} = req.body;
       
       // get user Id 
       const id = req.user.Id;

       // validation 
        if( !gender || !dateOfBirth || !about || contactNumber){
            return res.status(400).json({
                success:false,
                message:"Please fill all the deatils "
            })
        }
       // apan profile banavleli ahe tyamule 
       // profile la find kera
       const userDetail = await Profile.findById(id);

        const profileId = userDetail.additionalDetail;
        const profileDetails = await Profile.findById(profileId);

       //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender = gender;
        profileDetails.contactNumber=contactNumber;
        await profileDetails.save(); 

        // Db madhe entry save karayche 2 ways ahe tyaty (1) object nahi banvayche an .create() functionuse karun entry create keli ahe 
        //(2) object create karun ghetle ahe await objectName.save() method use karun DB madhe Entry create keli ahe 
        // yethe 2 way use zala ahe 


       // reurn response
       return res.status(200).json({
        success:true,
        message:"Profile Updated SuccessFully",
        profileDetails
       })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error occur in Profile updation "
        })
    }
};

// delete account handler 
exports.deleteAccount = async(req,res)=>{
    try { 
        // account delete sati acc chi  id lagel 

        const id = req.user.id;

        //validation --> (id check sathi Db call karaycha ki user present ahe ka nahi and Db madhe )
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user Not Found "
            })
        };

   // TODO :=> unEnroll user From All enrolled Courses 
   // TODO :=> how can we schedule deltion of accounnt  

   // what is -->  CRON job   ---> find / search 

        // use madhe profile pn asel tyla delete kr 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetail})
        // delete user 
        await User.findByIdAndDelete({_id:id});

     
        // response sed kro 
        return res.status(200).json({
            success:false,
         message:"user deleted succesfully"
        })
    } catch (error) {
        
    }
};


//AAdditional 

// get user detail 

exports.getAllUserDetails = async(req,res)=>{
    try {
        // get id 
        const id = req.body.id;

        // validation and get user detail 
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // aplyala userDetail madhe sarv detail nahi bhetaych i jase ki gender,dateOfBirtt, about , phone number --> ya  field sathi additional deatal nava che ek field ahe User model chya model madhe tyla Populate keaya and Query .execu() method use karun execute krt ahe 

        // return response 
        return res.status(200).json({
           success:true,
           message:"User data fetched succesfully" 
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something went wrong while fetching All user data "
        })
    }
}