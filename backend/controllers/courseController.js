import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../models/coursesModel.js"
import Lecture from "../models/lectureModel.js"
import User from "../models/userModel.js"



export const createCourse = async (req, res) => {
    try {
        const { title, category} = req.body

        if (!title || !category) {
            return res.status(400).json({message: "Title or Category is Required"})
        }

        const course = await Course.create({
            title,
            category,
            creator: req.userId
        })
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message: `create course error: ${error}`})
    }
}

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({isPublished:true}).populate("lectures reviews");
        if (!courses) {
            return res.status(400).json({message: `courses not found`})
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({message: `get published course error: ${error}`})
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.userId;
        const courses = await Course.find({creator:userId})
        if (!courses) {
            return res.status(400).json({message: `courses not found`})
        }
        return res.status(200).json(courses)
    } catch (error) {
         return res.status(500).json({message: `get creator course error: ${error}`})
    }
}

export const editCourse = async (req, res) => {
    try {
        const {courseId} = req.params
        const {title, subTitle, description, category, level, isPublished, price} = req.body;
        let thumbnail 
        if (req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({message:"course not found"})
        }

        const updateData = {title, subTitle, description, category, level, isPublished, price, thumbnail}

        course = await Course.findByIdAndUpdate(courseId, updateData, {new:true})
        return res.status(200).json(course)
    } catch (error) {
         return res.status(500).json({message: `Edit course error: ${error}`})
    }
}

export const getCourseById = async (req, res)=>{
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({message:"course not found"})
        }
        return res.status(200).json(course)
    } catch (error) {
         return res.status(500).json({message: `Failed to get course by id error: ${error}`})
    }
}


export const deleteCourse = async (req, res) =>{
    try {
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({message: "failed to found course"})
        }
        course = await Course.findByIdAndDelete(courseId, {new:true})
        res.status(200).json({message:"Course deleted sucessfully", course})
    } catch (error) {
        return res.status(500).json({message: `Failed to delete course error: ${error}`})
    }
}


// controller for lecture model 
export const createLecture = async (req, res) => {
    try {
        const {lectureTitle} = req.body
        const {courseId} = req.params

        if (!lectureTitle || !courseId) {
            return res.status(400).json({message: "lecture Title is required"})
        }

        const lecture = await Lecture.create({
            lectureTitle
        })
        const course = await Course.findById(courseId)
        if (course) {
            course.lectures.push(lecture._id)
        }
        await course.populate("lectures")
        await course.save()

        return res.status(201).json({lecture, course})

    } catch (error) {
         return res.status(500).json({message: `Failed to create lecture error: ${error}`})
    }
}

export const getCourseLectures = async (req, res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({message: "Course not found"})
        }
        await course.populate("lectures")
        await course.save()

        res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message: `Failed to get course lecture error: ${error}`})
    }
}

export const editLecture = async (req, res) => {
    try {
        const {lectureId} = req.params
        const {isPreviewFree, lectureTitle} = req.body

        const lecture = await Lecture.findById(lectureId)
        if (!lecture) {
            return res.status(400).json({message: "Lecture not found"})

        }
        let videoUrl

        if (req.file) {
            videoUrl = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
        }
        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree
        await lecture.save()
        return res.status(200).json(lecture)
    } catch (error) {
         return res.status(500).json({message: `Failed to edit lecture error: ${error}`})
    }
}

export const removeLecture = async (req, res) => {
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if (!lecture) {
             return res.status(400).json({message: "Lecture not found"})
        }

        await Course.updateOne({lectures:lectureId}, {$pull: {lectures: lectureId}})
        return res.status(200).json({message: "Lecture Removed"})
    } catch (error) {
        return res.status(500).json({message: `Failed to Remove lecture error: ${error}`})
    }
}

export const getCreatorById = async (req, res) => {
    try {
        const {userId} = req.body
        console.log("+++++++++++++++", userId);
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({message: "User not found"})
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `Failed to get Creator by id error: ${error}`});
    }
}