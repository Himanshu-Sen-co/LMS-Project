import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import { Routes, Route, Navigate } from 'react-router-dom'  
export const apiUrl = "https://lms-project-ztr0.onrender.com"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import GetCurrentUser from './customHooks/getCurrentUser.jsx';
import { useSelector } from 'react-redux'
import Profile from './pages/profile.jsx'
import ForgetPassword from './pages/forgetPassword.jsx'
import EditProfile from './pages/editProfile.jsx'
import { ClipLoader } from 'react-spinners'
import Dashboard from './pages/educator/dashboard.jsx'
import Courses from './pages/educator/courses.jsx'
import CreateCourses from './pages/educator/createCourses.jsx'
import getCreatorCourse from './customHooks/getCreatorCourse.jsx'
import EditCourse from './pages/educator/editCourse.jsx'
import getPublishedCourse from './customHooks/getPublishedCourse.jsx'
import AllCourses from './pages/allCourses.jsx'
import CreateLecture from './pages/educator/createLecture.jsx'
import EditLecture from './pages/educator/editLecture.jsx'
import ViewCourse from './pages/viewCourse.jsx'
import ScrollToTop from './component/ScrollToTop.jsx'
import ViewLectures from './pages/ViewLectures.jsx'
import MyEnrolledCourses from './pages/myEnrolledCourses.jsx'
import getAllReviews from './customHooks/getAllReviews.jsx'
import SearchWithAi from './pages/searchWithAi.jsx'

function App() {

  const loading = GetCurrentUser();
  getCreatorCourse()
  getPublishedCourse()
  getAllReviews()
  const { userData} = useSelector((state) => state.user)
  
  const [count, setCount] = useState(0)

   if (loading) {
    return <div className="flex items-center justify-center h-screen"> <ClipLoader size={100} color='gray' /> </div>;
  }

  return (
    <>
    <ToastContainer autoClose={3000} />
    <ScrollToTop />
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/signup" element={ !userData ?<Signup /> : <Navigate to={"/"} />} />
      <Route path="/login" element={!userData ? <Login /> : <Navigate to={"/"} />} />
      <Route path="/profile" element={userData ? <Profile /> : <Navigate to={"/login"} />} />
      <Route path="/updateProfile" element={userData ? <EditProfile /> : <Navigate to={"/login"} />} />
      <Route path="/allCourses" element={userData ? <AllCourses /> : <Navigate to={"/login"} />} />
      <Route path="/forget" element={!userData ? <ForgetPassword /> : <Navigate to={"/"} />} />
      <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/login"} />} />
      <Route path="/courses" element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/login"} />} />
      <Route path="/createCourse" element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to={"/login"} />} />
      <Route path="/editCourse/:courseId" element={userData?.role === "educator" ? <EditCourse /> : <Navigate to={"/login"} />} />
      <Route path="/createLecture/:courseId" element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/login"} />} />
      <Route path="/editLecture/:courseId/:lectureId" element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/login"} />} />
      <Route path="/viewCourse/:courseId" element={userData ? <ViewCourse /> : <Navigate to={"/login"} />} />
      <Route path="/viewLectures/:courseId" element={userData ? <ViewLectures /> : <Navigate to={"/login"} />} />
      <Route path="/mycourses" element={userData ? <MyEnrolledCourses /> : <Navigate to={"/login"} />} />
      <Route path="/search" element={<SearchWithAi />} />


      </Routes>
      </>
  )
}

export default App
