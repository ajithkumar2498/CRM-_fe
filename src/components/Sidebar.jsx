import React from 'react'
import {
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
    MdWork,
  } from "react-icons/md";
  import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';
import { RiContactsBook3Line, RiDashboardFill } from 'react-icons/ri';
import { FaHandshakeSimple } from 'react-icons/fa6';


const linkData = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: <RiDashboardFill />,
    },
    {
      label: "Contacts",
      link: "contacts",
      icon: <RiContactsBook3Line />,
    },
    {
      label: "Companies",
      link: "company",
      icon: <MdWork />,
    },
    {
      label: "Deals",
      link: "deals",
      icon: <FaHandshakeSimple />,
    }
  ];

const Sidebar = () => {
    const {user} =useSelector((state)=> state.auth)

    const dispatch = useDispatch()
    const location = useLocation()

    const path = location.pathname.split("/")[1]

    const sidebarlinks = user ? linkData : linkData.slice(0, 5)

    const closeSidebar = ()=>{
        dispatch(setOpenSidebar(false))
    }

    const NavLink = ({el})=>{
        return (
            <Link to={el.link}
              onClick={closeSidebar}
              className={clsx(
                "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]", 
                path === el.link.split("/")[0] ? "bg-blue-700 text-white" : "" )}
            >
            {el.icon}
            <span className='hover:text-[#2564ed]'>{el.label}</span>
            </Link>
        )
    }
  return <>
     <div className="w-full h-full flex flex-col bg-amber-100 gap-6 p-5">
        <h1 className='flex gap-1 items-center'>
            <p className='rounded-full text-2xl font-bold'>
              ORION 
            </p>
            <span className='text-2xl font-bold text-black'>CRM</span>
        </h1>
        
        <div className="flex-1 flex flex-col gap-y-5 py-8">
            {
                sidebarlinks.map((link)=>(
                    <NavLink el={link} key={link.label}/>
                ))
            }
        </div>
     </div>
  </>
}

export default Sidebar