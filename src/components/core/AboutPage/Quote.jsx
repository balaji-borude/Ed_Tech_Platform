import React from 'react'
import HighLightText from '../HomePage/HighLightText'

const Quote = () => {
  return (
    <div>
        <p>
            We are passionate about revolutionizing the way we learn. Our innovative platform 
            <HighLightText text={"combines technology"}/> <span className='text-yellow-100'>expertise</span> <span className='text-yellow-100'>
                {""}
            unparalleled educational experience.
            </span>    
        
        </p>

    </div>
  )

}

export default Quote