import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';

// signup function la import kele 


const VerifyEmail = () => {
    const [otp , setOtp] = useState("");
    const dispatch = useDispatch();
    const {signupData,loading} = useSelector((state)=>state.auth);

    const navigate = useNavigate();

    // signup data he slice madhe  auth slice madhe SignupData takelel ahe tetheun tyala baher kadhala 

    // dispatch madhe signup cha data janar ahe 

    // jr signupData madhe data nasel tr useEffect cha use karun first procecc madhe tyala render kele ahe 
    useEffect(() => {
     if(!signupData){
        navigate("/signup")
     }
    },)
    
    const handleOnsubmit=(e)=>{
         e.preventDefault();

         const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp
         } = signupData

       // dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp,navigate))
        // .then(() => {
        //     navigate("/login");  // ✅ Navigate only after success
        // })
        // .catch(() => {
        //     navigate("/signup");  // ✅ If signup fails, redirect to signup
        // });


    };

  return (
    <div className='text-white'>
        {
            loading? (
                <div>
                    loading.....
                </div>
            ) 
            :(
                <div>
                    <h1> Verify Email </h1>
                    <p> A verification code has been send to you . enter the code Below</p>

                    <form onSubmit={handleOnsubmit}> 
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} className='bg-richblack-400 text-yellow-100' />}
                        />

                        <button type='submit'>
                            Verify Email 
                        </button>

                       
                    </form>

                    <div>
                         {/* back to login button */}
                        <div>
                            {/* arrow button  */}

                            <Link to="/login">
                             <p> back to Login </p>
                            </Link>

                        </div>
                        <button onClick={()=> dispatch(sendOtp(signupData.email))}>
                            Resend it
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail