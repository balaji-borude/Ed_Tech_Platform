const mongoose= require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60                   // OTP ----> expire in 5 min  is stored in DB 
  }
})

// sending mail section here
async function sendVerificationEmail(email,otp){
    try {
        //mail cha response 
        const mailResponse = await mailSender(email,"Verification Email From study Notion", otp);
        console.log("Email send succesfully" , mailResponse);

        
    } catch (error) {
        console.log("Error in sending Gmail ", error);
        throw error;
    }
}

// document save hony agodar Mail gela pahije broo 
// pre save middleware function is used 
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next;  // go to the next middleware 
})

module.exports = mongoose.model("OTP",OTPSchema)