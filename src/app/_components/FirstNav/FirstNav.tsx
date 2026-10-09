import React from 'react'
import { MdLocalShipping } from "react-icons/md";
import { GiPresent } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import Link from 'next/dist/client/link';
export default function FirstNav() {
  return (
    <div className='hidden xl:flex justify-between p-3 border-b border-gray-300'>
       <div className='LeftSide flex gap-10'>
        <span className='flex gap-2 items-center'>
          <MdLocalShipping className="text-green-500 size-5 " />
          Free Shipping on Orders 500 EGP
        </span>
        <span className='flex gap-2'>
          <GiPresent className="text-green-500 size-5" />
          New Arrivals Daily
        </span>
        </div> 
         <div className='RightSide flex gap-10 '>
        <span className='flex items-center gap-2 hover:text-green-500 cursor-pointer '>
          <FaPhoneAlt  className=" size-3" />
          +1 (800) 123-4567

        </span>
        <span className='flex gap-2 items-center hover:text-green-500 cursor-pointer'>
          <MdOutlineEmail />
         support@freshcart.com
        </span>
      <Link href='/Login'className='flex items-center hover:text-green-500'><CiUser />Sign In</Link>
      <Link href='/Register' className='flex items-center gap-1 hover:text-green-500'><FaUserPlus />Sign Up</Link>



        </div>
    </div>
  )
}
