import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiUrl } from '../App'
import { setCreatorCourseData } from '../redux/courseSlice'

function GetCreatorCourse() {
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.user)
    useEffect(() => {
        const creatorCourse = async ()=> {
        try {
            const result = await axios.get(`${apiUrl}/api/course/getCreatorCourses`, {withCredentials:true})
            console.log(result.data);
            
            dispatch(setCreatorCourseData(result.data))
        } catch (error) {
            console.log(error);
            
        }
        
    }
    creatorCourse()
    }, [userData])
  return (
    <></>
  )
}

export default GetCreatorCourse