import { FaArrowLeftLong } from "react-icons/fa6"
import img from "../assets/searchAi.png"
import { RiMicAiFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../App";
import startSound from "../assets/start.mp3"

function SearchWithAi() {
    const sound = new Audio(startSound)
    const navigate = useNavigate();
    const [input, setInput] = useState("")
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(false)

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    if (!speechRecognition) {
        toast.error("Speech Recognition is not supported in this browser. Please use a compatible browser.");
    }

    const handleInputChange = async () => {
        if (!recognition) {
            return;
        }
        setInput("");
        setLoading(true);
        recognition.start();
        sound.play();
        recognition.onresult = async (e) => {
            const transcript = e.results[0][0].transcript;
            setInput(transcript);
            await handleSearch(transcript);
        }
    }

    const speak = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    }

    const handleSearch = async (query) => {
        try {
            const result = await axios.post(`${apiUrl}/api/course/search`, { query }, { withCredentials: true });

            console.log("Search Results:", result.data);
            setRecommendations(result.data);
            if (result.data.length > 0) {
                speak("There are the top courses i found for you.");
            }else{
                speak("No courses found for your query. Please try again with different keywords.");
            }
        } catch (error) {
            console.log("Error during search:", error);
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-16 ">
        {/* Search container */}
        <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative ">
    <FaArrowLeftLong className="text-black w-[22px] h-[22px] cursor-pointer absolute " onClick={()=> navigate("/")} />
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2 ">
        <img src={img } alt="" className="w-8 h-8 sm:w-[30px]  "/> Search with <span className="text-[#CB99C7] ">AI</span>
    </h1>
    <div className="flex items-center rounded-full bg-gray-700 w-full overflow-hidden shadow-lg relative ">
        <input type="text" name="" id="" className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base " placeholder="What do you want to learn? (e.g. AI, MERN, Cloud.....)" value={input} onChange={(e) => setInput(e.target.value)} />
        {input && <span className="absolute right-35 sm:right-35 text-gray-400 cursor-pointer " onClick={() => setInput("") }>×</span>}
        {input && <button className="absolute right-14 sm:right-16 bg-white rounded-full "><img src={img} alt="" className="w-10 h-10 p-2 rounded-full " onClick={()=> handleSearch(input)} /></button>}
        <button className="absolute right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center " onClick={handleInputChange}>
            <RiMicAiFill className="w-6 h-6 text-gray-800 " />
        </button>
    </div>
        </div>
        {
            recommendations?.length > 0 ? (
                <div className="w-full max-w-6xl mt-12 px-2 sm:px-4 ">
                    <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 text-center ">AI Search Results </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 ">
                        {
                            recommendations?.map((course, index) => (
                                <div key={index} className="bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-200 " onClick={() => navigate(`/viewCourse/${course._id}`)}>
                                    <h2 className="text-lg font-bold sm:text-xl">{course?.title}</h2>
                                    <p className="text-sm text-gray-600 mt-1 ">{course?.category}</p>
                                </div>
                            ))
                        }
                        <div></div>
                    </div>
                </div>
            ) : (loading ? <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400 "> Listening.....</h1> : <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400 ">No course found yet.</h1>)
        }
    </div>
  )
}

export default SearchWithAi