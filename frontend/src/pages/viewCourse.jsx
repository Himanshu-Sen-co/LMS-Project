import React, { use, useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6"; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {setSelectedCourse} from '../redux/courseSlice'
import empty from '../assets/empty.jpg'
import { FaStar } from "react-icons/fa6";
import axios from 'axios';
import { apiUrl } from '../App';
import Card from '../component/card';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';


function ViewCourse() {
  const navigate = useNavigate()
  const {courseId} = useParams()
  const {courseData} = useSelector(state=>state.course)
  const {userData} = useSelector(state=>state.user)
  const userId = userData?._id  
  const {selectedCourse} = useSelector(state=>state.course)
  const dispatch = useDispatch()
  const [selectedLecture, setSelectedLecture] = useState(null)
  const [creatorData, setCreatorData] = useState(null)
  const [creatorCourses, setCreatorCourses] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');  
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const handleCreatorData = async () => {
        if (selectedCourse?.creator) {
          try {
            const response = await axios.post(`${apiUrl}/api/course/getCreatorById`, {userId:selectedCourse?.creator}, {withCredentials:true});
            console.log(".......................................................................", response.data);
            
            setCreatorData(response.data);
        } catch (error) {
            console.error("Error fetching creator data:", error);
        }
        }
    };
    handleCreatorData();

  }, [selectedCourse]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCoursesList = courseData.filter(course => course.creator === creatorData._id && course._id !== courseId);
      setCreatorCourses(creatorCoursesList);
    }
  }, [creatorData, courseData, courseId]);

  const fetchcourseData = async () => {
    courseData?.map((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course))
        // console.log("==================",selectedCourse?.lectures);
        return null
      }
  })
  }

  const handleEnroll = async (userId, courseId) => {
    try {
      const result = await axios.post(`${apiUrl}/api/order/createOrder`, {userId, courseId}, {withCredentials:true})
      console.log("Order Result ===================", result.data);
      const option = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "VidyaFlow",
        description: "Course Enrollment Payment",
        order_id: result.data.id,
        handler: async function (response) {
          console.log("Payment Response ===================", response);
          try {
            const verifyResponse = await axios.post(`${apiUrl}/api/order/verifyPayment`, {
              ...response,
              userId,
              courseId
            }, {withCredentials:true});
            setIsEnrolled(true);
            console.log("Payment Verification Response ===================", verifyResponse.data);
            toast.success(verifyResponse.data.message);
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
      }
      const rzp1 = new Razorpay(option);
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to enroll in course");
    }
  }

  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some((course) => (typeof course === 'string' ? course : course._id).toString() === courseId.toString());
    if (verify) {
      setIsEnrolled(true);
    } 
  } 
  const handleReviewSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/review/createReview`, { courseId, rating, comment }, { withCredentials: true });
      console.log("Review Response ===================", response.data);
      toast.success(response?.data?.message || "Review submitted successfully");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    }finally {
      setLoading(false);
      setRating(0)
      setComment('')
    }
  }

  const calculatAavarageReview = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }

  const averageRating = calculatAavarageReview(selectedCourse?.reviews);
  

  useEffect(() => {
    checkEnrollment();
  }, [userData, courseId]);

    useEffect(()=>{
    fetchcourseData()
    
  },[courseData, courseId])

  return (
    <div className='min-h-screen bg-gray-50 p-6 '>
      <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative '>

      {/* Top Section  */}
      <div className='flex flex-col md:flex-row gap-6 '>
        {/* thumbnail */}
        <div className=' w-full md:w-1/2'>
          <FaArrowLeftLong className='text-black w-[22px] h-[22px] cursor-pointer ' onClick={()=> navigate("/")} />
          {selectedCourse?.thumbnail ? <img src={selectedCourse?.thumbnail} className='rounded-xl w-full object-cover' />: <img src={empty} className='rounded-xl w-full object-cover' />}
        </div>
        {/* Course Info  */}
        <div className='flex-1 space-y-2 mt-[20px] '>
          <h2 className='text-2xl font-bold '>{selectedCourse?.title}</h2>
          <p className='text-gray-600'>{selectedCourse?.subTitle} </p>
          <div className='flex flex-col items-start justify-between '>
            <div className='text-yellow-500 font-medium flex gap-2'>
              <span className='flex items-center justify-start gap-1 '><FaStar />{averageRating}</span>
              <span className='text-gray-400 '>(1,200 Reviews)</span>
            </div>
            <div>
              <span className='text-xl font-semibold text-black '>₹{selectedCourse?.price}</span>
              <span className='line-through text-sm text-gray-400 ml-1'>₹599</span>
            </div>
            <ul className='text-sm text-gray-700 space-y-1 pt-2 '>
              <li>✔️ 10+ Hours of video content </li>
              <li>✔️ Lifetime access to course Meterial </li>
            </ul>
            {isEnrolled ? (
              <button className='bg-green-200 text-green-700 px-6 py-2 rounded-xl hover:bg-green-400 mt-3 cursor-pointer' onClick={()=> navigate(`/viewLectures/${courseId}`)}>Watch now</button>
            ) : (
              <button className='bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-700 mt-3 cursor-pointer ' onClick={() => handleEnroll(userId, courseId)}>Enroll Now </button>
            )}
          </div>
        </div>

      </div>

      <div>
        <h2 className='text-xl font-semibold mb-2 '>What You'll Learn </h2>
        <ul className='list-disc pl-6 text-gray-700 space-y-1 '>
          <li>Learn {selectedCourse?.category} from beginning</li>
        </ul>
      </div>
      <div>
        <h2 className='text-xl font-semibold mb-2 '>Who This Course is for </h2>
        <p className='text-gray-700 '>Beginners ,aspiring developers, and profetionals looking to upgrade skills.</p>
      </div>
      <div className='flex flex-col md:flex-row gap-6 '>
        <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200 '>
        <h2 className='text-xl font-bold mb-1 text-gray-800 '>Course Curriculum </h2>
        <p className='text-sm text-gray-500 mb-4 '>{selectedCourse?.lectures?.length} Lectures </p>
        <div className='flex flex-col gap-3 '>
          {selectedCourse?.lectures?.map((lecture, index) => (
            <button key={index} disabled={!lecture.isPreviewFree} onClick={()=>{
              if (lecture.isPreviewFree) {
                setSelectedLecture(lecture) 
              }
            }} className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${lecture.isPreviewFree ? 'cursor-pointer hover:bg-gray-100 border-gray-300' : 'cursor-not-allowed opacity-60 border-gray-200'} ${selectedLecture?.lectureTitle === lecture?.lectureTitle ? 'bg-gray-100 border-gray-400' : ''}`}>
              <span className='text-lg text-gray-700'>{lecture.isPreviewFree ? '▶' : '🔒'}</span><span className='text-lg text-gray-700'>{lecture.lectureTitle}</span></button>
          ))}
        </div>
        </div>
        <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
        <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>
          {selectedLecture?.videoUrl ? (
            <video controls className='w-full h-full object-cover'>
              <source src={selectedLecture?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>  
          ) : (
            <span className='text-white text-sm'>Select a lecture to preview</span>
          )}
        </div>
        </div>
      </div>
      {/* Review Section */}

      <div className='mt-8 pt-6 border-t'>
        <h2 className='text-xl font-semibold mb-2'>Write a Reviews</h2>
        <div className='mb-4'>
          <div className='flex gap-1 mb-2'>
            {[1,2,3,4,5].map((star)=>(
              <FaStar key={star} onClick={() => setRating(star)} className={star <= rating ? 'fill-amber-300' : 'fill-gray-300'} />
            ))}
          </div>
          <textarea onChange={(e) => setComment(e.target.value)} value={comment} className='w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ' rows={4} placeholder='Write your review here...' />
        </div>
        <div>
          <button className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800 cursor-pointer ' onClick={handleReviewSubmit} disabled={loading}>{ loading ? <ClipLoader size={30} color='white' /> : "Submit Review"}</button>
        </div>
      </div>
      {/* For Creator Info */}
      <div className='flex items-center gap-4 pt-4 border-t'>
            {creatorData?.photoUrl ? <img src={creatorData?.photoUrl} alt="" className="w-16 h-16 rounded-full object-cover border-1 border-gray-200" /> : <img src={empty} alt="" className="w-16 h-16 rounded-full object-cover border" />}
            <div>
              <h2 className='text-lg font-semibold'>{creatorData?.name}</h2>
              <p>{creatorData?.description}</p>
              <p className='text-gray-600 md:text-sm text-[10px] '>{creatorData?.email}</p>
            </div>
      </div>
      {/* Other Courses by Creator  */}
     <div>
      <p className='text-xl font-semibold mb-2'>Other public courses by {creatorData?.name} -</p>
     </div>
     <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>
      {
        creatorCourses && creatorCourses.length > 0 ? creatorCourses.map((course, index) => (
          <Card key={index} thumbnail={course.thumbnail} title={course.title} id={course._id} price={course.price} category={course.category} reviews={course?.reviews} />
        )) : <p>No courses available</p>
      }
     </div>
      </div>
    </div>
  )
}

export default ViewCourse