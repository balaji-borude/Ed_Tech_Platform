import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
//import {logout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux';
import SiderbarLink from './SiderbarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import {logout} from "../../../services/operations/authAPI"


const Sidebar = () => {

    const {user,loading:profileLoading} = useSelector((state)=>state.profile);

    const {loading:authLoading} = useSelector((state)=>state.auth);

    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const [ConfirmatiomModal,setConfirmationModal]= useState(null)
    
    // ya doghan paiki kahihi nasel tr loading spinner dakhav 
    if(profileLoading || authLoading){
        return(
            <div>
                {/* add spinner here  */}
                loading....
            </div>
        )
    }
  return (
    <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)]
    bg-richblack-800 py-10 '>
        <div className='flex flex-col '>
            {
                sidebarLinks.map((link)=>{
                    if(link.type && user?.accountType !== link.type) return null;
                    return(
                        <SiderbarLink link={link} iconName={link.icon} key={link.id}/>
                    )
                })
            }
        </div>

            {/* Horizontal line  */}
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 '></div>

            {/* setting and its icon  */}
        <div className='flex flex-col'>
            <SiderbarLink
             link={{name:"settings",path:"dashboard/settings"}}
             iconName="vscSettingGear"
             
            />

            <button onClick={()=>setConfirmationModal({
                 text1:"Are You sure ?",
                 text2:"You will be logged Out of Your Account",
                 btn1Text:"Logout",
                 btn2Text:"Cancel",
                 btn1Hnadler:()=> dispatch(logout(navigate)),
                 btn2Hnadler:()=>setConfirmationModal(null)
            })}
            className='text-sm font-medium text-richblack-300'
            >
                <div className='flex items-center gap-x-2'>
                <VscSignOut className='text-lg'/>
                <span>LogOut</span>
                </div>

            </button>

        </div>

            {ConfirmatiomModal && <ConfirmatiomModal modalData={ConfirmatiomModal}/>}
    </div>
  )
}

export default Sidebar