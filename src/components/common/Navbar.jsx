/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfiledropDown from '../core/Auth/ProfiledropDown';
import {apiConnector} from '../../services/apiconnector'
import {categories} from '../../services/apis'

import { MdOutlineArrowDropDownCircle } from "react-icons/md";
const Navbar = () => {

  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const {totalitems} = useSelector((state)=>state.cart);


  // links 
  const [subLinks,setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing Sublinks -->", result)
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Could not fetch category details", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

 //matchPath() is a function (likely from React Router v6).
 //It checks if the location.pathname matches the provided route.
  const location = useLocation();

//   const matchRoute = (route) => {
//     return matchPath(route, location.pathname);
// }

  // ✅ Fix: Ensure route is not undefined before using matchPath()
  const matchRoute = (route) => {
    if (!route) return false;       // Prevent undefined errors
    return matchPath(route, location.pathname);
  };


  return (
    <div className='flex h-12 items-center justify-center border-b-[1px] border-b-richblack-600'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        {/*Logo  */}
        <Link to="/">
         <img src={logo} alt='logo' width={160} height={42} loading='lazy' />
        </Link>
  
        {/* Navlink */}
        <nav className=' gap-x-6 text-richblue-25 '>

          <ul className='flex  gap-x-5'>
            {
              NavbarLinks.map((link,index)=>{
                return(
                  <li key={index}>
                    {/* catlog navigation la wegle create karayche and bki 3 la wegle create karayche --> tyasathi hi khalchi Ternarny operatr use kela ahe   */}
                    {
                      link.title === "catalog" ?

                      (
                       <div className='flex items-center gap-2 group relative '>
                          <p> 
                            {link.title}  
                          </p>

                          <MdOutlineArrowDropDownCircle />
                          {/*  group-hOver : visibble --> parent wr hover kelyave visible zale pahije div  */}
                          <div className='invisible absolute left-[50%] top-[50%]
                          translate-x-[-50%] translate-y-[80%]
                          flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100  lg:[300px] '>

                            <div className='absolute left-[50%] top-14  h-6 w-6 translate-y-[45%] translate-x-[80%] rounded bg-richblack-5 '>

                              {
                                subLinks.length ? 
                                (
                                  subLinks.map((sublink, index) => (
                                    <Link to={`${sublink.link}`} key={index}>
                                      {sublink.title} 
                                    </Link>
                                  ))
                                ) :
                                (<div></div>)
                              }



                            </div>
                          </div>
                       </div>
                      ) 
                       
                       : (
                        // ?. --> yane kay hote 
                        <Link to={link?.path}>
                          <p className={`${matchRoute(link?.path) ? "  text-yellow-25" : "text-richblack-25 flex "}  `}>

                            {link.title}

                          </p>
                        </Link>
                      )
                    }
                 </li>
                )
                
              })
            }
          </ul>

        </nav>

        {/* Login/signup/dashboard --> buttons  */}
        <div className='flex gap-x-4 items-center text-white'>
          {
            user && user?.accountType !== "Instructor" && (
              // classname la relative mark kele --> karan cart wr jo number yet nahi ka tyla crt chya warti thevnysathi 
              <Link to="/dashboard/cart" className='relative'>
                <AiOutlineShoppingCart />
                {
                  totalitems > 0 && (
                    <span>
                      {totalitems}
                    </span>
                  )
                }
              </Link>
            ) 
          }

          {
            token === null &&(
              <Link to="/login">
                 <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-200 rounded-md '> 
                  log In 
                </button>
              </Link>
            )
          }
          {
            token === null &&(
              <Link to="/signup">
                 <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-200 rounded-md ' > 
                  Sign Up
               </button>
              </Link>
            )
          }
         
         {
          token !==null &&(
            <ProfiledropDown/>
          )
         }
          
        </div>


      </div>

    </div>
  )
}

export default Navbar