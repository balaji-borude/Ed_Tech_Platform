
const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile =  require("../models/Profile");
const mailSender = require("../utils/mailSender"); //this function is called to send mail if password is changed 

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");



// otp handler 
exports.sendOTP = async(req,res)=>{
   try {
     // fetch email from req body
     const {email} = req.body;

     // check if user already exist
     const checkUserPresent = await User.findOne({email});
     // user is already exists , then return a response 
     if(checkUserPresent){
         return res.status(401).json({
             success:false,
             message:"user is already Registered "
         })
     }

     // generate otp 
     // 6--> is no. of otp character/number and in { there is option which we want to take on not }
      var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false

      });

      console.log("OTP is genereted succesfuly -----> ", otp);

      // make sure Otp is unique 
      //check Unique otp or not
      let result = await OTP.findOne({otp:otp});

      // joparyant Unique otp generate hot nahi toparyant loop run  kra
      //This is not a good  Best logic --> insted of it used library which generate a unique OTP --> this is a BrrootForces 
      while(result){
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
          });
          result = await OTP.findOne({otp:otp});
      };

      // OTP ki Entry DB madhe save karaychi 
      const otpPayload = {email,otp};

      // create an entry for OTP in DB 
      const otpBody = await OTP.create(otpPayload);
      console.log(otpBody);

      res.status(200).json({
        success:true,
        message:"OTP send Succesfully"
      })




   } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        messagea:"Issue in OTP Generation "
    })
   }



}
 
// signup  handler
exports.signUp= async(req,res)=>{
    try {
        // data fetch from req.body    
        const {firstName,lastName,email,password,
            confirmPassword, accountType, contactNumber,otp} = req.body;

        // validation of above password 
        if(!firstName||!lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All Field are Required"
            })
        };

        // password match karo
        if(password !== confirmPassword){
            res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword Field does not matched "
            });
        }

        // check email is already present or not 
        const Existing_user = await User.findOne({email});

        if(Existing_user){
           return res.status(400).json({
                success:false,
                message:'User is already Registered , Please LoggedIN '
            })
        }

        // find most resent OTP stored in user --> means DB  
        const recentOtp = await OTP.findOne({email}).sort({createdAt : -1}).limit(1);

        // validate Otp 
        if(recentOtp.length == 0){
            // otp not found
            return res.status(400).json({
                success:false,
                message:"OTP not found "
            })
        }else if(otp !== recentOtp.otp){
            //jr DB madhun alela OTP and req.body madhun alela OTp jr match nahi kela tr --> Invlaid OTP mhanun  print kr 
            return res.status(400).json({
                success:false,
                message:"Invalid OTP "
            })
        }

        // password la hashed kela 
        let hasshedPassword = await bcrypt.hash(password,10);
        console.log("Password is hashed",hasshedPassword);
    
        // dB Madhe Entry Create karne ahe 
        // profile detail la pahile Db madhe entry creat keli --> karan apl
        const profileDetail = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about:null,
            contactNumber:null
        })
        const entryData = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hasshedPassword,
            accountType,
            additionalDetail :profileDetail._id, // yamdhe je profile detail ahe na tyachi id pass keli je profile Detail page 
             image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        console.log("This Entry is Stored in Data-Base",entryData)
        // response succes send krar a
        return res.status(200).json({
            success:true,
            message:"User is Registered Succesfully",
            entryData
        })
    } catch (error) {
     res.status(500).json({
        success:false,
    message:"something went Wrong in SignUP !!  User cannot be Registerred , please try again "
     })
    }
}

// login handler
exports.login= async()=>{
    try {
        // request chy url madhun {email and password kadhne }
        const {email,password} = req.body;
         
        // adding basic validation 
        if(!email || !password){
            res.send(403).json({
                success:false,
                message:"Please Fill the all field"
            })
        };

        // check kr email present ahe ka Db Madhe
        const user = await User.findOne({email}).populate("additionalDetails")
        if(!user){
            res.status(401).json({
                success:false,
                message:"User not exist please Sign in first "
            });

        }
        
        // password match karne and jwt token create karne ahe 
        if(await bcrypt.compare(password, user.password)){
            // jr password match zale tr TOKEN create karayche
             // create Jwt Token 
            payload={
                id:user._id,
                email:user.email,
                accountType:user.accountType
                //password:user.password
            };
            // jwt secret call kela
            let JWT_SCERET = process.env.JWT_SCERET;
            // option madhe Expirey set karaychi 
            options={
                expiresIn:"2hr"
            };

            // create token 
            const token =  jwt.sign(payload,JWT_SCERET,options);
            console.log("Printing Token --> ", token);

            // token la user madhe INSERT kele 
            user.token = token;
            user.password = undefined;

            // generate cookie
            cookie_options = {
             expires:  new Date(Date.now()+ 3*24*60*60*1000) ,
             httpOnly:true
             // cookie Expires in 3 day 
            }
            res.cookie("cookie",token,cookie_options).status(200).json({
                success:true,
                message:"User Loggged In ",
                token,
                user
            })
        }else{
            return res.status(401).json({
                success:true,
                message:"passsword is Incorrect "
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure !! !  Pease Try again later"
        })
    } 
};

//change Password handler
exports.changePassword = async (req,res)=>{

    try {
        // get data from req.body 
        const {email,oldPassword,newPassword,confirmNewPassword} = req.body;

        // get oldPassword, newpassword, confirmNewPasword,

        // validation
        if(!email || !oldPassword || !newPassword || !confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:"Please Fill all the Fields"
            })
        };
        // check if email is exist or not  if not send response, 
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not exist  "
            })
        };
        // compare oldPassword and hashed password in DB 
        const comparePassword = await bcrypt.compare(oldPassword,user.password);
        if(!comparePassword){
            return res.status(402).json({
                success:false,
                message:"Your Old password is Incorrect "
            })
        };
        // jr password match zala tevha newpassword and confirmNewPaswoed check karayche 
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:"newPaaword and  Confirm Password  is Not Matching "
            })
        };

        let hashedNewPassword = await bcrypt.hash(newPassword,10);

        // Why Use .save() Instead of updateOne()?
        // ✅ .save() automatically triggers Mongoose middleware (e.g., pre-save hooks).
        // ✅ .save() updates only the fields that were modified.
        // ✅ .save() works on an existing document instance, reducing the chance of errors.
       
        // Update password in the database
         user.password = hashedNewPassword;
         await user.save();

        // OR  -- >  WE can do both but Upper side code is more effective 
        // const updatePasssword = User.updateOne({
        //     password:hashedNewPassword
        // });
        // send mail -- password Updated
        function sendMail (){
            try {
                let body =`
                <h2>${user.firstName,lastName}</h2>
                <p> Your password is changed Succesfully </p>
                <p>Best Regards,<br>Study Notion <sub>By Balaji Borude </sub></p>
                `
                const mailResponse =  mailSender(user.email,"Password is changed Succesfully",body);
                console.log("response of Mail send after change password -->",mailResponse);

            } catch (error) {
                console.log("Error in Mail sending", error)
            }
    
        }

        // return resonse
         return res.status(200).json({
            success:true,
            message:"Password changed succesfully"
         });

    } catch (error) {
        console.log(error),
        res.status(500).json({
            success:false,
            message:"Something went Wrong while Changing Password "
        })
    }
   
};



