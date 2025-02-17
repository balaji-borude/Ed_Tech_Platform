import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighLightText from '../components/core/HomePage/HighLightText';

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

            <div>
                Empower Your Future With{<HighLightText text={"Coding Skills"}/> }
                {/* <span> Coding Skills </span> */}
            </div>
        </div>


        {/* section 2 */}
        {/* section 3 */}
        {/* footer */}

    </div>
  )
}

export default Home