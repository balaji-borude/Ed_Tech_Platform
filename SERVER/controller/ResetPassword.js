const User = require("../models/User");

const mailSender = require("../utils/mailSender");

exports.resetPasswordToken = async (req,res) => {
   try {
     // get email from req body 
     const email = req.body.email;

     // check user for this email address
     const user = await User.findOne({email});
 
     if(!user){
         return res.json({
             success:false,
             message:"Your email is not registered with us "
         })
     }
     // generete token 
     const token = crypto.randomUUID();
 
     // update user by adding and expiration time 
     const updateDetails = await User.findOneAndUpdate({email:email},{
         token : token,
         resetPasswordExpires: Date.now()+5*60*100,
     },
     {new:true});
 
     // create Url 
     const url = `http://localhost:3000/update-password/${token}`;
 
     //send mail 
     await mailSender(email,
                     "password Reset Link",
                      ` password reset Link --> ${url}`);
 
     // return Response 
     return res.json({
         success:true,
         message:"Email sent Successfully , plwase check email and change Password"
     });

 
   } catch (error) {
    console.log("error in Reset- password",error); 
    return res.status(500).json({
        success:false,
        message:"something went Wrong While reset password "
    })
   }
};


// reset password
exports.resetPassword = async(req,res)=>{
    try {
        // data fetch 
        const{password,resetPassword,token } = req.body;

        //validation
        if(password !== resetPassword){
            return res.json({
                success:false,
                message:"Password is not matching"
            })
        }

        // get user detail from DB using Token 
        const userDetails=await User.findOneAndUpdate({token:token});

        //if no entry --> invalid Token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is Invalid "
            })
        };

        //Token time check --> token is expires or not 
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token is expired , regenerete Your Token "
            });
        };

        //hash password
        let hashedPassword = await brcypt.hash(password,10);

        // password la update kele 
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"password Reset Succesfully"
        })


    } catch (error) {
        console.log("error in Reset- password",error); 
    return res.status(500).json({
        success:false,
        message:"something went Wrong While reset password "
    })
    
    }
}

