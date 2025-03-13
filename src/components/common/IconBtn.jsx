import React from 'react'

const IconBtn = ({
    text,
    onCllick,
    children,
    disabled,
    outline = false,
    customClasses,
    type
}) => {
  return (
    <div>
        {
            children ? (
               <>
                    <span>
                         {text}
                    </span>
                    {children}
               </>

            ):(text)
        }
    </div>
  )
}

export default IconBtn