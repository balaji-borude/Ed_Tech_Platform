
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
        <div className="relative mb-2 flex w-full justify-center" >
            {
                steps.map((items,index)=>(

                    <>
                            <div 
                            className="flex flex-col items-center "
                            key={index}
                            >

                            <div >
                                    {/* step --> hi course Slice maddhu;n ghetli ahe  */}
                                    <button className={` grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                                    ${step === items.id 
                                            ? "bg-yellow-900 border-yellow-50 text-yellow-50"

                                            : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                            }  ${step > items.id && "bg-yellow-50 text-yellow-50"}}`}
                                    >
                                            {/* This logic for after completing first step first step show check icon on it  */}
                                        {
                                            step > items.id ? (<FaCheck  className="font-bold text-richblack-900" />) :(items.id)
                                        }

                                    </button>

                                </div>
                            
            
                            </div>

                            {/* PENDING WORK IS HERE  */}
                            {/* aadd  code for dashes between the labels   */}

                            
                        {items.id !== steps.length && (
                        <>
                            <div
                            className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                            step > items.id  ? "border-yellow-50" : "border-richblack-500"
                            } `}
                            ></div>
                        </>
                        )}
                        
                    </>

                ))
            }
        </div>

            {/* for title of steps  */}
            <div className="relative mb-16 flex w-full select-none justify-between">
             {steps.map((item) => (
            
                <div
                className="flex min-w-[130px] flex-col items-center gap-y-2"

                key={item.id} // yehte no. dila

                >
                
                    <p
                        className={`text-sm ${
                        step >= item.id ? "text-richblack-5" : "text-richblack-500"
                        }`}
                    >
                        {item.title} 
                        {/* yehte section che title dile ahe  */}
                    </p>
                </div>
            
        ))}
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