import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {

    const {user}= useSelector((state)=>state.profile);
    const navigate = useNavigate();

  return (
    <div className='text-white'>
        <h1>
            My Profile
        </h1>

        {/* section 1 */}
        <div>
            <div>
                <img src={user?.image} alt={`profile-${user?.firstName}`}
                className='aspect-square w-[78px] rounded-full object-cover'/>

                <div>
                    <p>{user?.firstName + " " + user?.lastName} </p>

                    <p>
                        {
                            user?.email
                        }
                    </p>
                </div>
            </div>

            {/* HW:- Edit wala icon add krane ahe  */}
            <IconBtn
                text="Edit"
                onClick={()=>{
                    navigate("/dashboard/setting") }
                }
            />
        </div>

        {/* section 2  */}
        <div>
            <div>
                <p>
                    about
                </p>

                {/* HW- Icon add kerne */}
                <IconBtn
                text={"Edit"}
                onClick={()=>{
                    navigate("/dashboard/settings")
                }}/>

            </div>
            {/* Additional details  */}
            {/* DB madhe additionalDetails--> .about madhe jo data ahe to yehte fetch kela ahe  */}
            {/*profile slice madhe --> user cha data Local storage madhe save kelela ahe --> thethun additional deatail cha data call kela ahe   */}

            <p> {user?.additionalDetails?.about ?? "Write Something about Yourself " }</p>

        </div>

        {/* setio n 3 */}
        <div>
            <div>
                <p>Personal details </p>
                <IconBtn
                    text={"Edit"}
                    onClick={()=>{
                    navigate("/dashboard/settings")
                }}/>

            </div>

            <div>
                <div>
                    <p>First Name</p>
                    <p>{user?.firstName } </p>
                </div>
                <div>
                    <p>Email</p>
                    <p>{user?.email } </p>
                </div>
                <div>
                    <p>Gender</p>
                    <p>{user?.gender } </p>
                </div>
                <div>
                    <p>Last Name</p>
                    <p>{user?.lastName } </p>
                </div>
                <div>
                    <p>Phone Number</p>
                    <p>{user?.additionalDetails.contactNumber ?? "Add Contact Number"} </p>
                </div>
                <div>
                    <p>Date of Birth</p>
                    <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth" } </p>
                </div>
            </div>

        </div>




    </div>  
  )
}

export default MyProfile