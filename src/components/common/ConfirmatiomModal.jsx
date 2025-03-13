import React from 'react'
import IconBtn from './IconBtn'

const ConfirmatiomModal = ({modalData}) => {
  return (
    // logout kelyave confimation pop
    <div>
        <div>
            <p>
                {
                   modalData.text1 
                }
            </p>
            <p>
                {modalData.text2}
            </p>

            {/* button */}

            <div>
                <IconBtn
                    onCllick={modalData?.btn1Hnadler}
                    text={modalData?.btn1Text}
                />

                <button onClick=  {modalData?.btn2Handler}>
                    {modalData.btn2Text}
                </button>
            </div>


        </div>

    </div>
  )
}

export default ConfirmatiomModal