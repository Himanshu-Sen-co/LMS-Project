
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6"; 

function MyEnrolledCourses() {
    const {userData} = useSelector((state) => state.user);
    const navigate = useNavigate();
  return (
    <div className='min-h-screen w-full px-4 py-9 bg-gray-50'>
        <FaArrowLeftLong className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer ' onClick={() => navigate("/")} />
        <h1 className='text-center text-3xl font-bold text-gray-800 mb-6'>My Enrolled Courses</h1>
        {userData?.enrolledCourses?.length === 0 ? (
            <p className='text-center text-gray-500 w-full'>You have not enrolled in any courses yet.</p>
        ) : (
            <div className='flex items-center justify-center flex-wrap gap-[30px]'>
                {userData?.enrolledCourses?.map((course, index) => (
                    <div key={index} className='bg-white rounded-2xl shadow-md border overflow-hidden cursor-pointer'>
                        <img src={course?.thumbnail} alt="" className='w-full h-40 object-cover ' />
                        <div className='p-4'>
                            <h2 className='text-lg font-semibold text-gray-800'>{course?.title}</h2>
                            <p className='text-gray-600 text-sm mb-2'>{course?.category}</p>
                            <p className='text-gray-600 text-sm mb-2'>{course?.level}</p>
                            <h1 className='px-[10px] text-center py-[10px] border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer mt-[10px] hover:bg-gray-600' onClick={() => navigate(`/viewLectures/${course._id}`)}>Watch Now</h1>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default MyEnrolledCourses