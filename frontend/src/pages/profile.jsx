import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";


function Profile() {
  const {userData} = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(userData.name);
  
  
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center '>
      <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative '>
        <FaArrowLeftLong className='absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer ' onClick={()=> navigate("/")} />

        <div className='flex flex-col items-center text-center '>
          {userData?.photoUrl ?<img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-black ' alt="" />: <div className='w-24 h-24 rounded-full bg-black flex items-center justify-center text-4xl text-white border-4 border-white  '> {userData ? userData.name?.charAt(0).toUpperCase() : ""} </div>}

          <h2 className='text-2xl mt-4 font-bold text-gray-700 '>{userData.name}</h2>
          <p className='text-sm text-gray-500 '>{userData.role} </p>
        </div>

        <div className='mt-6 space-y-4 '>
          <div className='text-sm flex items-center justify-start gap-2 '>
            <span className='font-semibold text-gray-700 '>Email:</span>
            <span> {userData.email}</span>
          </div>
          <div className='text-sm flex items-center justify-start gap-2 '>
            <span className='font-semibold text-gray-700 '>Bio:</span>
            <span> {userData.description}</span>
          </div>
          <div className='text-sm flex items-center justify-start gap-2 '>
            <span className='font-semibold text-gray-700 '>Enrolled Courses:</span>
            <span> {userData.enrolledCourses?.length}</span>
          </div>
        </div>
        <div className='mt-6 flex justify-center gap-4 '>
          <button className='px-5 py-2 rounded-2xl bg-black text-white active:bg-[#4b4b4b] cursor-pointer transition ' onClick={()=> navigate("/updateProfile")}>Edit Profile</button>
          </div>
      </div>
    </div>
  ) 
}

export default Profile