const Profile = require("../models/Profile");
const User = require("../models/User");


exports.Profile = async(req,res) =>{
    try {
       // data fetch from body  --> data nahi takla tr default empty send kela 
       const{gender,dateOfBirth="",about = "",contactNumber} = req.body;
       
       // get user Id --> token madhe User id send keleli ahe tyatun baher kadhli 
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
       const userDetail = await Profile.findById( );

        const profileId = userDetail.additionalDetail; // profile chi Id find keli ahe 
        const profileDetails = await Profile.findById(profileId);

       //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender = gender;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save(); 

        // Db madhe entry save karayche 2 ways ahe tyaty (1) object nahi banvayche an .create() function use karun entry create keli ahe 
        //(2) object create karun ghetle ahe -->  "await objectName.save()"  method use karun DB madhe Entry create keli ahe 
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
        // account delete sati acc chi  id lagel --> ti Id find keli ahe 
        const id = req.user.id;

        //validation --> (id check sathi Db call karaycha ki user present ahe ka nahi and Db madhe )
        const user = await User.findById({_id:id});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user Not Found "
            })
        };

   // TODO :=> unEnroll user From All enrolled Courses 
   // TODO :=> how can we schedule deltion of accounnt  --> In big company whenever we click on delete account it does not directly deleted it delete after some 4 to 5 day ==> how can we apply this 

   //............... what is -->  CRON job   ---> find / search ................................................

        // use madhe profile pn asel tyla delete kr 
        await Profile.findByIdAndDelete({_id:user.additionalDetail});

        // YETHE kontya variable madhe store kela nahi ki konta data delete hote he jevhaa use karayche tevha aplyala kahi garaj naste ki konta data delete hotoy 
        // 1. Use await Profile.findByIdAndDelete(...) (without storing) when you just need to delete the record.
        // 2.  Use const deleteAcc = await Profile.findByIdAndDelete(...) if you need to verify if deletion was successful or log the deleted document.

        // delete user 
        await User.findByIdAndDelete({_id:id});

     
        // send success response 
        return res.status(200).json({
            success:false,
         message:"user deleted succesfully"
        })
    } catch (error) {
        console.log(error);
		res.status(500).json({ 
            success: false, 
            message: "User Cannot be deleted successfully" });
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
           data:userDetails,
           message:"User data fetched succesfully" 
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            message:"something went wrong while fetching All user data "
        })
    }
}