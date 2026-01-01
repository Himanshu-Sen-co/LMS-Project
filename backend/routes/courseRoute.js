import express from 'express'
import { createCourse, createLecture, deleteCourse, editCourse, editLecture, getCourseById, getCourseLectures, getCreatorById, getCreatorCourses, getPublishedCourses, removeLecture } from '../controllers/courseController.js';
import authenticateUser from '../middleware/userAuth.js';
import upload from '../middleware/multer.js';
import { searchWithAi } from '../controllers/searchCountroller.js';

// route for courses

const courseRouter  = express.Router()

courseRouter.post("/createCourse", authenticateUser, createCourse)
courseRouter.get("/getPublishedCourses", getPublishedCourses)
courseRouter.get("/getCreatorCourses", authenticateUser, getCreatorCourses)
courseRouter.post("/editCourse/:courseId",authenticateUser, upload.single("thumbnail"), editCourse )
courseRouter.get("/getCourseById/:courseId",authenticateUser, getCourseById)
courseRouter.delete("/deleteCourse/:courseId",authenticateUser, deleteCourse)

// for lectures route 

courseRouter.post("/createLecture/:courseId", authenticateUser, createLecture)
courseRouter.get("/getCourseLecture/:courseId", authenticateUser, getCourseLectures)
courseRouter.post("/editLecture/:lectureId", authenticateUser, upload.single("videoUrl"), editLecture)
courseRouter.delete("/deleteLecture/:lectureId", authenticateUser, removeLecture)
courseRouter.post("/getCreatorById", authenticateUser, getCreatorById)

// route for searching courses
courseRouter.post("/search", searchWithAi)

export default courseRouter;
