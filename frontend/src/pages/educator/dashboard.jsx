import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";  
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Navbar from '../../component/nav';

function Dashboard() {
    const {userData} = useSelector(state => state.user)
    const navigate = useNavigate()
      const {creatorCourseData} = useSelector(state => state.course)
    
        const courseProgressGraph = creatorCourseData?.map(course => ({
            name: course.title?.slice(0, 10) + "...",
            lectures: course.lectures?.length || 0,
        })) || [];
    
        const enrolledData = creatorCourseData?.map(course => ({
            name: course.title?.slice(0, 10) + "...",
            enrolled: course.enrolledStudents?.length || 0,
        })) || [];

        const totalEarnings = creatorCourseData?.reduce((total, course) => total + (course.price || 0) * (course.enrolledStudents?.length || 0), 0) || 0;

  return (
    <div className='flex min-h-screen bg-gray-100 mt-15 '>
      <Navbar />
         <FaArrowLeftLong className='absolute top-[14%] left-[5%] w-[22px] h-[22px] cursor-pointer ' onClick={()=> navigate("/")} />
        <div className='w-full px-6 py-10 space-y-10 '>
            {/* main section  */}
            <div className=' max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 '>
                <img src={userData?.photoUrl || userData?.name.slice(0,1).toUpperCase()} className=' w-28 h-28 rounded-full object-cover border-4 border-black shadow-md ' alt="Educator" />
                <div className='text-center md:text-left space-y-1 '>
                    <h1 className='text-2xl font-bold text-gray-800 '>Welcome, {userData?.name || "Educator"} 👋</h1>
                    <h1 className='text-xl font-semibold text-gray-800 '> Total earning: ₹{totalEarnings}</h1>
                    <p className='text-sm text-gray-600 '> {userData?.description || "Start creating courses for students"} </p>
                    <h1 className='px-[10px] py-[10px] text-center border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light flex gap-2 cursor-pointer items-center justify-center ' onClick={()=> navigate("/courses")}>Create Courses</h1>
                </div>
            </div>

            {/* graph section  */}
            <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 '>
              {/* for course progress graph  */}
              <div className='bg-white rounded-lg shadow-md p-6 '>
                <h2 className='text-lg font-semibold mb-4 '> Course Progress (Lectures)  </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={courseProgressGraph}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="lectures" fill="black" radius={[5,5,0,0]} />
                  </BarChart>
                  </ResponsiveContainer>
              </div>

              {/* for enrolled students graph  */}

              <div className='bg-white rounded-lg shadow-md p-6 '>
                <h2 className='text-lg font-semibold mb-4 '> Student Enrollments  </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={enrolledData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="enrolled" fill="black" radius={[5,5,0,0]} />
                  </BarChart>
                  </ResponsiveContainer>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard