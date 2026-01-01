import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";  
import { useNavigate, useParams } from 'react-router-dom';
import empty from '../../assets/empty.jpg'
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { apiUrl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';


function EditCourse() {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const thumbnail = useRef()
    const [isPublished, setIsPublished] = useState(false)
    const [selectCourse, setSelectCourse] = useState(null)
    const [title, setTitle] =useState("")
    const [subtitle, setSubTitle] =useState("")
    const [description, ssetDescription] =useState("")
    const [category, setCategory] =useState("")
    const [price, setPrice] =useState("")
    const [level, setLevel] =useState("")
    const [frontendImage, setFrontendImage] =useState(empty)
    const [backendImage, setBackendImage] =useState(null)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const dispatch = useDispatch()
    const {courseData} = useSelector(state => state.course)


    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }    


    const getCourseById = async () => {
        try {
            const result = await axios.get(`${apiUrl}/api/course/getCourseById/${courseId}`, {withCredentials:true})
            setSelectCourse(result.data)
            console.log(result.data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const removeCourse = async () => {
        setLoading1(true)
        try {
            const result = await axios.delete(`${apiUrl}/api/course/deleteCourse/${courseId}`, {withCredentials:true})
            console.log(result.data);
            const filterCourseData = courseData?.filter(c => c._id !== courseId)
            dispatch(setCourseData(filterCourseData))
            toast.success("Course removed.")
            navigate("/courses")
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally{
            setLoading1(false)
        }
    }

    const handleEditCourse = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append("title", title)
        formData.append("subTitle", subtitle)
        formData.append("description", description)
        formData.append("caregory", category)
        formData.append("level", level)
        formData.append("price", price)
        formData.append("thumbnail", backendImage)
        formData.append("isPublished", isPublished)
        try {
            const result = await axios.post(`${apiUrl}/api/course/editCourse/${courseId}`, formData, {withCredentials:true})
            console.log(result.data);
            const updateData = result.data
            if (updateData.isPublished) {
                const updateCourses = courseData?.map(c => c._id === courseId ? updateData : c)

                if (!courseData.some(c => c._id === courseId)) {
                    updateCourses.push(updateData)
                }
                dispatch(setCourseData(updateCourses))
            } else {
                const filterCourseData = courseData?.filter(c => c._id !== courseId)
            dispatch(setCourseData(filterCourseData))
            }
            toast.success("Course Updated.")
            navigate("/courses")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally{
            setLoading(false)
        }
    }

     useEffect(()=> {
        getCourseById()
    }, [])

    useEffect(() => {
        if (selectCourse) {
            setTitle(selectCourse.title || "")
            setSubTitle(selectCourse.subTitle || "")
            ssetDescription(selectCourse.description || "")
            setCategory(selectCourse.category || "")
            setLevel(selectCourse.level || "")
            setPrice(selectCourse.price || "")
            setFrontendImage(selectCourse.thumbnail || empty)
            setIsPublished(selectCourse?.isPublished)
        }
    }, [selectCourse])

    // console.log("==========================================+ ", selectCourse?._id);
    // console.log("\\\\\\\\\\\\\\\\\\\\\\\\\ ", courseId);
    
    
   

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md '>
        {/* top bar  */}
        <div className='flex items-center justify-center gap-[20px] md:justify-between md:flex-row flex-col mb-6 relative '>
            <FaArrowLeftLong className='absolute top-[-20%] md:top-[16%]  left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer ' onClick={()=> navigate("/courses")} />
            <h2 className='text-2xl font-semibold md:pl-[60px] '>
                Add Detail Information Regarding Course.
            </h2>
            <div className='space-x-2 space-y-2 '>
                <button className='bg-black text-white px-4 py-2 rounded-md' onClick={()=> navigate(`/createLecture/${courseId}`)}>Go to Lecture Page</button>
            </div>
        </div>

        {/* form detail  */}
        <div className='p-6 bg-gray-50 rounded-md '>
            <h2 className='text-lg font-medium mb-4 '>Basic Course Information </h2>
            <div className='space-y-2 space-x-2 '>
                {!isPublished ? <button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border-1 cursor-pointer' onClick={()=> setIsPublished(prev => !prev)}> Click To Publish</button> : <button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1 cursor-pointer' onClick={()=> setIsPublished(prev => !prev)}> Click To unPublish</button>}
                <button className='bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer' onClick={removeCourse} disabled={loading1}>{loading1 ? <ClipLoader size={30} color='white' /> :"Remove Course"} </button>
            </div>
            <form action="" className='space-y-6' onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1 '> Title</label>
                    <input type="text" className='w-full border px-4 py-2 rounded-md ' id='title' placeholder='courseTitle' onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div>
                    <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 mb-1 '> Subtitle</label>
                    <input type="text" className='w-full border px-4 py-2 rounded-md ' id='subtitle' placeholder='courseSubTitle' onChange={(e) => setSubTitle(e.target.value)} value={subtitle} />
                </div>
                {/* course description */}
                <div>  
                    <label htmlFor="des" className='block text-sm font-medium text-gray-700 mb-1 '> Description</label>
                    <textarea type="text" className='w-full border px-4 py-2 rounded-md h-24 resize-none' id='des' placeholder='course description' onChange={(e) => ssetDescription(e.target.value)} value={description} />
                </div>
                {/* for category , proce, level */}
                <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 '>
                    
                    {/* for category */}
                    <div className='flex-1'>
                        <label htmlFor="cat" className='block text-sm font-medium text-gray-700 mb-1 '>Course Category </label>
                        <select name="" id="cat" className='px-4 py-2 rounded-md bg-white w-full border' onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="">Select Category</option>
                        <option value="App Development">App Development </option>
                        <option value="AI/ML">AI/ML </option>
                        <option value="AI Tools"> AI Tools </option>
                        <option value="Data Science">Data Science </option>
                        <option value="Data Analytics">Data Analytics </option>
                        <option value="Ethical Hacking">Ethical Hacking </option>
                        <option value="UI UX Designing">UI UX Designing </option>
                        <option value="Web Development">Web Development </option>
                        <option value="Others">Others </option>
                        </select>
                    </div>


                    {/* for Level */}
                    <div className='flex-1'>
                        <label htmlFor="level" className='block text-sm font-medium text-gray-700 mb-1 '>Course Level </label>
                        <select name="" id="level" className='px-4 py-2 rounded-md bg-white w-full border' onChange={(e) => setLevel(e.target.value)} value={level}>
                        <option value="">Select Level</option>
                        <option value="beginner">Beginner </option>
                        <option value="intermediate">Intermediate </option>
                        <option value="advanced"> Advanced </option>
                        </select>
                    </div>


                    {/* for Price */}
                    <div className='flex-1'>
                        <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1 '>Course Price (INR) </label>
                        <input type="number" id='price' placeholder='₹' className='w-full border px-4 py-2 rounded-md' min={0} onChange={(e) => setPrice(e.target.value)} value={price} />
                    </div>

                </div>
                    {/* for thumbnail */}
                    <div className='flex-1'>
                        <label htmlFor="thumbnail" className='block text-sm font-medium text-gray-700 mb-1 '>Course Thumbnail </label>
                        <input type="file" id='thumbnail' onChange={handleThumbnail} hidden ref={thumbnail} accept='image/*' />
                    </div>

                    <div className='relative w-[300px] h-[170px] '>
                        <img src={frontendImage} alt="" className='w-[100%] h-[100%] border-1 border-black  rounded-[5px] ' onClick={()=> thumbnail.current.click()} />
                        <FaEdit className='w-[20px] h-[20px] absolute top-2 right-2 '  onClick={()=> thumbnail.current.click()}/>
                    </div>
                    {/* buttons */}

                    <div className='flex items-center justify-start gap-[15px] '>
                        <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md ' onClick={()=> navigate("/courses")}>Cancel</button>
                        <button className='bg-black text-white px-7 py-2 hover:bg-gray-500 rounded-md cursor-pointer ' onClick={handleEditCourse} disabled={loading} >{loading ? <ClipLoader size={30} color='white' /> : "Save"} </button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default EditCourse