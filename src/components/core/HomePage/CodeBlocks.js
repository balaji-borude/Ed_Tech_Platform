import React from 'react'
import CTAButton from "../HomePage/Button";
//import HighLightText from './HighLightText';
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = (  position, heading, subHeading, ctabtn1,ctabtn2, Codeblocks, backgroudGradiant, codeColor) => {

  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
        {/* {section} */}
        <div className='w-[50%] flex flex-col, gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold flex gap-3 '>
                {subHeading}
            </div>
        </div>
        <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} Linkto={ctabtn1.Linkto}>
                <div className='flex, gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight />
                </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} Linkto={ctabtn2.Linkto}>
              
                    {ctabtn1.btnText}
                
            </CTAButton>

        </div>

       
    </div>
  )
}

export default CodeBlocks