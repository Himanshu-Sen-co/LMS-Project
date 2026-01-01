import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { apiUrl } from '../App.jsx';

function ForgetPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Reset Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // function for step 1

    const sendOtp = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${apiUrl}/api/auth/sentotp`, { email }, { withCredentials: true });
            console.log(result.data);
            setLoading(false);
            setStep(2);
            toast.success(result.data.message);
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }

    // function for step 2 can be added here

    const VerifyOtp = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${apiUrl}/api/auth/verifyotp`, { email, otp }, { withCredentials: true });
            console.log(result.data);
            setLoading(false);
            setStep(3);
            toast.success(result.data.message);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
            
        }
    }

    //  function for step 3 can be added here

    const resetPassword = async () => {
        setLoading(true);
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            setError("Passwords do not match");
            return;
        }
        try {
            const result = await axios.post(`${apiUrl}/api/auth/resetpassword`, { email, newPassword }, { withCredentials: true });
            console.log(result.data);
            setLoading(false);
            toast.success(result.data.message);
            navigate("/login");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 '>
        {/* Step 1  */}
       {step == 1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full  '>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forget Your Password</h2>
        <form action="" onSubmit={(e)=> e.preventDefault()} className='space-y-4'>
        <div>
            <label className='block text-gray-700 font-medium text-sm ' htmlFor='email'>Enter your registered email address:</label>
        <input type='email' id='email' onChange={(e)=> setEmail(e.target.value)} value={email} className='w-full px-4 py-2 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black' placeholder='you@example.com' required />
        </div>
        <button className='w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer ' disabled={loading} onClick={sendOtp} >{loading ? <ClipLoader size={30} color="white" /> :"Send OTP"}</button>

        </form>
        <div className=' text-sm text-center mt-4 ' onClick={()=> navigate("/login")} >Back to Login </div>
        </div>}

        {/* step 2  */}
        {step == 2 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full  '>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'> Verify OTP</h2>
        <form action="" onSubmit={(e)=> e.preventDefault()} className='space-y-4'>
        <div>
            <label className='block text-gray-700 font-medium text-sm ' htmlFor='otp'>Please enter the 4-digit code sent to your Email </label>
        <input type='text' id='otp' onChange={(e)=> setOtp(e.target.value)} value={otp} className='w-full px-4 py-2 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black' placeholder='****' />
        </div>
        <button className='w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer ' disabled={loading} onClick={VerifyOtp} >{loading ? <ClipLoader size={30} color="white" /> :"Verify OTP"}</button>

        </form>
        <div className=' text-sm text-center mt-4 ' onClick={()=> navigate("/login")} >Back to Login </div>
        </div>}

        {/* Step 3 */}
        {step == 3 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full  '>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>
        <p className='text-sm text-gray-600 text-center mb-6 '> Enter New Password below to regain access to your account </p>
        <form action="" onSubmit={(e)=> e.preventDefault()} className='space-y-4'>
            {error && <div className='text-red-500 text-sm mb-2'>{error}</div>}
        <div>
            <label className='block text-gray-700 font-medium text-sm ' htmlFor='password'>New Password :</label>
        <input type='text' id='password' onChange={(e)=> setNewPassword(e.target.value)} value={newPassword} className='w-full px-4 py-2 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black' placeholder='****************' />
        </div>
        <div>
            <label className='block text-gray-700 font-medium text-sm ' htmlFor='conPassword'>Confirm Password :</label>
        <input type='text' id='conPassword' onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword} className='w-full px-4 py-2 border border-gray-300 rounded-md mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-black' placeholder='****************' />
        </div>
        <button className='w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer ' disabled={loading} onClick={resetPassword}>{loading ? <ClipLoader size={30} color="white" /> :"Reset Password"}</button>

        </form>
        <div className=' text-sm text-center mt-4 ' onClick={()=> navigate("/login")} >Back to Login </div>
        </div>}
    </div>
  )
}

export default ForgetPassword