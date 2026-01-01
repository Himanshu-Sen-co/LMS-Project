import axios from 'axios'
import React, { useEffect } from 'react'
import { apiUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setCourseData } from '../redux/courseSlice'

async function getPublishedCourse() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getCourseData = async () => {
            try {
                const result = await axios.get(`${apiUrl}/api/course/getPublishedCourses`, {withCredentials:true})
                console.log("=+++++++++++++++++++++++++++++", result.data);
                dispatch(setCourseData(result.data))
            } catch (error) {
                console.log("=+++++++++++++++++++++++++++++", error);
            }
        }

        getCourseData()
    },[])
}

export default getPublishedCourse