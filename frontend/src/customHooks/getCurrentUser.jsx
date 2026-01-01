import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
 const GetCurrentUser = () => {
  const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/user/getCurrentUser`, { withCredentials: true });
                // console.log("Current User Data:", response.data);
                dispatch(setUserData(response.data));
            } catch (error) {
                console.error("Error fetching current user:", error);
                dispatch(setUserData(null));
            } finally {
                setLoading(false);
              } 
        };
        fetchCurrentUser();

    }, [])
  return loading;
}

export default GetCurrentUser
