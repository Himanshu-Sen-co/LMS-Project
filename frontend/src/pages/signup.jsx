import React, { useState } from 'react'
import vidyaFlow from '../assets/vidyaFlow.png' 
import glogo from '../assets/glogo.jpg'
import google from '../assets/google.png'
import googlelogo from '../assets/googlelogo.png'
import glogo2 from '../assets/glogo2.png'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { apiUrl } from '../App.jsx';
 import { toast } from 'react-toastify';
 import {ClipLoader} from "react-spinners";
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/firebase.js'


function Signup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const handleSignup = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/auth/signup`, {
        name,
        email,
        password,
        role
      },{withCredentials: true});
      console.log(response);
      dispatch(setUserData(response.data));
      setLoading(false);
      toast.success("Signup Successful! Please login.");
      navigate("/login"); 

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message || "Signup failed. Please try again.");
      
    }
    
  };

  const googleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const googleName = user.displayName;
      const googleEmail = user.email;

      const response = await axios.post(`${apiUrl}/api/auth/googleSignup`, { 
        name: googleName,
        email: googleEmail,
        role
      }, { withCredentials: true });  
      dispatch(setUserData(response.data.user));
      toast.success("Signup Successfully");
      navigate("/"); 

      // const Password = user.uid;
      console.log(result); 
    } catch (error) {
      toast.error("Google Signup failed. Please try again.");
      console.log(error);
    }
  };


  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex justify-center items-center gap-3'>
      <form className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex ' onSubmit={(e)=> e.preventDefault()}>
        {/* left div */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col justify-center items-center gap-3'>
          <div>
            <h1 className='text-2xl font-bold text-black'>Let's get started</h1>
          <h2 className='text-[#999797] text-[18px]'>Create your Account</h2>
          </div>
        
        <div className='flex flex-col justify-center items-start gap-1 w-[80%] px-3 '>
          <label htmlFor="name" className='font-semibold'>Name</label>
          <input type="text" id='name' placeholder='Your name' className='border-1 w-[100%] h-35px] border-[#e7e6e6] text-[15px] px-[15px]' onChange={(e)=> setName(e.target.value)} value={name} required />
        </div>
        <div className='flex flex-col justify-center items-start gap-1 w-[80%] px-3 '>
          <label htmlFor="email" className='font-semibold'>Email</label>
          <input type="text" id='email' placeholder='Your email' className='border-1 w-[100%] h-35px] border-[#e7e6e6] text-[15px] px-[15px]' onChange={(e)=> setEmail(e.target.value)} value={email} required />
        </div>
        <div className='flex flex-col justify-center items-start gap-1 w-[80%] px-3 relative'>
          <label htmlFor="password" className='font-semibold'>Password</label>
          <input type={show ? "text" : "password"} id='password' placeholder='Your password' className='border-1 w-[100%] h-35px] border-[#e7e6e6] text-[15px] px-[15px]' onChange={(e)=> setPassword(e.target.value)} value={password} required/>
          {show ? <IoIosEyeOff className='absolute right-[5%] bottom-[10%] w-[20px] h-[20px] cursor-pointer' onClick={() => setShow(!show)} /> : <IoIosEye className='absolute right-[5%] bottom-[10%] w-[20px] h-[20px] cursor-pointer' onClick={() => setShow(!show)} />}
        </div>
        <div className='md:w-[50%] flex w-[70%] items-center justify-between'>
          <span className={`px-[10px] py-[5px] border-[2px] rounded-xl cursor-pointer border-[#e7e6e6] hover:border-black ${role =="student"? "border-black":"border-[#646464]"}`} onClick={()=> setRole("student")}>Student</span>
          <span className={`px-[10px] py-[5px] border-[2px] rounded-xl cursor-pointer border-[#e7e6e6] hover:border-black  ${role =="educator"? "border-black":"border-[#646464]"}`}  onClick={()=> setRole("educator")}>Educator</span>
        </div>
        <button className='flex items-center justify-center cursor-pointer bg-black text-white rounded-[5px] w-[80%] h-[40px]' onClick={handleSignup} disabled={loading}>{loading ? <ClipLoader  size={30} color='white'/> : "Sign UP"}</button>
        <div className='w-[80%] flex items-center gap-2'>
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          <div className='w-[50%] text-[15px] flex text-[#6f6f6f] items-center justify-center'>or continue</div>
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
        </div>
        <div className='w-[80%] h-[40px] flex items-center justify-center border-1 border-black rounded-[5px]' onClick={googleSignup}>
          <img src={glogo2} alt="google" className='w-[30px]'/>
          <span className='text-[18px] text-gray-500'>oogle</span>
        </div>
        <div className='text-[#6f6f6f]' onClick={()=> navigate("/login")}>Already have an account? <span className='underline underline-offset-1 text-black' >Login</span></div>
        </div>
        {/* right div */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>
          <img src={vidyaFlow} alt="logo" className='w-100 shadow-2xl' />
        </div>
        
      </form>
    </div>
  )
}

export default Signup