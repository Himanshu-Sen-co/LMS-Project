import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { apiUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice'

function getAllReviews() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchReviews = async () => {
        try {
                const result = await axios.get(`${apiUrl}/api/review/getReviews`, {withCredentials:true});
                dispatch(setReviewData(result.data))
                console.log("Fetched Reviews:", result.data);
            
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }}
        fetchReviews();
    }, [])
}

export default getAllReviews