
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseFormation/CourseInformationForm';
import { FaCheck } from "react-icons/fa";


const RenderSteps = () => {
    const {step} = useSelector((state)=>state.course); // steps la course slice madhun import kele ahe  

    // steps cha array create kela ahe karan .map function use karu shakto
     const steps=[
        {
            id:1,
            title:'Course Information'
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
    ];

    // onchange handler function 



  return (
    <>
        <div>
            {
                steps.map((items,index)=>(

                    <div key={index}>

                     <div key={items.id}>
                        {/* step --> hi course Slice maddhu;n ghetli ahe  */}
                        <div className={`${step === items.id 
                                 ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                                : "border-richblack-100 bg-richblack-800 text-richblack-800"}`}
                            >
                                {/* This logic for after completing first step first step show check icon on it  */}
                            {
                                step > items.id ? (<FaCheck />) :(items.id)
                            }

                            </div>
                        </div>
                            {/* PENDING WORK IS HERE  */}
                            {/* aadd  code for dashes between the labels   */}
                     

                    </div>
                ))
            }
        </div>

            {/* for title of steps  */}
        <div>
            {steps.map((item)=>{
              return(
                <div key={item.id}>
                    <p>
                        {item.title}
                    </p>
               </div>
              )  
            })}
        </div>


        {/* step chya - Id nusar components Render krt ahe broo   */}
        {
            step === 1 && <CourseInformationForm/>
        }

        {/* {
            step === 2 && <CourseBuilder/>
        }

        {
            step === 3 && <PublishBuilder/>
        } */}
    </>
  )
}

export default RenderSteps