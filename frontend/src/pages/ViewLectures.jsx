import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrl } from '../App'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FaArrowLeftLong } from "react-icons/fa6"; 

function ViewLectures() {
    const {courseId} = useParams()
    const {courseData} = useSelector((state) => state.course)
    const {userData} = useSelector((state) => state.user)
    const selectedCourse = courseData?.find(course => course._id === courseId)
    const navigate = useNavigate()
    const [creatorData, setCreatorData] = useState(null)
    const [selectedLecture, setSelectedLecture] = useState(selectedCourse?.lectures?.[0] || null)

    useEffect(() => {
  if (selectedCourse?.lectures?.length > 0) {
    setSelectedLecture(selectedCourse.lectures[0]);
  }
}, [selectedCourse]);

      useEffect(() => {

    const handleCreatorData = async () => {
        console.log("Selected Course in View Lectures:", selectedCourse);
        if (selectedCourse?.creator) {
          try {
            const response = await axios.post(`${apiUrl}/api/course/getCreatorById`, {userId:selectedCourse?.creator}, {withCredentials:true});
            // console.log(".......................................................................", response.data);
            
            setCreatorData(response.data);
        } catch (error) {
            console.error("Error fetching creator data:", error);
        }
        }
    };
    handleCreatorData();

  }, [selectedCourse]);
  return (
    <div className='min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6 '>
        {/* left ot top */}
        <div className='md:w-2/3 w-full bg-white rounded-2xl shadow-md p-6 border border-gray-200'>
        <div className="mb-6">
            <h2 className='text-2xl font-semibold flex items-center justify-start gap-[20px] text-gray-800'> <FaArrowLeftLong className='text-black w-[22px] h-[22px] cursor-pointer ' onClick={()=> navigate("/")} /> {selectedCourse?.title}</h2>

            <div className='mt-2 flex gap-4 text-sm text-gray-500 font-medium '>
                <span> Category : {selectedCourse?.category}</span><span>   
                    </span><span>
                    Level : {selectedCourse?.level}
                    </span>
            </div>

        </div>

        {/* video player  */}
            <div className='aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300'>

                {selectedLecture?.videoUrl ? (
                        <video src={selectedLecture?.videoUrl} controls className='w-full h-full object-cover' />
                ) : (
                    <div className='h-full text-white flex items-center justify-center'> Select a lecture to start watching </div>
                )}
            </div>

            <div className='mt-2 '>
                <h2 className='text-xl font-semibold text-gray-800'> {selectedLecture?.lectureTitle} </h2>
            </div>
        </div>

        {/* right or bottom */}
        <div className='w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit '>
        <h2 className='text-xl font-bold mb-4 text-gray-800 '>All Lectures </h2>
        <div className='flex flex-col gap-3 mb-6  '>
            {selectedCourse?.lectures?.length > 0 ? selectedCourse.lectures.map((lecture, index) => (
                <button
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer flex items-center justify-between border transition text-left ${selectedLecture?._id === lecture._id ? 'bg-gray-100 border border-gray-500' : 'border-gray-300 hover:bg-gray-100'}`}
                    onClick={() => setSelectedLecture(lecture)}
                >
                    <h2 className='font-semibold text-sm text-gray-800'>{lecture.lectureTitle}</h2> <span className='text-lg text-black'> ▶ </span>
                </button>
            )) : (<p className='text-gray-500 '>No lectures available</p> )}

        </div>
        {/* educator Info */}

        {creatorData && <div className='mt-4 pt-4 border-t '> 
            <h3 className='text-md font-semibold text-gray-700 mb-3 '>Educator </h3>
            <div className='flex items-center gap-4  '> <img src={creatorData?.photoUrl} className='w-14 h-14 rounded-full object-cover ' alt="" /> </div>
            <div>
                <h2 className='text-base font-medium text-gray-800 '>{creatorData?.name}</h2>
                <p className='text-sm text-gray-600 '>{creatorData?.description}</p>
                <p>{creatorData?.email}</p>
            </div>
        </div>}
        </div>
    </div>
  )
}

export default ViewLectures