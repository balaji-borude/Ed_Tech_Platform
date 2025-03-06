import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json';


const ContactUsForm = () => {
    const [loading , setLoading]=useState(false);

    // form hook 
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async(data)=>{
        console.log("Logging Data", data);
        // api call krt ahe
        try {
            setLoading(true);
            //const response = await apiConnector("POST"),contactusEndpoint.CONTACT_US_API,data;
            const response = {status:"OK" };
            console.log("Loading response", response);
            setLoading(false);

        } catch (error) {
            console.log("Error:", error.message);
            setLoading(false)
        }
    }


    useEffect(()=>{
        if(isSubmitSuccessful ){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                phoneNo:""
            })
        }
    },[reset, isSubmitSuccessful]);
    // form cha structure change zala wr useeffectt call hoil 


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

        <div className='flex flex-col'>
            <div className='flex gap-5 '>
                {/* firstName */}
                <div className='flex flex-col '>
                    <label htmlFor='firstname'> First Name</label>
                    <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first Name'
                        className='text-richblack-400'
                        {...register("firstname",{required:true})}
                    />
                    {
                        errors.firstname &&(
                            <span>Please Enter Your Name </span>
                        )
                    }
                </div>
                {/* Lastname */}
                <div className='flex flex-col '>
                    <label htmlFor='lastname'> Last Name</label>
                    <input
                        type='text'
                        name='lastname'
                        id='lastname'
                         className='text-richblack-400'
                        placeholder='Enter Last Name'
                        {...register("lastname")}
                    />

                </div>

            </div>

                {/* email */}
                <div className='flex flex-col'>
                    <label htmlFor='email'> Email Address </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                         className='text-richblack-400'
                        placeholder='Enter Your Email '
                        {...register("email", {required:true})}
                    />
                    {
                        errors.email && (
                            <span>
                                Please enter your email
                            </span>
                        )
                    }
                </div>

                {/* phone number */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='phonenumber'>Phone Number</label>
                    
                    {/* drop down and input field */}
                    <div className='flex w-7 gap-x-3 '>
                        {/* dropdown */}
                        <div className='flex '>
                            <select
                            name='dropdown'
                            id='dropdown'
                            className='text-richblack-400 w-16'
                            {...register("Countrycode", {required:true})}
                            >
                                {
                                    CountryCode.map((element,index)=>{
                                        return(
                                            <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                        )

                                    })
                                }
                            </select>
                        </div>

                        {/* phonenumber */}
                        <div>
                            <input
                                type='number'
                                name='phonenumber' 
                                id='phonenumber'
                                className='text-richblack-300 '
                                {...register("phoneNo",
                                    {
                                    required:true,
                                    maxLength:{value:10,message:"Invalid Phone Number"},
                                    minLength:{value:8,message:"Invalid Phone Number "}
                                    }
                                )}
                              
                            />
                        </div>

                    </div>

                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

                {/* messageBox */}
                <div className='flex flex-col'>
                    <label htmlFor='message'>Message </label>
                    <textarea
                        name='message'
                        id='message'
                        cols="30"
                        rows="7"
                         className='text-richblack-400'
                        placeholder='Enter Your Message'
                        {...register("message",{required:true})}
                    />
                    { errors.message && (
                    <span>
                            Please Enter Your message
                        </span>
                        )
                    }
                </div>

            {/* Button */}
            <button type='submit'
            className='rounded-md bg-yellow-50 text-center px-7 text-[16px]font-bold text-black '>
                Submit
            </button>
        </div>

    </form>
  )
}

export default ContactUsForm