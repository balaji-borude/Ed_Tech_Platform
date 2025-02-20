import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';

const Home = () => {

  return (

    <div className='bg-blue-300'>

        {/* section 1 */}
        <div className='relative mx-auto flex items-center flex-col w-11/12 justify-between'>
            <Link to={"/signup"}>
                <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='group-hover:bg-richblack-900 flex flex-row items-center gap-2 rounded-full px-10 py-[5px] '>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future With{<HighLightText text={"Coding Skills"}/> }
                {/* <span> Coding Skills </span> */}
            </div>

            <div className='mt-4 w-[90] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>
            <div className='flex flex-row gap-7 mt-8 '>
                <CTAButton active={true} Linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} Linkto={"/login"}>
                    Book Demo
                </CTAButton>
            </div>

                {/* Running Video  */}
            <div className='mx-3 my-12 shadow-blue-200 '>
                <video
                    muted
                    loop
                    autoPlay
                >
                    <source src={Banner} type="video/mp4"/>
                </video>

            </div>

            {/* code section 1 */}
            <div>
                <CodeBlocks
                position={"lg:flex-row"}/>

                heading={
                    <div className='text-4xl font-semibold'>
                       <HighLightText text={"unlock Your codding Potential"}/>
                       Without Online courses
                    </div>
                }
                subHeading={
                 "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
   
                }
                ctabtn1={
                    {
                       btnText:"try it Yourself",
                       Linkto:"/signup" ,
                       active:true
                    }
                }
                ctabtn2={
                    {
                       btnText:"Learn more",
                       Linkto:"/login" ,
                       active:false
                    }
                };

                Codeblocks={`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Example</title>
                        <link rel="stylesheet" href="styles.css">
                    </head>
                    <body>
                        <h1><a href="/">Header</a></h1>

                        <nav>
                            <a href="one/">One</a>
                            <a href="two/">Two</a>
                            <a href="three/">Three</a>
                        </nav>
                    </body>
                    </html>

                `}

            </div>

        </div>


        {/* section 2 */}
        {/* section 3 */}
        {/* footer */}

    </div>
  )
}

export default Home