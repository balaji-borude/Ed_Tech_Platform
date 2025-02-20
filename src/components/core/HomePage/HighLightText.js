import React from 'react'

const HighLightText = ({text}) => {
  return (
    <span className='font-bold text-richblack-500'>
        {/* DDING GRADIANT --> bg-gradiant-to-b from-[] to-[color]  */}
       {" "}    {/*thi is for space  */}
        {text}
    </span>
  )
}

export default HighLightText