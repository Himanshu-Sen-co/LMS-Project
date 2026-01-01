import React from 'react'
import { MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";


function Logos() {
  return (
    <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px] '>
        <div className=' flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] '>
            <MdOutlineCastForEducation className='w-[30px] h-[30px] fill-[#03394b] '/>
            20k+ online Course
        </div>
        <div className=' flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] '>
            <SiOpenaccess  className='w-[30px] h-[30px] fill-[#03394b] '/>
            Life-time Access
        </div>
        <div className=' flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] '>
            <FaSackDollar className='w-[30px] h-[30px] fill-[#03394b] '/>
            Value for money
        </div>
        <div className=' flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] '>
            <BiSupport className='w-[30px] h-[30px] fill-[#03394b] '/>
            Lifetime support
        </div>
        <div className=' flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] '>
            <FaUsers className='w-[30px] h-[30px] fill-[#03394b] '/>
            Community support
        </div>
    </div>
  )
}

export default Logos