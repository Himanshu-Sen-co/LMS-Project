import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setLectureData } from '../../redux/lectureSlice';
import { ClipLoader } from 'react-spinners';

function EditLecture() {
    const navigate = useNavigate()
    const {courseId, lectureId} = useParams()
    const {lectureData} = useSelector(state => state.lecture)
    const dispatch = useDispatch()

    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle)
    const [videoUrl, setVideoUrl] = useState("")
    const [isPreviewFree, setIsPreviewFree] = useState(selectedLecture?.isPreviewFree || false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)

    const formData = new FormData()
    formData.append("lectureTitle", lectureTitle )
    formData.append("videoUrl", videoUrl)
    formData.append("isPreviewFree", isPreviewFree)

    const handleEditLecture = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${apiUrl}/api/course/editLecture/${lectureId}`, formData, {withCredentials:true})
            console.log(result.data);
            setLoading(false)
            dispatch(setLectureData([...lectureData, result.data]))
            toast.success("lecture updated")
            navigate("/courses")
            
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    const removeLecture = async () => {
        setLoading1(true)
        try {
            const result = await axios.delete(`${apiUrl}/api/course/deleteLecture/${lectureId}`, {withCredentials:true})
            console.log(result.data);
            setLoading1(false)
            toast.success("Lecture Deleted.")
            navigate(`/createLecture/${courseId}`)

        } catch (error) {
            console.log(error);
            setLoading1(false)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4 '>
        <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6 '>
            {/* header  */}
            <div className='flex items-center gap-2 mb-2 '>
                <FaArrowLeftLong className='text-gray-600 cursor-pointer font-semibold ' onClick={() => navigate(`/createLecture/${courseId}`)}/>
                <h2 className='text-xl font-semibold text-gray-800 '> Update Course Lecture </h2>
            </div>
            <button className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm' onClick={removeLecture} disabled={loading1}>{loading1 ? <ClipLoader size={30} color='white' /> :"Remove Lecture"} </button>
            <div className='space-y-4'>
                <div>
                    <label htmlFor="lectureTitle" className='block text-sm font-medium text-gray-700 mb-1'>Lecture Title *</label>
                    <input type="text" id='lectureTitle' onChange={(e)=>setLectureTitle(e.target.value)} value={lectureTitle} className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none ' required/>
                </div>

                <div>
                    <label htmlFor="videoUrl" className='block text-sm font-medium text-gray-700 mb-1'>Video * </label>
                    <input type="file" id='lectureTitle'  className='w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-500' required accept='video/*' onChange={(e)=> setVideoUrl(e.target.files[0])}/>
                </div>

                <div className='flex items-center gap-3'>
                    <input type="checkbox" className='accent-black h-4 w-4 ' id='isFree' onChange={()=> setIsPreviewFree(prev => !prev)} />
                    <label htmlFor="isFree" className='text-sm text-gray-700 '>Is this video free </label>

                </div>
                    {loading ? <p>Uploading video... Please wait.</p> : ""}

                <div className='pt-4 '>
                    <button className='w-full bg-black text-white rounded-md py-3 text-sm font-medium hover:bg-gray-700 transition ' onClick={handleEditLecture} disabled={loading} >{loading ? <ClipLoader size={30} color='white' /> : "Update Lecture "} </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditLecture