import React, { useState } from "react";
import logo from "../assets/vidyaFlow.png";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [showHem, setShowHem] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      console.log(response.data);
      toast.success(response.data.message || "Logout Successful!");

      // if(response.status === 200){
      //   navigate("/login");
      // }
    } catch (error) {
      console.log("logout error", error);
      toast.error(error.response?.data?.message || "Logout Failed!");
    }
  };
  console.log(
    "===================================jhuygytftfy\\===============",
    userData?.role
  );

  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10 ">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px] " onClick={() => navigate("/")}>
          <img
            src={logo}
            alt=""
            className="rounded-[5px] border-2 border-white cursor-pointer w-[60px] "
          />
        </div>
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden ">
          {!userData && (
            <IoPersonCircle
              className="w-[50px] h-[50px] fill-black cursor-pointer "
              onClick={() => setShowProfile(!showProfile)}
            />
          )}
          {userData ? (
            userData.photoUrl ? (
              <img
                src={userData.photoUrl}
                className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
                onClick={() => setShowProfile(!showProfile)}
              />
            ) : (
              <div
                className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
                onClick={() => setShowProfile(!showProfile)}
              >
                {userData.name?.charAt(0).toUpperCase()}
              </div>
            )
          ) : null}

          {userData?.role == "educator" && (
            <div
              className="px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer  "
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5] "
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer "
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
          {showProfile && (
            <div className="absolute top-[94%] right-[8%] lg:right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black ">
              <span
                className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 "
                onClick={() => navigate("/profile")}
              >
                My Profile
              </span>
              <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 " onClick={() => navigate("/mycourses")}>
                My Courses
              </span>
            </div>
          )}
        </div>
        <RxHamburgerMenu
          className="w-[30px] h-[30px] lg:hidden fill-white cursor-pointer "
          onClick={() => setShowHem(!showHem)}
        />
        <div
          className={`fixed top-0 w-[100vw] h-[100vh] flex items-center justify-center gap-2 z-10 flex-col bg-[#000000d6] lg:hidden right-0 ${
            showHem
              ? "translate-x-0 transition duration-500 "
              : "translate-x-[-100%] transition duration-600 "
          } `}
        >
          <RxCross2
            className="w-[35px] h-[35px] fill-white text-white absolute top-5 right-[4%]  "
            onClick={() => setShowHem(!showHem)}
          />
          {!userData && (
            <IoPersonCircle className="w-[50px] h-[50px] fill-black cursor-pointer " />
          )}
          { userData ? (userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer "
            />
          ) : (
            <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer ">
              {userData ? userData?.name?.charAt(0).toUpperCase() : ""}
            </div>
          )): null}
          <div
            className="w-[200px] h-[50px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer  "
            onClick={() => navigate("/profile")}
          >
            My Profile
          </div>
          <div className="w-[200px] h-[50px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer" onClick={() => navigate("/mycourses")}>
            My Courses
          </div>
          {userData?.role == "educator" && (
            <div
              className="w-[200px] h-[50px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer  "
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              className="w-[200px] h-[50px] flex items-center justify-center border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5] "
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="w-[200px] h-[50px] flex items-center justify-center bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer "
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
