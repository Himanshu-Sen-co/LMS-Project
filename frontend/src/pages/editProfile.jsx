import axios from 'axios';
import React, { use, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { apiUrl } from '../App';

function EditProfile() {
    const navigate = useNavigate();
    const {userData} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [name, setName] = useState(userData.name || "")
    const [description, setDescription] = useState(userData.description || "")
    const [photoUrl, setPhotoUrl] = useState(null);
    const [loading, setLoading] = useState(false);  

    const handleSubmit = async (e) => {
        setLoading(true)
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (photoUrl) {
          formData.append("photoUrl", photoUrl);
        }
        const result = await axios.post(`${apiUrl}/api/user/updateProfile`, formData, {withCredentials: true});
        console.log(result.data);
        dispatch(setUserData(result.data.user));
        toast.success(result.data.message || "Profile Updated Successfully!");
        navigate("/profile");
      } catch (error) {
        toast.error(error.response?.data?.message || "Profile Update Failed!");
        console.log("Profile update error", error);
      } finally {
        setLoading(false)
      }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 '>
        <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative '>
        <FaArrowLeftLong className='absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer ' onClick={()=> navigate("/profile")} />
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6 '>Edit Profile</h2>
            <form action="" className='space-y-5 ' onSubmit={(e)=> e.preventDefault()}> 
                <div className='flex flex-col items-center text-center '>
                    {userData?.photoUrl ?<img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-black ' alt="" />: <div className='w-24 h-24 rounded-full bg-black flex items-center justify-center text-4xl text-white border-4 border-white  '> {userData ? userData.name?.charAt(0).toUpperCase() : ""} </div>}

                </div>
                <div>
                    <label htmlFor="image" className='text-sm font-medium text-gray-700 '>Select Avtar</label>
                    <input type="file" id='image' accept='image/*' name='photoUrl' placeholder='select profile image' className='w-full px-4 py-2 border rounded-md text-sm ' onChange={(e)=> setPhotoUrl(e.target.files[0])}/>
                </div>
                <div>
                    <label htmlFor="name" className='text-sm font-medium text-gray-700 '>Username</label>
                    <input type="text" id='name' placeholder={userData.name} className='w-full px-4 py-2 border rounded-md text-sm ' onChange={(e)=> setName(e.target.value)} value={name}/>
                </div>
                <div>
                    <label htmlFor="email" className='text-sm font-medium text-gray-700 '>Email</label>
                    <input type="email" id='email' readOnly placeholder={userData.email} className='w-full px-4 py-2 border rounded-md text-sm '/>
                </div>
                <div>
                    <label htmlFor="description" className='text-sm font-medium text-gray-700 '>Bio</label>
                    <textarea id="description" name='description' rows="3" placeholder={userData.description || "Tell us about your-self"} className='w-full px-4 py-2 border rounded-md resize-none mt-1 border-gray-300 focus:ring-2 focus:ring-black ' onChange={(e)=> setDescription(e.target.value)} value={description} />
                </div>
                <button className='w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium cursor-pointer hover:bg-gray-800 transition ' onClick={handleSubmit} disabled={loading}>{loading ? <ClipLoader size={30} color='white' />: "Save Changes"}</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfile
