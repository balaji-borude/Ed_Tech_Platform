import React from 'react'

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
    <div className='w-[33%]'>
      <p className='bg-white'>{cardData.heading}</p>
      <p className='bg-white'>{cardData.description}</p>
      <div className='flex justify-around'>
        <p> {cardData.level} </p>
        <p> {cardData.lessionNumber} </p>
      </div>

    </div>
  )
}

export default CourseCard