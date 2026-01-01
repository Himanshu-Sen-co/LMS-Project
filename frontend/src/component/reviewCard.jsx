import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from 'react-icons/fa6';

function ReviewCard({Comment, rating, photoUrl, name, description, courseTitle}) {
  return (
    <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full'>
        <div className='flex items-center mb-3 text-yellow-400 text-sm '>
            {
                Array(5).fill(0).map((_i, i)=>(
                    <span key={i}>{i<rating ? <FaStar /> : <FaRegStar />}</span>
                ))
            }
        </div>
        <p className='text-gray-700 text-sm mb-1 '>Review for : <span className='font-semibold'>{courseTitle}</span></p>
        <p className='text-gray-700 text-sm mb-5 '>Review : <span className='font-semibold'>{Comment}</span></p>
        <div className='flex items-center gap-[20px] '>
            {photoUrl ? <img src={photoUrl} alt="photo" className='w-10 h-10 rounded-full object-cover ' /> : <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold '> {name?.charAt(0).toUpperCase()} </div>}
        <div>
            <h2 className='font-semibold text-gray-800 text-sm '>{name}</h2>
            <p className='text-xs text-gray-500 '>{description}</p>
        </div>
        </div>
    </div>
  )
}

export default ReviewCard