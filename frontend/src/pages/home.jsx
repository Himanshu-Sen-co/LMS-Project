import React from 'react'
import Navbar from '../component/nav'
import home from '../assets/banner.png'
import { SiViaplay } from "react-icons/si";
import searchAi from '../assets/aisearch.jpg'
import aisearchW from '../assets/aisearchW.jpg'
import Logos from '../component/logos';
import ExploreCourses from '../component/exploreCourses';
import CardPage from '../component/cardPage';
import { useNavigate } from 'react-router-dom';
import About from '../component/About';
import Footer from '../component/Footer';
import ReviewPage from '../component/ReviewPage';

function Home() {
  const navigate = useNavigate()
  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Navbar />
        <img src={home} alt="" className=' object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh] ' />
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[12%] w-[100%] flex items-center justify-center text-white font-bold text-[20px] '> Grow your Skills to Aavance</span>
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold text-[20px] '>Your carrier path.</span>
        <div className=' absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap '>
          <button className=' px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer ' onClick={() => navigate("/allCourses") }>View All Courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black '/>
          </button>
          <button className=' px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer ' onClick={() => navigate("/search")}>Search with AI <img src={aisearchW} className='w-[30px] h-[30px] rounded-full lg:block hidden ' alt="" /> <img src={searchAi} className='w-[30px] h-[30px] rounded-full lg:hidden ' alt="" /></button>
        </div>
      </div>
        <Logos />
        <ExploreCourses />
        <CardPage />
        <About />
        <ReviewPage />
        <Footer />
    </div>
  )
}

export default Home