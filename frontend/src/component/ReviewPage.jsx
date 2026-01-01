
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ReviewCard from './reviewCard'

function ReviewPage() {
    const {reviewData} = useSelector(state => state.review)
    const [letestReviews, setLetestReviews] = useState([])

    useEffect(() => {
        setLetestReviews(reviewData?.slice(0,6))
    }, [reviewData])
  return (
    <div className='flex items-center justify-center flex-col '>
        <h1 className='md:text-[45px] text-center text-[30px] font-semibold mt-[30px] px-[30px]'> Real Reviews for real courses</h1>
        <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px] '>Discover how Our Vidya Flow is transforming learning experiences through real feedback from students and profetionals worldwode.</span>
        <div className='w-[100%] min-h-[100vh] flex flex-wrap items-center justify-center gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px] '>
            {
                letestReviews?.map((review, index) => (
                    <ReviewCard key={index} Comment={review?.comment} rating={review?.rating} name={review?.user?.name} courseTitle={review?.course?.title} photoUrl={review?.user?.photoUrl} description={review?.user?.description} />
                ))
            }
        </div>
    </div>
  )
}

export default ReviewPage