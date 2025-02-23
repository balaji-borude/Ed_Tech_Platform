import React from 'react'
import {useState} from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
//import Home from '../../../pages/Home';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

const tabName=[
    "Free",
    "New to Coding",
    "Most Popular",
    "Skills Path",
    "Career Paths"
];


const ExploreMore = () => {
    // by default case madhe HomePageExplore && tabName cha first index cha data  mhanun -->useState(tabName[0]) ase ghetlee ahe 

    const [currentTab, setCurrentTab] = useState(tabName[0]);
    const [course, setCourse] = useState(HomePageExplore[0].courses);

    //console.log("printing Courses ",HomePageExplore[0].courses)

    // UI madhe first card white madhe ahe na mhabub yehte  ek navin useState ghetla -->  jya card wr click kele tya card cha color change hoto tyamul he sate variable use kele ahe 
    const[currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value)=>{
        setCurrentTab(value); // current tab chi value change krt ahe 
        const result = HomePageExplore.filter((course)=>course.tag === value);
        console.log("result of explore more page ", result)
        setCourse(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);

    }


  return (

    <div>

        <div className='text-4xl font-semibold text-center text-white'>
            Unlock the 
            <HighLightText text={"Power of code"} />
        </div>

        <p className='text-center text-richblack-300 text-[16px] font-semibold mt-3 '>
            Learn To anything you can Imagine
        </p>

        {/* tab section */}

        <div className='w-[50%] h-12 mt-5  mx-auto flex flex-row rounded-full bg-richblack-800 border-richblack-100  '>
            {
                tabName.map((element,index)=>{
                    return(
                        <div 
                        className={`text-[16px] flex flex-row items-center justify-center mx-auto gap-3 
                            ${currentTab === element ? "bg-richblue-900 text-richblack-5 font-medium" :"text-richblack-200"}
                            rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-3 py-7 `}
                         key={index} 
                         onClick={()=> setMyCards(element)}>
                                {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-[150px]'></div>

        {/* course 3- card div   */}

        <div className='absolute flex flex-row gap-10 justify-between w-full '>
            {
                
                course.map((element, index)=>{
                    return(
                        <CourseCard
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}

                    />    
                    )
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore