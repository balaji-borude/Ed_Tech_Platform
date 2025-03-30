import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form' ; // react form hook 
import { useDispatch, useSelector } from 'react-redux'
import {addCourseDetails, editCourseDetails, fetchCourseCategories} from '../../../../../services/operations/courseDetailsAPI'
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequirementField from './RequirementField';
import IconBtn from '../../../../common/IconBtn'
import toast from 'react-hot-toast';
import {setStep,setCourse} from '../../../../../slices/courseSlice'
import { MdNavigateNext } from "react-icons/md";


import {COURSE_STATUS} from '../../../../../utils/constants';

const CourseInformationForm = () => {

  // destruct all reequired form hook 
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
      } = useForm()
    
    // instance of use dispatch h00k 
    const dispatch = useDispatch();
    // get token from auth 
    const{token} =  useSelector((state)=>state.auth)
    // get course and editcourse from cource slice 
    const {course,editCourse} = useSelector((state)=>state.course);

    // useState Hook 
    const[loading,setLoading] = useState(false);
    const[courseCategories,setCourseCategories] = useState([]);

    // first render
    useEffect(()=>{
        console.log("fetching function ");
        
        const getCategories = async() =>{
            setLoading(true);
            const categories = await fetchCourseCategories();
            console.log("fetching categories --> ", categories);
            // if response fron BE is valid -- having the length then add this on useStateHook of setCategories 
            if(categories?.length > 0){
                setCourseCategories(categories);
            };

            setLoading(false);

        }

        // if we want to edit the course
        if(editCourse){
          setValue("courseTitle",course.courseName)
          setValue("courseShortDesc",course.courseDescription)
          setValue("coursePrice",course.price)
          setValue("courseTags",course.tag)
          setValue("courseBenifits",course.whatYouwillLearn)
          setValue("courseCategory",course.category)
          setValue("courseRequirement",course.instruction)
          setValue("courseImage",course.thumbnail)
      
        };


        // function get called here 
        getCategories();
    },[]);

    // if form is updated then execute this function 
   const isFormUpdated =()=>{
      const currentValues = getValues();
      if (currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.courseTitle !== course.courseName ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenifit !== course.whatYouwillLearn ||
        currentValues.courseCategory !== course.category._id ||
        currentValues.courseImage !== course.thumbnail ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() 
      ) {
        return true;
      } else {
        return false;
      }
   }

   // handle next button click 
    async function onSubmit(data){
      //two case = 
      // 1.mi course la edit karaycla aloy 
      if(editCourse){
        // if form was Updated then this logic begin  
        if(isFormUpdated()){
          const currentValues = getValues();
          // form data object ==>
          const formData = new FormData();
          
          // All data get adding on formdata objecta 
          formData.append("courseId",course._id);
  
         // append those field  who were changed
         if(currentValues.courseTitle !== course.courseName){
            formData.append("courseName", data.courseTitle);
            if(currentValues.courseShortDesc !== course.courseDescription){
              formData.append("courseDescription", data.courseShortDesc);
           } 
           if(currentValues.coursePrice !== course.price){
              formData.append("price", data.coursePrice);
           } 
           if(currentValues.courseBenifit !== course.courseName){
              formData.append("whatYouWillLearn", data.v);
           } 
           if(currentValues.courseCategory._id !== course.courseCategory){
              formData.append("category", data.courseCategory);
           } 
           if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
              formData.append("instructions",JSON.stringify(data.courseRequirements) );
           }
           if (currentValues.courseTags.toString() !== course.tag.toString()) {
            formData.append("tag", JSON.stringify(data.courseTags))
          }


           // uploading thumbnail and tags is remaining in abouve 

           if (currentValues.courseImage !== course.thumbnail) {
            formData.append("thumbnailImage", data.courseImage)
          }

           setLoading(true);

           // api call to edit course 
           const result = await editCourseDetails(formData,token);

           setLoading(false);
     
           if(result){
             setStep(2);
             dispatch(setCourse(result));
            } 

          }else{
          toast.error("No changes made to form ")
          }
          // console.log("printing formData",formData)
          // console.log("printing result",result);

          return;
        }
        
      }   

    //second Case :- 2. mi course navin banvt ahe  
      // create a new Course 
      const formData = new FormData();

      formData.append("courseName",data.courseTitle);
      formData.append("courseDescription",data.courseShortDesc);
      formData.append("price",data.coursePrice);
      formData.append("whatWillLearn",data.courseBenifits);
      formData.append("category",data.courseCategory);
      formData.append("instructions",JSON.stringify(data.courseRequirements));

      // PENDING WORK =>
      // this two field for tags and thumbnail --> i have to update these two filed  with tag and image name  
      //  formData.append("tag", JSON.stringify(data.courseTags))
      //   formData.append("thumbnailImage", data.courseImage)

      // course Status is present in Utils folder to change the status of code 
      // formData.append("status",COURSE_STATUS.DRAFT);

      setLoading(true);
      // handling api call of Add  course 
      const result = await addCourseDetails(formData,token);

      if(result){
        setStep(2);
        dispatch(setCourse(result));
      };

      // loading show is false no need to show spinner , spinner is turn to false
      setLoading(false);
    }
  

  
return (
    <div>
      {/* onSubmit={handleSubmit(onSubmit)} */}
      <form 
       className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-6'
       onSubmit={handleSubmit(onSubmit)}>

        {/* course Title */}
        <div>
          <label htmlFor='courseTitle'>  Course Title <sup>*</sup></label>
          <input
            id='courseTitle' //same name as setValue() 
            placeholder='Enter Course Title'
            {...register("courseTitle",{required:true})}
          />
          {/* error handling --- if Instructor left the filed Empty */}
          {
            errors.courseTitle &&(
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                 Course Title is Required 
              </span>
            )
          }

        </div>

        {/* couse description  */}
        <div>
          <label htmlFor='courseShortDesc'> course Short Description <sup>*</sup> </label>
          <textarea
            id='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseShortDesc",{required:true})}

            className='min-h-[140px] w-full '
          />
          {
            errors.courseShortDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200" >
              Course Description is Required  
            </span>)
          }
        </div>

        {/* Course Price */}
        <div className='relative'>
          <label htmlFor='coursePrice'>Enter course Price <sup>*</sup> </label>
          <input
            id='coursePrice'
            placeholder='Enter Course Price'
            {...register("coursePrice",{required:true,
              valueAsNumber:true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}

            className='w-full '
          />
          {/* icon */}
          <HiOutlineCurrencyRupee  className='absolute top-1/2 text-richblack-400'/>
          {
            errors.courseShortDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200">
              Course price  Required
            </span>)
          }
        </div>

        {/* category */}
        <div>
            <label htmlFor='courseCategory'> Course category <sup>*</sup> </label>
            <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory",{required:true})}
            className='text-richblack-500'
            >
              <option value="" disabled className='text-richblack-500' >    Choose a category</option>

            {
              !loading && courseCategories.map((category,index)=>{
                return(

                  <option key={index} value={category._id} 
                    className='text-richblack-500'
                  >

                   {category?.name}

                  </option>
                )
              })
            }
          </select>
          {
            errors.courseCategory && (
              <span className="ml-2 text-xs tracking-wide text-pink-200"> 
                Course category is Required 
              </span>
            )
          }
        </div>

        {/* tags */}
        {/* custom components bavane lagel  */}
          <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />

          {/* create a components for Uploading and showing previw of media */}
          <Upload
            name="courseImage"
            label="Course Thumbnail "
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues }
            editData={editCourse ? course?.thumbnail : null}
          />

          {/* Benifits of course */}
          <div>
            <label>Benifits of the course <sup>*</sup></label>
            <textarea
              id='courseBenifits'
              placeholder='Enter Benifits of Course'
              {...register("courseBenifits",{required:true})}
              className='min-h-[130px] w-full '
            />
            {
              errors.courseBenifits &&(
                <span className="ml-2 text-xs tracking-wide text-pink-200" >
                  Benifits of the course are Reequired 
                </span>
              )
            }
          </div>

          {/* Requirement field  */}
          <RequirementField
            name="courseRequirement"
            label="Requirement / Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-x-2">
            {editCourse && (
              <button
                onClick={() => dispatch(setStep(2))}
                disabled={loading}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                 Continue Wihout Saving
              </button>

            )}

        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
      </form>

    </div>
  )
}

export default CourseInformationForm