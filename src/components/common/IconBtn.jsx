import React from 'react'

const IconBtn = ({
    text,
    onClick,  // ✅ Corrected from "onCllick"
    children,
    disabled,
    outline = false,
    customClasses,
    type


}) => {
  
    return (
        <button onClick={onClick}>
            {children ? (
                <>
                    <span>{text}</span>
                    {children}
                </>
            ) : (
                text
            )}
        </button>
    )
}

export default IconBtn;
