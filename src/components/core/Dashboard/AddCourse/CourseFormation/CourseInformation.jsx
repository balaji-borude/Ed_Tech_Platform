import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form' ; // react form hook 
import { useDispatch, useSelector } from 'react-redux'
import {fetchCourseCategories} from '../../../../../services/operations/courseDetailsAPI'
const CourseInformation = () => {


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
      } = useForm()
    
    const dispatch = useDispatch();
    const {course,editCourse} = useSelector((state)=>state.course);

    const[loading,setLoading] = useState(false);
    const[courseCategories,setCourseCategories] = useState([]);

    useEffect(()=>{
        console.log("fetching function ");
        
        const getCategories = async() =>{
            setLoading(true);
            const categories = await fetchCourseCategories();

            // if response fron BE is valid -- having the length then add this on useStateHook of setCategories 
            if(categories.length >0){
                setCourseCategories(categories);
            };

            setLoading(false);

        }
        getCategories()
    })

  return (

    <div>
        <form>

        </form>
    </div>
  )
}

export default CourseInformation