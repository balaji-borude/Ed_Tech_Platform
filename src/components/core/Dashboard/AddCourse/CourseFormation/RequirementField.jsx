import React, { useEffect, useState } from 'react'

const RequirementField = ({name,register,label, errors,setValue,getValues}) => {

    const [ requirement,setRequirement] = useState(""); // This is for new requirement

    const [requirementList,setRequirementList] = useState([]); // this is for old or previous requirement

    // pahilya render madhe
    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=> value.length > 0 // apan ji requirement takat ahe input field madhe tyachi length > 0 mahnje empty nahi pahije --> It is a Validation for that 
        })
    },[]);

    // jevha pn requirement list chaange hoil tevha Ui Re-render hoil and value Update hoil new value sathi
    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList])

    // function
    const handleAddRequirement =()=>{
        if(requirement){
            //  requirement list having new and previous Requiremetn 
           // setRequirementList(...requirementList,requirement);
           setRequirementList([...requirementList, requirement]);
            setRequirement(" "); // current data la empty kel 

        }
    };
    
    const handleRemoveRequirement =(index)=>{
        // splice method  in js (check this out)
        const updatedRequirementList = [...requirementList];
        // for deletion 
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    };
    

  return (

    <div>
        <label htmlFor={name}>{label} <sup>*</sup> </label>
        <div>
            <input
                type='text'
                id={name}
                value={requirement}
                // js madhe form hanlding madhe kele hote tasech ahe 
                onChange={(e)=>setRequirement(e.target.value)}
                className='w-full'
            />
            {/* Button */}
            <button 
               type="button" 
               onClick={handleAddRequirement}
               className='font-semibold text-yellow-50 '
            >
                add
            </button>
        </div>

        {/* display requirement and remove require ment sati  */}

        {
          requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement,index)=>(
                            <li key={index} className='flex items-center text-richblack-5'>
                                <span>   {requirement} 
                                </span>

                                <button
                                 type='button'
                                 onClick={()=>handleRemoveRequirement(index)}
                                 className='text-xs text-pure-greys-300'
                                >
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {errors[name]&&(
            <span>
                {label} is required
            </span>
        )}

    </div>
  )
}

export default RequirementField