import React from 'react'
import * as Icons from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const SidebarLink = ({link,iconName}) => {

   // const Icon =  Icons[iconName];
   const Icon =  Icons.VscAccount;

    const location = useLocation();// sidebar che icon and text la yellow color madhe thevayche ahe == user jya path wr mhanje sidebarcya page wr  ahe tyacha color aplyala yelllow karaycha ahe 

    const dispatch = useDispatch();

    // jya page wr sadhya ahe tya page la currnetly active dakhavyache ahe --> tyasathi matchRoute Function cha use kela ahe -- ha JS cha function ahe tyasathi useLocation() --> hook chi garaj padte 
     
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    };

    // function madhe same name function call kele ki recursion houn --> function function la call kart rahto tyamul --> code burst hotot 

  return (

    <div>
        <NavLink 
         to={link.path}
         //onClick={}  // -- on cliick wr route la hit karayche ahe 
         className={` relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)? "bg-yellow-300" : "bg-opacity-0"}`}

         // jr route match zala tr backgroud text color yellow hoil 
        >
            {/* border of sidebar */}
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 
                ${matchRoute(link.path) ? "opacity-100" : "bg-opacity-0"} `}>

            </span>

            {/* name and icon */}
            <div  className='flex items-center gap-x-2'>
                <Icon className=" text-lg"/>
                <span>{link.name} </span>
            </div>

        </NavLink>

        
    </div>
  )
}

export default SidebarLink;