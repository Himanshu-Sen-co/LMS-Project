import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './card'

function CardPage() {
    const {courseData} = useSelector(state => state.course)
    const [popularCourse, setPopularCourse] = useState([])

    useEffect(() => {
        setPopularCourse(courseData?.slice(0,6))
    }, [courseData])
  return (
    <div className='flex flex-col items-center justify-center relative '>
        <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px] '>Our Popular Courses </h1>
        <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px] '>Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, Business, and beyond.</span>
        <div className='w-[100%] min-h-[70vh] flex items-center justify-center gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px] '>
            {
                popularCourse?.map((course, index) => (
                    <Card key={index} thumbnail={course?.thumbnail} title={course?.title} price={course?.price} id={course?._id} category={course?.category} reviews={course?.reviews}  />
                ))
            }
        </div>
    </div>
  )
}

export default CardPage